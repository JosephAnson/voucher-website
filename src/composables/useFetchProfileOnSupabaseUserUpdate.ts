export async function useFetchProfileOnSupabaseUserUpdate() {
  const userStore = useUserStore()
  const user = await useSupabaseUser()

  await useAsyncData('profile', () => {
    return userStore.fetchUser()
  }, {
    watch: [user],
  })
}
