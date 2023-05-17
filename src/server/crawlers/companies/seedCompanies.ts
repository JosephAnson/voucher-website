import puppeteer from 'puppeteer'
import type { SupabaseClient } from '@supabase/supabase-js'
import { getAllCompanies } from '~/server/api/companies'
import type { Database } from '~/supabase.types'
import { getTopParrainCompanies } from '~/server/crawlers/companies/getTopParrainCompanies'
import { createCompany } from '~/server/api/companies/add.post'
import { createGuid } from '~/utils/createGuid'

export async function seedCompanies(client: SupabaseClient<Database>) {
  const browser = await puppeteer.launch({ headless: true })
  // Make sure the browser opens a new page
  // Make sure the browser opens a new page
  const page = await browser.newPage()

  const allCompanies = await getAllCompanies(client, { sort: 'name', ascending: true }) || []

  const parrainCompaniesEN = await getTopParrainCompanies(page, 'en')
  // const skyDealCodes = await getSpyDealsCodes(page, company.name, 'en')
  // const skyDealCodesNl = await getSpyDealsCodes(page, company.name, 'nl', 'https://www.spydeals.nl/winkels')

  const companies = [...parrainCompaniesEN]

  for (const company of companies) {
    if (company) {
      const existingCompany = allCompanies.find(c => c.id === company.id)

      if (existingCompany) {
        console.log('company already exists', company.name)
      }
      else {
        console.log('company', company.name, company.url, company.imageUrl, 'creating')
        if (company.name && company.url && company.imageUrl) {
          const guid = createGuid()

          const file = await fetch(company.imageUrl).then(r => r.blob())
          const { data } = await client
            .storage
            .from('logos')
            .upload(guid, file, {
              upsert: true,
              cacheControl: '0',
            })

          if (data?.path) {
            const logo = `https://vdzjsjlcezebwpavsjif.supabase.co/storage/v1/object/public/logos/${data.path}`

            await createCompany(client, {
              id: company.id,
              url: company.url,
              name: company.name,
              logo,
              approved: true,
            })

            allCompanies.push({
              id: company.id,
              url: company.url,
              name: company.name,
              logo,
              description: '',
              created_at: new Date().toISOString(),
              codes: [],
            })

            console.log('company created', company.name)
          }
        }
      }
    }
  }

  console.log('-'.repeat(20))

  await browser.close()
}
