import type { USER_ROLES } from '~/types'

export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()

  if (!user.value)
    return navigateTo('/login')

  const { data } = await useFetch('/api/profile/', {
    headers: useRequestHeaders(['cookie']),
  })

  const allowedRoles: USER_ROLES[] = ['ADMIN', 'SUPER_ADMIN']

  if (!data.value?.data?.role || !allowedRoles.includes(data.value?.data?.role as USER_ROLES))
    return navigateTo('/404')
})
