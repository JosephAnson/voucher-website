import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/supabase.types'
import { throwIfPropertiesMissing } from '~/server/utils/throwIfPropertiesMissing'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)

  const body = await readBody(event)

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Should provide details',
    })
  }

  throwIfPropertiesMissing(body, ['title', 'description', 'code', 'company'])

  if (user && user.id) {
    if (!body.title || body.title === '' || !body.code || body.code === '' || !body.company)
      console.log('code not created')

    const { data, error } = await client
      .from('codes')
      .insert({
        title: body.title,
        description: body.description,
        code: body.code,
        company: body.company,
        author: user.id,
        language: body.language,
      })
      .select()
      .single()

    if (error)
      throw createError(`Cannot update code: ${error.message}`)

    return data
  }
})
