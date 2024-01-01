import type { USER_ROLES } from '~/types'

export function useUserNavigation() {
  const userStore = useUserStore()

  const userNavigation = computed<{ name: string, to: string, visible: boolean }[]>(() => [
    { name: 'Admin', to: '/admin', visible: (['ADMIN', 'SUPER_ADMIN'] as USER_ROLES[]).includes(userStore.user.role as USER_ROLES) },
    { name: 'Your Profile', to: '/account', visible: true },
    { name: 'Manage Codes', to: '/managecodes', visible: true },
    { name: 'Add Company', to: '/companies/add', visible: true },
  ])

  return { userNavigation }
}
