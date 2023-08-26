import type { H3Event } from 'h3'
import type { Database } from '~/supabase.types'
import { throwIfPropertiesMissing } from '~/server/utils/throwIfPropertiesMissing'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

async function getUserID(event: H3Event) {
  const user = await serverSupabaseUser(event)
  if (!user) {
    openSnackbar({ status: 'danger', title: 'Not logged in!', message: 'To continue you need to login again' })
    throw createError('User not logged in')
  }
  return user?.id
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  throwIfPropertiesMissing(body, ['avatar_url'])

  const client = await serverSupabaseClient<Database>(event)
  const userId = await getUserID(event)

  return client.from('profiles').update({ avatar_url: body.avatar_url }).eq('id', userId)
})
