import type { QueryValue } from 'ufo'
import type { SupabaseClient } from '@supabase/supabase-js'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'
import type { SORTS } from '~/types'
import { SORT_OPTIONS } from '~/types'
import { COMPANY_COLUMNS } from '~/utils/constants'

interface SortItem {
  sort: string
  ascending: boolean
}

function getSort(sort: string | undefined | QueryValue, defaultSort: SORTS): SortItem {
  const sortString = SORT_OPTIONS.includes(sort as SORTS) ? sort : defaultSort

  const mappedSort: Record<SORTS, SortItem> = {
    NEWEST: { sort: 'created_at', ascending: false },
    ALPHABETICAL: { sort: 'name', ascending: true },
  }

  return mappedSort[sortString as SORTS]
}

export async function getAllCompanies({ client, sort, limit, page }: {
  client: SupabaseClient<Database>
  sort: SortItem
  limit: number
  page: number
}) {
  const { data, count } = await client
    .from('companies')
    .select(COMPANY_COLUMNS, { count: 'exact' })
    .eq('codes.language', 'en')
    .order(sort.sort, { foreignTable: '', ascending: sort.ascending })
    .range(limit * page, page === 0 ? limit - 1 : limit * page + limit - 1)

  return { companies: data, count }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const client = serverSupabaseClient<Database>(event)

  const sort = getSort(query?.sort, 'ALPHABETICAL')
  const limit = Number(query?.limit || 10000)
  const page = Number(query?.page - 1 || 0)

  if (query?.category) {
    const { data, count } = await client
      .from('company_categories')
      .select(`company(${COMPANY_COLUMNS})`, { count: 'exact' })
      .range(limit * page, page === 0 ? limit - 1 : limit * page + limit - 1)
      .eq('category', query?.category)
      .eq('company.codes.language', 'en')
      .order(sort.sort, { foreignTable: 'company', ascending: sort.ascending })

    return { companies: data?.map(({ company }: any) => company) || [], count }
  }
  else {
    return await getAllCompanies({ client, sort, limit, page })
  }
})
