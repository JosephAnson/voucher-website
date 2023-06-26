import type { SupabaseClient } from '@supabase/supabase-js'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'
import { COMPANY_COLUMNS } from '~/utils/constants'
import { generateListQuery } from '~/server/utils/generateListQuery'

const sortMapping = {
  NEWEST: { sort: 'created_at', ascending: false },
  ALPHABETICAL: { sort: 'name', ascending: true },
}

export async function getAllCompanies({ client, sort, page, limit }: {
  client: SupabaseClient<Database>
  sort?: string
  page?: number | string
  limit?: number | string
}) {
  const { data, count, error } = await generateListQuery({
    sort,
    page,
    limit,
    query: client
      .from('companies')
      .select(COMPANY_COLUMNS, { count: 'exact' })
      .eq('codes.language', 'en'),
    sortMapping,
  })

  if (error)
    console.log('error', error)

  return { items: data, count }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as {
    sort?: string
    page?: string
    limit?: string
    category?: string
  }

  const client = serverSupabaseClient<Database>(event)

  if (query?.category) {
    let supabaseQuery = generateListQuery({
      sort: query?.sort,
      page: query?.page,
      limit: query?.limit,
      query: client
        .from('company_categories')
        .select(`company(${COMPANY_COLUMNS})`, { count: 'exact' })
        .eq('company.codes.language', 'en'),
      sortForeignTable: 'company',
      sortMapping,
    })

    if (query?.category)
      supabaseQuery = supabaseQuery.eq('category', query.category)

    const { data, count } = await supabaseQuery
    return { items: data?.map(({ company }: any) => company) || [], count }
  }
  else {
    return await getAllCompanies({
      sort: query?.sort,
      page: query?.page,
      limit: query?.limit,
      client,
    })
  }
})
