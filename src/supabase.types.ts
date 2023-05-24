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
      categories: {
        Row: {
          category: string
          id: number
          order: number
        }
        Insert: {
          category: string
          id?: number
          order?: number
        }
        Update: {
          category?: string
          id?: number
          order?: number
        }
      }
      codes: {
        Row: {
          author: string
          code: string
          company: string
          created_at: string | null
          description: string
          id: number
          language: string
          title: string
        }
        Insert: {
          author: string
          code: string
          company: string
          created_at?: string | null
          description: string
          id?: number
          language?: string
          title: string
        }
        Update: {
          author?: string
          code?: string
          company?: string
          created_at?: string | null
          description?: string
          id?: number
          language?: string
          title?: string
        }
      }
      companies: {
        Row: {
          approved: boolean
          created_at: string | null
          description: string | null
          featured: boolean
          id: string
          logo: string
          metaDescription: string | null
          metaTitle: string | null
          name: string
          url: string
        }
        Insert: {
          approved?: boolean
          created_at?: string | null
          description?: string | null
          featured?: boolean
          id: string
          logo: string
          metaDescription?: string | null
          metaTitle?: string | null
          name?: string
          url: string
        }
        Update: {
          approved?: boolean
          created_at?: string | null
          description?: string | null
          featured?: boolean
          id?: string
          logo?: string
          metaDescription?: string | null
          metaTitle?: string | null
          name?: string
          url?: string
        }
      }
      company_categories: {
        Row: {
          category: number
          company: string
          id: number
        }
        Insert: {
          category: number
          company: string
          id?: number
        }
        Update: {
          category?: number
          company?: string
          id?: number
        }
      }
      profile_roles: {
        Row: {
          role: string
        }
        Insert: {
          role: string
        }
        Update: {
          role?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string
          id: string
          role: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          email: string
          id: string
          role?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string
          id?: string
          role?: string | null
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
