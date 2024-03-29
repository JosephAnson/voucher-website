import type { SupabaseClient } from '@supabase/supabase-js'
import type { BrowserContext } from 'playwright'
import { getAllCompanies } from '../service/getAllCompanies'
import { getSpyDealsCodes } from './getSpyDealsCodes'
import { getTopParrainCodes } from './getTopParrainCodes'
import type { Database } from '~/supabase.types'
import type { Code } from '~/types'
import { isBannedCode } from '~/utils/isBannedCode'

async function createCode(userId: string, client: SupabaseClient<Database>, { title, description, code, company, language = 'en' }: { title: string, description: string, code: string, company: string, language?: string }) {
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

export async function seedCode(context: BrowserContext, client: SupabaseClient<Database>, company: any) {
  if (!company)
    return 'No body provided'
  if (!company.id)
    return 'No company id provided'
  if (!company.name)
    return 'No company name provided'
  if (!company.url)
    return 'No company url provided'

  const { data: allCodes } = await client
    .from('codes')
    .select('id, code,  company, title, description, language')

  if (allCodes) {
    try {
      console.log(`searching: ${company.name}, Current total codes ${allCodes.length}`)

      // Make sure the browser opens a new page
      const page = await context.newPage()

      const parrainCodes = await getTopParrainCodes(page, company.name, 'en')
      // const parrainCodesNl = await getTopParrainCodes(page, company.name, 'nl')
      const skyDealCodes = await getSpyDealsCodes(context, page, company.name, 'en')
      // const skyDealCodesNl = await getSpyDealsCodes(context, page, company.name, 'nl', 'https://www.spydeals.nl/winkels')

      const codes: (Code | null)[] = [...parrainCodes, ...skyDealCodes]
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

            // Add code that's been added to list of codes, so it's not add again
            allCodes.push({
              id: 0,
              title: code.title,
              description: code.description,
              code: code.code,
              company: company.id,
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
}

export async function seedCodes(context: BrowserContext, client: SupabaseClient<Database>) {
  const { data: allCompanies } = await getAllCompanies(client)

  if (allCompanies) {
    for (const company of allCompanies)
      await seedCode(context, client, company)
  }
}
