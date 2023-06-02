import type { H3Event } from 'h3'
import type { PostgrestFilterBuilder } from '@supabase/postgrest-js'
import type { QueryValue } from 'ufo'
import type { Database } from '~/supabase.types'
import type { SORTS } from '~/types'
import { SORT_OPTIONS } from '~/types'

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

export function generateListQuery({ event, query: supabaseQuery, sortForeignTable }: {
  event: H3Event
  query: PostgrestFilterBuilder<Database['public'], any, any>
  sortForeignTable?: string
}) {
  const query = getQuery(event)

  let newSupabaseQuery = supabaseQuery

  if (query?.sort) {
    const sort = getSort(query.sort, 'ALPHABETICAL')
    newSupabaseQuery = newSupabaseQuery.order(sort.sort, { foreignTable: sortForeignTable || '', ascending: sort.ascending })
  }

  if (query?.limit && query?.page) {
    const limit = Number(query.limit || 10000)
    const page = Number(Number(query.page) - 1)
    newSupabaseQuery = newSupabaseQuery.range(limit * page, page === 0 ? limit - 1 : limit * page + limit - 1)
  }

  return newSupabaseQuery
}
