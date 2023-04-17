import type { Database } from '~/supabase.types'
import { PROFILE_COLUMNS } from '~/utils/constants'

export async function getUserID() {
  const user = useSupabaseUser()
  if (!user.value) {
    openSnackbar({ status: 'danger', title: 'Not logged in!', message: 'To continue you need to login again' })
    throw new Error('User not logged in')
  }
  return user.value?.id
}

export async function getProfile() {
  return await $fetch('/api/profile/', {
    headers: useRequestHeaders(['cookie']) as any,
  })
}
export async function updateAvatar(avatar_url: string) {
  const client = useSupabaseClient<Database>()
  const userId = await getUserID()

  return client.from('profiles').update({ avatar_url }).eq('id', userId)
}

export async function usernameExists(username: String) {
  const client = useSupabaseClient<Database>()
  const { data } = await client.from('profiles').select('username').eq('username', username)

  return (data?.length || 0) > 0
}

export async function updateUsername(username: string) {
  const client = useSupabaseClient<Database>()
  const userId = await getUserID()

  const { data, error } = await client
    .from('profiles')
    .update({
      username,
    })
    .eq('id', userId)
    .select(PROFILE_COLUMNS)
    .single()

  if (error)
    throw new Error('Cannot update username')

  return data
}
