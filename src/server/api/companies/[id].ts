import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'
import { COMPANY_COLUMNS } from '~/utils/constants'

export default defineEventHandler(async (event) => {
  if (!event.context.params?.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Should provide id',
    })
  }

  const client = serverSupabaseClient<Database>(event)
  const { data } = await client
    .from('companies')
    .select(COMPANY_COLUMNS)
    .eq('id', event.context.params.id)
    .order('created_at')
    .single()

  return data
})
