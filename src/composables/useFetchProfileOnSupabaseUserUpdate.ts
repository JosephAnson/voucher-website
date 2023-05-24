export async function useFetchProfileOnSupabaseUserUpdate() {
  const userStore = useUserStore()
  const user = await useSupabaseAuthClient()

  await useAsyncData('profile', () => userStore.fetchUser())

  user.auth.onAuthStateChange(async () => {
    await userStore.fetchUser()
  })
}
