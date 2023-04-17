import type { Database } from '~/supabase.types'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { CODE_COLUMNS } from '~/utils/constants'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (user) {
    try {
      const client = serverSupabaseClient<Database>(event)

      const { data } = await client
        .from('codes')
        .select(CODE_COLUMNS)
        .eq('author', user?.id)

      return data
    }
    catch (error) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User Not Found',
      })
    }
  }

  return null
})
