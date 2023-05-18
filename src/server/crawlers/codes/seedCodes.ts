import puppeteer from 'puppeteer'
import type { SupabaseClient } from '@supabase/supabase-js'
import { getAllCompanies } from '~/server/api/companies'
import { getAllCodes } from '~/server/api/code'
import type { Code } from '~/types'
import { isBannedCode } from '~/utils/isBannedCode'
import { createCode } from '~/server/api/code/add.post'
import type { Database } from '~/supabase.types'
import { getTopParrainCodes } from '~/server/crawlers/codes/getTopParrainCodes'
import { getSpyDealsCodes } from '~/server/crawlers/codes/getSpyDealsCodes'

export async function seedCodes(client: SupabaseClient<Database>) {
  const companies = await getAllCompanies(client, { sort: 'name', ascending: true }) || []
  const allCodes = await getAllCodes(client) || []

  for (const company of companies) {
    const browser = await puppeteer.launch({ headless: 'new' })
    // Make sure the browser opens a new page
    const page = await browser.newPage()

    const parrainCodes = await getTopParrainCodes(page, company.name, 'en')
    const parrainCodesNl = await getTopParrainCodes(page, company.name, 'nl')
    const skyDealCodes = await getSpyDealsCodes(page, company.name, 'en')
    const skyDealCodesNl = await getSpyDealsCodes(page, company.name, 'nl', 'https://www.spydeals.nl/winkels')

    const codes: (Code | null)[] = [...parrainCodes, ...parrainCodesNl, ...skyDealCodesNl, ...skyDealCodes]
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

          console.log('code created', code.code)
        }
        else {
          console.log('code already exists', code.code)
        }
      }
    }

    console.log('-'.repeat(20))
    await browser.close()
  }
}
