import type { PostgrestFilterBuilder } from '@supabase/postgrest-js'
import type { Database } from '~/supabase.types'
import type { SORTS } from '~/types'
import { SORT_OPTIONS } from '~/types'

type SortMapping = Record<SORTS, { sort: string; ascending: boolean }>
function getSort(sort: string, sortMapping: SortMapping, defaultSort: SORTS): {
  sort: string
  ascending: boolean
} {
  const sortString = SORT_OPTIONS.includes(sort as SORTS) ? sort : defaultSort
  return sortMapping[sortString as SORTS]
}

export function generateListQuery({ sort, page, limit, query: supabaseQuery, sortForeignTable, sortMapping }: {
  sort?: string
  page?: number | string
  limit?: number | string
  query: PostgrestFilterBuilder<Database['public'], any, any>
  sortForeignTable?: string
  sortMapping: SortMapping
}) {
  let newSupabaseQuery = supabaseQuery

  if (sort) {
    const newSort = getSort(sort, sortMapping, 'ALPHABETICAL')
    newSupabaseQuery = newSupabaseQuery.order(newSort.sort, { foreignTable: sortForeignTable || '', ascending: newSort.ascending })
  }

  if (limit && page) {
    const newLimit = Number(limit || 10000)
    const newPage = Number(Number(page) - 1)
    newSupabaseQuery = newSupabaseQuery.range(newLimit * newPage, page === 0 ? newLimit - 1 : newLimit * newPage + newLimit - 1)
  }

  return newSupabaseQuery
}
