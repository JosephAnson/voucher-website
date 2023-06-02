import type { Database } from '~/supabase.types'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { CODE_COLUMNS } from '~/utils/constants'
import { generateListQuery } from '~/server/utils/generateListQuery'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (user) {
    try {
      const client = serverSupabaseClient<Database>(event)

      const { data, count } = await generateListQuery({
        event,
        query: client
          .from('codes')
          .select(CODE_COLUMNS, { count: 'exact' })
          .eq('author', user?.id),
        sortMapping: {
          NEWEST: { sort: 'created_at', ascending: false },
          ALPHABETICAL: { sort: 'title', ascending: true },
        },
      })
      return { items: data, count }
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
