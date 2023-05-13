import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'

const COMPANY_COLUMNS = 'id, name, description, url, logo, codes(id)'

export default eventHandler(async (event) => {
  const client = serverSupabaseClient<Database>(event)
  const { data } = await client
    .from('companies')
    .select(COMPANY_COLUMNS)
    .order('name')

  return data
})
