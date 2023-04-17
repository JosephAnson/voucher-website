import type { Database } from '~/supabase.types'

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
  else
    openSnackbar('Code Saved!')

  return data
}
