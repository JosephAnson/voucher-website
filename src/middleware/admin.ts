import type { USER_ROLES } from '~/types'

export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()

  if (!user.value)
    return navigateTo('/login')

  const userStore = useUserStore()
  await userStore.fetchUser()

  const allowedRoles: USER_ROLES[] = ['ADMIN', 'SUPER_ADMIN']

  if (!userStore.user.role || !allowedRoles.includes(userStore.user.role))
    return navigateTo('/login')
})
