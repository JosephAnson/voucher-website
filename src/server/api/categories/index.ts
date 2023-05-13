import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'

const COLUMNS = 'id, category'

export default eventHandler(async (event) => {
  const client = serverSupabaseClient<Database>(event)
  const { data } = await client
    .from('categories')
    .select(COLUMNS)
    .order('order')
    .order('id')

  return data
})
