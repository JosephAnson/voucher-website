<script lang="ts" setup>
const user = await useSupabaseClient()
const userStore = useUserStore()

// Get the user profile on page load
const { data } = await useFetch('/api/profile/', {
  headers: useRequestHeaders(['cookie']),
})

if (data.value)
  userStore.setUser(data.value.data)

// Listen for auth state changes
if (process.client) {
  user.auth.onAuthStateChange(async () => {
    const { data } = await $fetch('/api/profile/')
    if (data)
      userStore.setUser(data)
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
  <div>
    <SeoKit />
    <!-- a. Generates browser screenshots for every page -->
    <OgImageScreenshot />
    <!-- b. Generate satori images for every page (uses the default template) -->
    <OgImageStatic />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
