import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'

const COMPANY_COLUMNS = 'id, name, description, url'

export default eventHandler(async (event) => {
  if (!event.context.params) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Should provide id',
    })
  }

  const client = serverSupabaseClient<Database>(event)
  const { data } = await client
    .from('companies')
    .select(COMPANY_COLUMNS)
    .order('created_at')

  return data
})
