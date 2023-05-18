import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'
import { CODE_COLUMNS } from '~/utils/constants'

export default defineEventHandler(async (event) => {
  if (!event.context.params) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Should provide id',
    })
  }

  const client = serverSupabaseClient<Database>(event)
  const { data } = await client
    .from('codes')
    .select(CODE_COLUMNS)
    .eq('id', event.context.params.id)
    .eq('language', 'en')
    .order('created_at')
    .single()

  return data
})
