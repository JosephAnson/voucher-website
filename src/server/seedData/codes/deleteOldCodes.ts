import type { SupabaseClient } from '@supabase/supabase-js'
import { chunkArray } from '~/server/utils/chunkArray'
import type { Database } from '~/supabase.types'

export async function deleteOldCodes(client: SupabaseClient<Database>) {
  const daysOld = 31

  const { data: oldCodes, error } = await client
    .from('codes')
    .select('id, created_at')
    .lt('created_at', new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000).toISOString())

  console.log(oldCodes)

  if (error)
    console.error(error)

  if (oldCodes) {
    const codeChunks = chunkArray(oldCodes, 1000)

    for (const chunk of codeChunks) {
      const { data, error } = await client
        .from('codes')
        .delete()
        .in('id', chunk.map(c => c.id))

      if (error)
        console.error(error)

      console.log(data)
    }
  }
}
