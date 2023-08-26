import type { Database } from '~/supabase.types'
import { throwIfPropertiesMissing } from '~/server/utils/throwIfPropertiesMissing'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event): Promise<boolean> => {
  const body = await readBody(event)
  throwIfPropertiesMissing(body, ['username'])

  const client = await serverSupabaseClient<Database>(event)
  const { data } = await client.from('profiles').select('username').eq('username', body.username)

  return (data?.length || 0) > 0
})
