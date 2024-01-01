import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/supabase.types'

export async function getAllCompanies(client: SupabaseClient<Database>) {
  const { data, count, error } = await client
    .from('companies')
    .select('id, name, description, url, logo, created_at, codes(id), metaTitle, metaDescription')

  if (error)
    console.log('error', error)

  return { data, count }
}
