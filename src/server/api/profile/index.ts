import type { Database } from '~/supabase.types'
import type { ProfilesRow } from '~/types'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { PROFILE_COLUMNS } from '~/utils/constants'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (user) {
    const profileId = user?.id

    try {
      const client = await serverSupabaseClient<Database>(event)

      return client
        .from('profiles')
        .select(PROFILE_COLUMNS)
        .eq('id', profileId)
        .single<ProfilesRow>()
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
