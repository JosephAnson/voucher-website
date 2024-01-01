<script lang="ts" setup>
const user = useSupabaseClient()
const userStore = useUserStore()

// Get the user profile on page load
const { data } = await useFetch('/api/profile/', {
  headers: useRequestHeaders(['cookie']),
})

if (data.value?.data)
  userStore.setUser(data.value.data)

// Listen for auth state changes
if (process.client) {
  user.auth.onAuthStateChange(async () => {
    const data = await $fetch('/api/profile/', {
      headers: useRequestHeaders(['cookie']),
    })

    if (data?.data)
      userStore.setUser(data.data)
  })
}

useSchemaOrg([
  defineOrganization({
    name: 'Vouchers Discounts Codes',
    logo: '/logo.svg',
  }),
  defineWebSite({
    name: 'Vouchers Discounts Codes',
  }),
  defineWebPage(),
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
