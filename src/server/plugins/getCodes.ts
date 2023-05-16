import puppeteer from 'puppeteer'
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { getAllCompanies } from '~/server/api/companies'
import { createCode } from '~/server/api/code/add.post'
import { useScheduler } from '#scheduler'
import { getAllCodes } from '~/server/api/code'
import { getTopParrainCodes } from '~/server/crawlers/getTopParrainCodes'
import { getSpyDealsCodes } from '~/server/crawlers/getSpyDealsCodes'
import type { Code } from '~/types'

config()

const client = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '')

export async function seedCodes() {
  const browser = await puppeteer.launch({ headless: 'new' })
  // Make sure the browser opens a new page
  // Make sure the browser opens a new page
  const page = await browser.newPage()

  const companies = await getAllCompanies(client, { sort: 'name', ascending: true }) || []
  const allCodes = await getAllCodes(client) || []

  for (const company of companies) {
    console.log('company', company.name)

    const parrainCodes = await getTopParrainCodes(page, company.name, 'en')
    const parrainCodesNl = await getTopParrainCodes(page, company.name, 'nl')
    const skyDealCodes = await getSpyDealsCodes(page, company.name, 'en')
    const skyDealCodesNl = await getSpyDealsCodes(page, company.name, 'nl', 'https://www.spydeals.nl/winkels')

    const codes: (Code | null)[] = [...parrainCodes, ...parrainCodesNl, ...skyDealCodesNl, ...skyDealCodes].filter(code => !code?.code.includes('aklam'))

    for (const code of codes) {
      if (code) {
        const existingCode = allCodes.find(c => c.code === code.code && c.company === company.id && c.language === code.language)

        if (existingCode) {
          // console.log('code already exists', code.code)
        }
        else {
          await createCode('ca35f5fc-389c-4678-8ec8-294336ed3132', client, {
            title: code.title,
            description: code.description,
            code: code.code,
            company: company.id,
            language: code.language,
          })

          console.log('code created', code.code)
        }
      }
    }

    console.log('-'.repeat(20))
  }

  await browser.close()
}

export default defineNitroPlugin(async () => {
  const scheduler = useScheduler()

  scheduler.run(async () => {
    await seedCodes()
  }).everyDays(3)
})
