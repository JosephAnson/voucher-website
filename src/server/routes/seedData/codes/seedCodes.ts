import type { SupabaseClient } from '@supabase/supabase-js'
import type { BrowserContext } from 'playwright'
import playwright from 'playwright-aws-lambda'
import { createClient } from '@supabase/supabase-js'
import { getAllCompanies } from '../service/getAllCompanies'
import { getSpyDealsCodes } from './getSpyDealsCodes'
import { getTopParrainCodes } from './getTopParrainCodes'
import type { Code } from '~/types'
import { isBannedCode } from '~/utils/isBannedCode'
import type { Database } from '~/supabase.types'
import { chunkArray } from '~/server/utils/chunkArray'
import { Queue } from '~/server/utils/queue'
import { CODE_COLUMNS } from '~/utils/constants'

const createCodeQueue = new Queue()

async function createCode(userId: string, client: SupabaseClient<Database>, { title, description, code, company, language = 'en' }: { title: string; description: string; code: string; company: string; language?: string }) {
  if (!title || title === '' || !code || code === '' || !company)
    console.log('code not created')

  const { error } = await client
    .from('codes')
    .insert({
      title,
      description,
      code,
      company,
      author: userId,
      language,
    })

  if (error)
    console.log(`Cannot update code: ${error.message}`)
  else
    console.log('code created', company, code)
}

async function saveCompanyCode(context: BrowserContext, company: { id: string; name: string; url: string }, allCodes: any[], client: SupabaseClient<Database>) {
  try {
    console.log(`searching: ${company.name}, Current total codes ${allCodes.length}`)

    // Make sure the browser opens a new page
    const page = await context.newPage()

    const parrainCodes = await getTopParrainCodes(page, company.name, 'en')
    const parrainCodesNl = await getTopParrainCodes(page, company.name, 'nl')
    const skyDealCodes = await getSpyDealsCodes(context, page, company.name, 'en')
    const skyDealCodesNl = await getSpyDealsCodes(context, page, company.name, 'nl', 'https://www.spydeals.nl/winkels')

    const codes: (Code | null)[] = [...parrainCodes, ...parrainCodesNl, ...skyDealCodes, ...skyDealCodesNl]
      .filter((code): code is Code => code !== null && code.code !== '' && code.title !== '')
      .filter(code => !isBannedCode(company.url, code.code))

    for (const code of codes) {
      if (code) {
        const existingCode = allCodes.find(c => c.code === code.code && c.company === company.id && c.language === code.language)

        if (!existingCode) {
          createCodeQueue.enqueue(async () => await createCode('ca35f5fc-389c-4678-8ec8-294336ed3132', client, {
            title: code.title,
            description: code.description,
            code: code.code,
            company: company.id,
            language: code.language,
          }), { timeout: 2000 })

          // Add code that's been added to list of codes so it's not add again
          allCodes.push({
            id: 0,
            title: code.title,
            description: code.description,
            code: code.code,
            company: company.id,
            language: code.language,
            author: {
              email: '',
              username: '',
              avatar_url: '',
            },
          })
        }
      }
    }

    await page.close()
  }
  catch (error) {
    console.log('error', error)
  }
}

export default defineEventHandler(async () => {
  const client = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '', {
    auth: { persistSession: false, autoRefreshToken: true },
  })
  const { data: allCompanies } = await getAllCompanies(client)

  const { data: allCodes } = await client
    .from('codes')
    .select(CODE_COLUMNS)

  if (allCompanies && allCodes) {
    const companyChunks = chunkArray(allCompanies.reverse(), allCompanies.length / 10)

    for (const companies of companyChunks) {
      const queue = new Queue()
      const browser = await playwright.launchChromium({ headless: true })
      const context = await browser.newContext()

      for (const company of companies)
        queue.enqueue(async () => await saveCompanyCode(context, company, allCodes, client), { timeout: 1000 })

      queue.enqueue(async () => await browser.close())
    }
  }

  return 'Seeding codes'
})
