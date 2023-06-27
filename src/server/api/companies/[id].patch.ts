import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'

export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient<Database>(event)

  if (!event.context.params?.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Should provide id',
    })
  }

  const body = await readBody(event)

  const { data, error } = await client
    .from('companies')
    .update({
      name: body.name,
      description: body.description,
      metaTitle: body.metaTitle,
      metaDescription: body.metaDescription,
      featured: body.featured,
      approved: body.approved,
    })
    .eq('id', body.id)
    .select()
    .single()

  if (error)
    throw createError(`Cannot update company: ${error.message}`)

  return data
})
