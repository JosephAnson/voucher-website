import type { SupabaseClient } from '@supabase/supabase-js'
import type { BrowserContext } from 'playwright'
import { chromium } from 'playwright'
import { createClient } from '@supabase/supabase-js'
import { getSpyDealsCodes } from './getSpyDealsCodes'
import { getTopParrainCodes } from './getTopParrainCodes'
import { getAllCompanies } from '~/server/api/companies'
import { getAllCodes } from '~/server/api/code'
import type { Code } from '~/types'
import { isBannedCode } from '~/utils/isBannedCode'
import type { Database } from '~/supabase.types'
import { createCode } from '~/server/api/code/add.post'
import { chunkArray } from '~/server/utils/chunkArray'
import { Queue } from '~/server/utils/queue'

async function saveCompanyCode(context: BrowserContext, company: any, allCodes: any[], client: SupabaseClient<Database>) {
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
          await createCode('ca35f5fc-389c-4678-8ec8-294336ed3132', client, {
            title: code.title,
            description: code.description,
            code: code.code,
            company: company.id,
            language: code.language,
          })

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
          console.log('code created', company.id, code.code)
        }
      }
    }
  }
  catch (error) {
    console.log('error', error)
  }
}

export default defineEventHandler(async () => {
  const client = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '', {
    auth: { persistSession: false },
  })
  const { companies: allCompanies } = await getAllCompanies({ client, sort: { sort: 'name', ascending: true } }) || []
  const allCodes = await getAllCodes(client) || []

  const companyChunks = chunkArray(allCompanies, allCompanies.length / 3)

  for (const companies of companyChunks) {
    const queue = new Queue()
    const browser = await chromium.launch()
    const context = await browser.newContext()

    for (const company of companies)
      queue.enqueue(async () => await saveCompanyCode(context, company, allCodes, client))

    queue.enqueue(async () => await browser.close())
  }
})
