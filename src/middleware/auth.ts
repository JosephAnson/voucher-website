export default defineNuxtRouteMiddleware(() => {
  if (process.server) {
    const user = useSupabaseUser()

    if (!user.value)
      return navigateTo('/')
  }
  else {
    return navigateTo('/')
  }
})
