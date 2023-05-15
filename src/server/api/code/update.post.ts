import type { SupabaseClient } from '@supabase/supabase-js'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'
import { throwIfPropertiesMissing } from '~/server/utils/throwIfPropertiesMissing'

export async function updateCode(client: SupabaseClient<Database>, { id, title, description, code }: { id: string; title: string; description: string; code: string }) {
  const { data, error } = await client
    .from('codes')
    .update({
      title, description, code,
    })
    .eq('id', id)
    .select()
    .single()

  if (error)
    throw createError('Cannot update code')

  return data
}

export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient<Database>(event)

  const body = await readBody(event)

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Should provide details',
    })
  }

  throwIfPropertiesMissing(body, ['id', 'title', 'description', 'code'])

  return await updateCode(client, body)
})
