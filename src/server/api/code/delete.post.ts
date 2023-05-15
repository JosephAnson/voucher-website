import type { SupabaseClient } from '@supabase/supabase-js'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'
import { throwIfPropertiesMissing } from '~/server/utils/throwIfPropertiesMissing'

export async function deleteCode(client: SupabaseClient<Database>, { id }: { id: string }) {
  const { data, error } = await client
    .from('codes')
    .delete()
    .eq('id', id)

  console.log('id', id)
  console.log(data, error)

  if (error)
    throw createError(error)

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

  console.log('id', body.id)

  throwIfPropertiesMissing(body, ['id'])

  return deleteCode(client, body)
})
