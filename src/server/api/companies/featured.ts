import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'
import { COMPANY_COLUMNS } from '~/utils/constants'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const client = await serverSupabaseClient<Database>(event)

  const limit = Number(query?.limit || 10000)

  const { data } = await client
    .from('companies')
    .select(COMPANY_COLUMNS)
    .eq('codes.language', 'en')
    .order('featured', { referencedTable: '', ascending: false })
    .limit(limit)

  return data
})
