import type { H3Event } from 'h3'
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

export function generateListQuery({ event, query: supabaseQuery, sortForeignTable, sortMapping }: {
  event: H3Event
  query: PostgrestFilterBuilder<Database['public'], any, any>
  sortForeignTable?: string
  sortMapping: SortMapping
}) {
  const query = getQuery(event)

  let newSupabaseQuery = supabaseQuery

  if (query?.sort) {
    const sort = getSort(query.sort as string, sortMapping, 'ALPHABETICAL')
    newSupabaseQuery = newSupabaseQuery.order(sort.sort, { foreignTable: sortForeignTable || '', ascending: sort.ascending })
  }

  if (query?.limit && query?.page) {
    const limit = Number(query.limit || 10000)
    const page = Number(Number(query.page) - 1)
    newSupabaseQuery = newSupabaseQuery.range(limit * page, page === 0 ? limit - 1 : limit * page + limit - 1)
  }

  return newSupabaseQuery
}
