import type { QueryValue } from 'ufo'
import type { SupabaseClient } from '@supabase/supabase-js'
import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/supabase.types'
import type { SORTS } from '~/types'
import { SORT_OPTIONS } from '~/types'

const COMPANY_COLUMNS = 'id, name, description, url, logo, created_at, codes(id), metaTitle, metaDescription'

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

export async function getAllCompanies(client: SupabaseClient<Database>, sort: SortItem) {
  const { data } = await client
    .from('companies')
    .select(COMPANY_COLUMNS)
    .eq('codes.language', 'en')
    .order(sort.sort, { foreignTable: '', ascending: sort.ascending })

  return data
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const client = serverSupabaseClient<Database>(event)

  const sort = getSort(query?.sort, 'ALPHABETICAL')

  if (query?.category) {
    const { data } = await client
      .from('company_categories')
      .select(`company(${COMPANY_COLUMNS})`)
      .eq('category', query?.category)
      .eq('company.codes.language', 'en')
      .order(sort.sort, { foreignTable: 'company', ascending: sort.ascending })
    return data?.map(({ company }) => company) || []
  }
  else {
    return await getAllCompanies(client, sort)
  }
})
