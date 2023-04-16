import type { ProfilesRow } from '~/types'

export interface UserState {
  user: ProfilesRow
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: {
      username: '',
      email: '',
      id: '',
      avatar_url: '',
    },
  }),
  actions: {
    async signout() {
      const client = useSupabaseAuthClient()

      return await client.auth.signOut()
    },
    async fetchUser() {
      const data = await $fetch('/api/profile/', {
        headers: useRequestHeaders(['cookie']) as any,
      })

      if (data) {
        this.user.email = data.email
        this.user.username = data.username
        this.user.id = data.id
        this.user.avatar_url = data.avatar_url
      }
    },
    async signInWithSocial({ provider, returnUrl }: { provider: 'discord' | 'google'; returnUrl?: string }) {
      const client = useSupabaseAuthClient()

      await client.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: returnUrl || window.location.origin,
        },
      })

      // if (error) return openSnackbar('Something went wrong !')
    },
    async signInWithEmail({ email, password }: { email: string; password: string }) {
      const router = useRouter()
      const client = useSupabaseAuthClient()

      await client.auth.signInWithPassword({
        email,
        password,

      })

      await router.push('/')
    },
    async signUpWithEmail({ email, password, username, returnUrl }: { email: string; password: string; username: string; returnUrl?: string }) {
      const client = useSupabaseAuthClient()

      await client.auth.signUp(
        {
          email,
          password,
          options: {
            data: { username },
            emailRedirectTo: returnUrl || window.location.origin,
          },
        })
    },

  },
})
