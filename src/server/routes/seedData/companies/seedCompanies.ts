import { createClient } from '@supabase/supabase-js'
import { getTopParrainCompanies } from './getTopParrainCompanies'
import { createCompany } from '~/server/api/companies/add.post'
import { createGuid } from '~/utils/createGuid'
import { getAllCompanies } from '~/server/routes/seedData/service/getAllCompanies'

export default defineEventHandler(async () => {
  const client = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '', {
    auth: { persistSession: false },
  })

  const { data: allCompanies } = await getAllCompanies(client)

  const parrainCompaniesEN = await getTopParrainCompanies('en')
  // const skyDealCodes = await getSpyDealsCodes(page, company.name, 'en')
  // const skyDealCodesNl = await getSpyDealsCodes(page, company.name, 'nl', 'https://www.spydeals.nl/winkels')

  const companies = [...parrainCompaniesEN]

  if (allCompanies) {
    for (const company of companies) {
      if (company) {
        const existingCompany = allCompanies.find((c: { id: string }) => c.id === company.id)

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
                metaTitle: '',
                metaDescription: '',
              })

              console.log('company created', company.name)
            }
          }
        }
      }
    }
  }

  console.log('-'.repeat(20))

  return 'Seeding companies'
})
