<script lang="ts" setup>
useSchemaOrg([
  defineOrganization({
    name: 'Nuxt.js',
    logo: '/logo.png',
    sameAs: [
      'https://twitter.com/nuxt_js',
    ],
  }),
  defineWebSite({
    name: 'Nuxt',
  }),
  defineWebPage(),
])

const userStore = useUserStore()
const user = await useSupabaseUser()

await useAsyncData('profile', () => {
  return userStore.fetchUser()
}, {
  watch: [user],
})
</script>

<template>
  <Nav />
  <NuxtPage />
  <Footer />
</template>
