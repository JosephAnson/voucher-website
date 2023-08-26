export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
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
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: 'codes_author_fkey'
            columns: ['author']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'codes_company_fkey'
            columns: ['company']
            referencedRelation: 'companies'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: 'company_categories_category_fkey'
            columns: ['category']
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'company_categories_company_fkey'
            columns: ['company']
            referencedRelation: 'companies'
            referencedColumns: ['id']
          },
        ]
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
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profiles_role_fkey'
            columns: ['role']
            referencedRelation: 'profile_roles'
            referencedColumns: ['role']
          },
        ]
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
