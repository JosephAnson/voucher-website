import type { Database } from '~/supabase.types'

export async function getUserID() {
  const user = useSupabaseUser()
  if (!user.value) {
    openSnackbar({ status: 'danger', title: 'Not logged in!', message: 'To continue you need to login again' })
    throw new Error('User not logged in')
  }
  return user.value?.id
}

export async function usernameExists(username: String) {
  const client = useSupabaseClient<Database>()
  const { data } = await client.from('profiles').select('username').eq('username', username)

  return (data?.length || 0) > 0
}
