export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      codes: {
        Row: {
          author: string
          code: string
          company: string
          created_at: string | null
          description: string
          id: number
          title: string
        }
        Insert: {
          author: string
          code: string
          company: string
          created_at?: string | null
          description: string
          id?: number
          title: string
        }
        Update: {
          author?: string
          code?: string
          company?: string
          created_at?: string | null
          description?: string
          id?: number
          title?: string
        }
      }
      companies: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          logo: string
          name: string
          url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id: string
          logo?: string
          name?: string
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          logo?: string
          name?: string
          url?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          email: string
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string
          id?: string
          username?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
