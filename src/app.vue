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

await useFetchProfileOnSupabaseUserUpdate()
</script>

<template>
  <Nav />
  <NuxtPage />
  <Footer />
</template>
