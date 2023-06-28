import { createClient } from '@supabase/supabase-js'
import { chunkArray } from '~/server/utils/chunkArray'
import type { Database } from '~/supabase.types'

export default defineEventHandler(async () => {
  const client = createClient<Database>(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '', {
    auth: { persistSession: false },
  })

  const daysOld = 31

  const { data: oldCodes, error } = await client
    .from('codes')
    .select('id, created_at')
    .lt('created_at', new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000).toISOString())

  if (error)
    console.error(error)

  console.log(oldCodes)

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

  return 'Deleting old codes'
})
