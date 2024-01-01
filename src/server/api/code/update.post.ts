import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'
import { throwIfPropertiesMissing } from '~/server/utils/throwIfPropertiesMissing'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)

  const body = await readBody(event)

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Should provide details',
    })
  }

  throwIfPropertiesMissing(body, ['id', 'title', 'description', 'code'])

  const { data, error } = await client
    .from('codes')
    .update({
      title: body.title,
      description: body.description,
      code: body.code,
    })
    .eq('id', body.id)
    .select()
    .single()

  if (error)
    throw createError('Cannot update code')

  return data
})
