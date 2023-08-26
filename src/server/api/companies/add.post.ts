import type { SupabaseClient } from '@supabase/supabase-js'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'
import { convertUrlToId } from '~/utils/convertUrlToId'
import { throwIfPropertiesMissing } from '~/server/utils/throwIfPropertiesMissing'

async function checkIfCompanyExists(client: SupabaseClient<Database>, id: string) {
  const { data } = await client
    .from('companies')
    .select('id')
    .eq('id', id)
    .single()

  if (data?.id) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Company already exists',
    })
  }
}

export async function createCompany(client: SupabaseClient<Database>, { id, url, name, logo, approved = false }: { id: string; url: string; name: string; logo: string; approved: boolean }) {
  const { data, error } = await client
    .from('companies')
    .insert({ id, url, name, logo, approved })
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: Number(error.code),
      statusMessage: error.message,
    })
  }
  else {
    console.log('Code Saved!')
  }
  return data
}

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const body = await readBody(event)

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Should provide details',
    })
  }

  throwIfPropertiesMissing(body, ['url', 'name', 'logo'])

  const id = convertUrlToId(body.url)

  await checkIfCompanyExists(client, id)
  return await createCompany(client, { ...body, id })
})
