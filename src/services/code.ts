import type { Database } from '~/supabase.types'
import { getUserID } from '~/services/profile'

export async function createCode({ title, description, code, company }: { id: string; title: string; description: string; code: string; company: string }) {
  const userId = await getUserID()
  const client = useSupabaseClient<Database>()

  const { data, error } = await client
    .from('codes')
    .insert({
      title, description, code, company, author: userId,
    })
    .select()
    .single()

  if (error)
    throw new Error('Cannot update code')
  else openSnackbar('Code Saved!')

  return data
}

export async function updateCode({ id, title, description, code }: { id: string; title: string; description: string; code: string }) {
  const client = useSupabaseClient<Database>()

  const { data, error } = await client
    .from('codes')
    .update({
      title, description, code,
    })
    .eq('id', id)
    .select(CODE_COLUMNS)
    .single()

  if (error)
    throw new Error('Cannot update code')
  else openSnackbar('Code Saved!')

  return data
}

export async function deleteCode({ id }: { id: string }) {
  const client = useSupabaseClient<Database>()

  return client
    .from('codes')
    .delete()
    .eq('id', id)
}
