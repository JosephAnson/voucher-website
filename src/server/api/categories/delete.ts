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

  throwIfPropertiesMissing(body, ['company', 'category'])

  const { data, error } = await client
    .from('company_categories')
    .delete()
    .eq('company', body.company)
    .eq('category', body.category)

  if (error) {
    throw createError({
      statusCode: Number(error.code),
      statusMessage: error.message,
    })
  }
  else {
    console.log('DELETED CATEGORY!')
  }

  return data
})
