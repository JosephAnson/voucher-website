import type { H3Event } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'

const COLUMNS = 'id, category'

export default cachedEventHandler(async (event: H3Event<Request>) => {
  const client = await serverSupabaseClient<Database>(event)
  const { data } = await client
    .from('categories')
    .select(COLUMNS)
    .order('order')
    .order('id')

  return data
}, {
  maxAge: 60 * 60 * 24 * 7,
  swr: true,
})
