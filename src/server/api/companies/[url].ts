import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'
import { COMPANY_COLUMNS } from '~/utils/constants'

export default eventHandler(async (event) => {
  if (!event.context.params) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Should provide url',
    })
  }

  const client = serverSupabaseClient<Database>(event)
  const { data } = await client
    .from('companies')
    .select(COMPANY_COLUMNS)
    .eq('url', event.context.params.url)
    .order('created_at')
    .single()

  return data
})
