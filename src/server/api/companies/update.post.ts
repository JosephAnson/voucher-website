import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'
import { throwIfPropertiesMissing } from '~/server/utils/throwIfPropertiesMissing'

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
