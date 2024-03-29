import type { ProfilesRow, USER_ROLES } from '~/types'

export interface UserState {
  user: {
    avatar_url: string | null
    email: string
    id: string
    username: string | null
    role: USER_ROLES | null
  }
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: {
      id: '',
      username: '',
      email: '',
      avatar_url: '',
      role: null,
    },
  }),
  actions: {
    setUser({ email, id, username, avatar_url, role }: ProfilesRow) {
      this.user.email = email
      this.user.username = username
      this.user.id = id
      this.user.avatar_url = avatar_url
      this.user.role = role as USER_ROLES

      return this.user
    },
    async updateAvatar(avatar_url: string) {
      const { error } = await $fetch('/api/profile/updateAvatar', {
        method: 'PATCH',
        body: {
          avatar_url,
        },
      })

      if (error) {
        openSnackbar({ title: 'Avatar update Failed!', message: error.message, status: 'danger' })
      }
      else {
        // Force reload avatar
        this.user.avatar_url = `${avatar_url}?${Date.now()}`
        openSnackbar({ title: 'Avatar updated!' })
      }
    },
    async updateUsername(username?: string) {
      if (!username) {
        openSnackbar({
          message: 'Username cannot be empty!',
          status: 'danger',
        })
      }
      else {
        const usernameExists = await $fetch('/api/profile/usernameExists', {
          method: 'POST',
          body: {
            username,
          },
        })

        if (usernameExists) {
          openSnackbar({
            message: 'Username exists try another!',
            status: 'danger',
          })
        }
        else {
          const data = await $fetch('/api/profile/updateUsername', {
            method: 'PATCH',
            body: {
              username,
            },
          })

          if (data?.username)
            this.user.username = data.username

          openSnackbar('Saved username')
        }
      }
    },
    async signOut() {
      const router = useRouter()
      const client = useSupabaseClient()

      const { error } = await client.auth.signOut()

      if (error) {
        openSnackbar({ title: 'Signout Failed!', message: error.message, status: 'danger' })
      }
      else {
        openSnackbar({ title: 'Signed out!' })
        await router.push('/')
      }
    },
    async signInWithSocial({ provider }: { provider: 'discord' | 'google' }) {
      const router = useRouter()
      const client = useSupabaseClient()

      const { error } = await client.auth.signInWithOAuth({
        provider,
      })

      if (error)
        openSnackbar({ title: 'Login Failed!', message: error.message, status: 'danger' })
      else
        await router.push('/confirm')
    },
    async signInWithEmail({ email, password }: { email: string, password: string }) {
      const router = useRouter()
      const client = useSupabaseClient()

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
    async signUpWithEmail({ email, password, username }: { email: string, password: string, username: string }) {
      const client = useSupabaseClient()
      const router = useRouter()

      const { error } = await client.auth.signUp(
        {
          email,
          password,
          options: {
            data: { username },
          },
        },
      )

      if (error)
        openSnackbar({ title: 'Login Failed!', message: error.message, status: 'danger' })
      else
        await router.push('/confirmEmail')
    },
    async signInWithOtp({ email }: { email: string }) {
      const client = useSupabaseClient()
      const router = useRouter()

      const { error } = await client.auth.signInWithOtp({
        email,
      })

      if (error) {
        openSnackbar({ title: 'Login Failed!', message: error.message, status: 'danger' })
      }
      else {
        openSnackbar({ title: 'Check your emails for the sign in link!' })
        await router.push('/checkEmail')
      }
    },
    async updatePassword({ newPassword }: { newPassword: string }) {
      const client = useSupabaseClient()

      return client.auth
        .updateUser({ password: newPassword })
    },
    async forgotPassword({ email }: { email: string }) {
      const client = useSupabaseClient()
      const router = useRouter()

      const { error, data } = await client.auth
        .resetPasswordForEmail(email)

      if (error) {
        openSnackbar({ title: 'Password reset failed!', message: error.message, status: 'danger' })
      }
      else {
        await router.push('/updatePassword')
        openSnackbar({ title: 'Check your emails to reset the password!' })
      }

      return { error, data }
    },
  },
})
