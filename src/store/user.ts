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
    setUser({ email, id, username, avatar_url }: ProfilesRow) {
      this.user.email = email
      this.user.username = username
      this.user.id = id
      this.user.avatar_url = avatar_url
    },
    async fetchUser() {
      const data = await $fetch('/api/profile/', {
        headers: useRequestHeaders(['cookie']) as any,
      })

      if (data)
        this.setUser(data)
    },
    async signOut() {
      const client = useSupabaseAuthClient()

      return await client.auth.signOut()
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

      const { error } = await client.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        openSnackbar({ title: 'Login Failed!', message: error.message, status: 'danger' })
      }
      else {
        openSnackbar({ title: 'Logged in!' })
        await router.push('/')
      }
    },
    async signUpWithEmail({ email, password, username, returnUrl }: { email: string; password: string; username: string; returnUrl?: string }) {
      const client = useSupabaseAuthClient()

      const { data } = await client.auth.signUp(
        {
          email,
          password,
          options: {
            data: { username },
            emailRedirectTo: returnUrl || window.location.origin,
          },
        })

      if (data)
        this.signInWithEmail({ email, password })
    },
    async signInWithOtp({ email, returnUrl }: { email: string; returnUrl?: string }) {
      const client = useSupabaseAuthClient()
      const router = useRouter()

      const { error } = await client.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: returnUrl || window.location.origin,
        },
      })

      if (error) {
        openSnackbar({ title: 'Login Failed!', message: error.message, status: 'danger' })
      }
      else {
        openSnackbar({ title: 'Check your emails for the sign in link!' })
        await router.push('/checkEmail')
      }
    },
  },
})
