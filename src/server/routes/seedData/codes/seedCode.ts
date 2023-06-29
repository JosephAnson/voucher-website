import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
import { readBody } from 'h3'
import playwright from 'playwright-aws-lambda'
import { getSpyDealsCodes } from './getSpyDealsCodes'
import { getTopParrainCodes } from './getTopParrainCodes'
import type { Code } from '~/types'
import { isBannedCode } from '~/utils/isBannedCode'
import type { Database } from '~/supabase.types'

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

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body)
    return 'No body provided'
  if (!body.id)
    return 'No company id provided'
  if (!body.name)
    return 'No company name provided'
  if (!body.url)
    return 'No company url provided'

  const client = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '', {
    auth: { persistSession: false, autoRefreshToken: true },
  })
  const browser = await playwright.launchChromium({ headless: true, timeout: 1000000 })
  const context = await browser.newContext()

  const { data: allCodes } = await client
    .from('codes')
    .select('id, code,  company, title, description, language')

  if (allCodes) {
    try {
      console.log(`searching: ${body.name}, Current total codes ${allCodes.length}`)

      // Make sure the browser opens a new page
      const page = await context.newPage()

      const parrainCodes = await getTopParrainCodes(page, body.name, 'en')
      const parrainCodesNl = await getTopParrainCodes(page, body.name, 'nl')
      const skyDealCodes = await getSpyDealsCodes(context, page, body.name, 'en')
      const skyDealCodesNl = await getSpyDealsCodes(context, page, body.name, 'nl', 'https://www.spydeals.nl/winkels')

      const codes: (Code | null)[] = [...parrainCodes, ...parrainCodesNl, ...skyDealCodes, ...skyDealCodesNl]
        .filter((code): code is Code => code !== null && code.code !== '' && code.title !== '')
        .filter(code => !isBannedCode(body.url, code.code))

      for (const code of codes) {
        if (code) {
          const existingCode = allCodes.find(c => c.code === code.code && c.company === body.id && c.language === code.language)

          if (!existingCode) {
            await createCode('ca35f5fc-389c-4678-8ec8-294336ed3132', client, {
              title: code.title,
              description: code.description,
              code: code.code,
              company: body.id,
              language: code.language,
            })

            // Add code that's been added to list of codes, so it's not add again
            allCodes.push({
              id: 0,
              title: code.title,
              description: code.description,
              code: code.code,
              company: body.id,
              language: code.language,
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

  return 'Seeding codes'
})
