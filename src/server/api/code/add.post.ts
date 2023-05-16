import type { SupabaseClient } from '@supabase/supabase-js'
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/supabase.types'
import { throwIfPropertiesMissing } from '~/server/utils/throwIfPropertiesMissing'

export async function createCode(userId: string, client: SupabaseClient<Database>, { title, description, code, company, language = 'en' }: { title: string; description: string; code: string; company: string; language?: string }) {
  if (!title || title === '' || !code || code === '' || !company)
    console.log('code not created')

  const { data, error } = await client
    .from('codes')
    .insert({
      title,
      description,
      code,
      company,
      author: userId,
      language,
    })
    .select()
    .single()

  if (error)
    throw createError('Cannot update code')

  return data
}

export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)

  const body = await readBody(event)

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Should provide details',
    })
  }

  throwIfPropertiesMissing(body, ['title', 'description', 'code', 'company'])

  if (user && user.id)
    return await createCode(user.id, client, body)
})
