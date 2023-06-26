import type { SupabaseClient } from '@supabase/supabase-js'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'
import { throwIfPropertiesMissing } from '~/server/utils/throwIfPropertiesMissing'

export async function updateCompany(
  client: SupabaseClient<Database>,
  { id, name, description, metaTitle, metaDescription, featured, approved }: { id: string; name?: string; description?: string; metaTitle?: string; metaDescription?: string; featured?: boolean; approved?: boolean },
) {
  const { data, error } = await client
    .from('companies')
    .update({
      name, description, metaTitle, metaDescription, featured, approved,
    })
    .eq('id', id)
    .select()
    .single()

  if (error)
    throw createError(`Cannot update company: ${error.message}`)

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

  throwIfPropertiesMissing(body, ['id'])

  return await updateCompany(client, body)
})
