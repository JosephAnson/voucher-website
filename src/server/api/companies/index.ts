import type { SupabaseClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'
import { COMPANY_COLUMNS } from '~/utils/constants'
import { generateListQuery } from '~/server/utils/generateListQuery'

const sortMapping = {
  NEWEST: { sort: 'created_at', ascending: false },
  ALPHABETICAL: { sort: 'name', ascending: true },
}

export async function getAllCompanies({ client, event }: {
  client: SupabaseClient<Database>
  event: H3Event
}) {
  const { data, count } = await generateListQuery({
    event,
    query: client
      .from('companies')
      .select(COMPANY_COLUMNS, { count: 'exact' })
      .eq('codes.language', 'en'),
    sortMapping,
  })

  return { items: data, count }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const client = serverSupabaseClient<Database>(event)

  if (query?.category) {
    let supabaseQuery = generateListQuery({
      event,
      query: client
        .from('company_categories')
        .select(`company(${COMPANY_COLUMNS})`, { count: 'exact' })
        .eq('company.codes.language', 'en'),
      sortForeignTable: 'company',
      sortMapping,
    })

    if (query?.category)
      supabaseQuery = supabaseQuery.eq('category', query.category)

    const { data, count, error } = await supabaseQuery
    return { items: data?.map(({ company }: any) => company) || [], count }
  }
  else {
    return await getAllCompanies({ event, client })
  }
})
