import type { H3Event } from 'h3'
import type { Database } from '~/supabase.types'
import { throwIfPropertiesMissing } from '~/server/utils/throwIfPropertiesMissing'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { PROFILE_COLUMNS } from '~/utils/constants'

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
  throwIfPropertiesMissing(body, ['username'])

  const client = serverSupabaseClient<Database>(event)
  const userId = await getUserID(event)

  const { data, error } = await client
    .from('profiles')
    .update({
      username: body.username,
    })
    .eq('id', userId)
    .select(PROFILE_COLUMNS)
    .single()

  if (error)
    throw new Error('Cannot update username')

  return data
})
