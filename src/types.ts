import type { Database } from '~/supabase.types'

export type ProfilesRow = Database['public']['Tables']['profiles']['Row']
export const SORT_OPTIONS = ['ALPHABETICAL', 'NEWEST'] as const
export type SORTS = typeof SORT_OPTIONS[number] // union type

export interface Code {
  code: string
  title: string
  description: string
  language: string
}
