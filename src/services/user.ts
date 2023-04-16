export async function login(provider: 'discord' | 'google', returnUrl?: string) {
  const client = useSupabaseAuthClient()

  await client.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: returnUrl || window.location.origin,
    },
  })

  // if (error) return openSnackbar('Something went wrong !')
}

export async function signInWithOtp(email: string, returnUrl?: string) {
  const client = useSupabaseAuthClient()
  const router = useRouter()

  await client.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: returnUrl || window.location.origin,
    },
  })

  // if (error) return openSnackbar(`Something went wrong: ${error}`)

  await router.push('/checkemail')
}
