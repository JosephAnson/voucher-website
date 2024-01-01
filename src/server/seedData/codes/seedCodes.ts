import type { SupabaseClient } from '@supabase/supabase-js'
import { getAllCompanies } from '../service/getAllCompanies'
import type { Database } from '~/supabase.types'
import { seedCode } from '~/server/seedData/codes/seedCode'

export async function seedCodes(client: SupabaseClient<Database>) {
  const { data: allCompanies } = await getAllCompanies(client)

  if (allCompanies) {
    for (const company of allCompanies) {
      await seedCode(client, company)
    }
  }
}
