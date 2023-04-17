import type { Database } from '~/supabase.types'
import type { ProfilesRow } from '~/types'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

const PROFILE_COLUMNS = 'id, email, username, avatar_url'

export default defineEventHandler(async (event): Promise<ProfilesRow | null> => {
  const user = await serverSupabaseUser(event)

  if (user) {
    const profileId = user?.id

    try {
      const client = serverSupabaseClient<Database>(event)

      const { data, error } = await client
        .from('profiles')
        .select(PROFILE_COLUMNS)
        .eq('id', profileId)
        .single<ProfilesRow>()

      if (error) {
        // eslint-disable-next-line no-console
        console.log({
          statusCode: Number(error.code),
          statusMessage: error.message,
        })
      }

      return data
    }
    catch {
      throw createError({
        statusCode: 404,
        statusMessage: 'Profile Not Found',
      })
    }
  }

  return null
})
