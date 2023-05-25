import type { SupabaseClient } from '@supabase/supabase-js'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'

export async function updateCompany(
  client: SupabaseClient<Database>,
  { id, name, description, metaTitle, metaDescription, featured, approved }: { id: string; name?: string; description?: string; metaTitle?: string; metaDescription?: string; featured: boolean; approved: boolean },
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

  if (!event.context.params?.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Should provide id',
    })
  }

  const body = await readBody(event)

  return await updateCompany(client, { id: event.context.params.id, ...body })
})
