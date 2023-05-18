import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/supabase.types'
import { CODE_COLUMNS } from '~/utils/constants'

export async function getAllCodes(client: SupabaseClient<Database>) {
  const { data } = await client
    .from('codes')
    .select(CODE_COLUMNS)
    .eq('language', 'en')

  return data
}
