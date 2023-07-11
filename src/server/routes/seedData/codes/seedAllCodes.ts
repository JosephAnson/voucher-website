import { createClient } from '@supabase/supabase-js'
import { getAllCompanies } from '../service/getAllCompanies'
import { chunkArray } from '~/server/utils/chunkArray'

export default defineEventHandler(async () => {
  const client = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '', {
    auth: { persistSession: false, autoRefreshToken: true },
  })

  const { data: allCompanies } = await getAllCompanies(client)

  async function getCompanyCodes(companies: any[]) {
    for (const company of companies.reverse()) {
      await $fetch('/seedData/codes/seedCode', {
        method: 'POST',
        body: company,
      })
    }
  }

  if (allCompanies) {
    const companyChunks = chunkArray(allCompanies.reverse(), allCompanies.length / 6)

    for (const companies of companyChunks)
      getCompanyCodes(companies)
  }

  return 'Seeding all codes'
})
