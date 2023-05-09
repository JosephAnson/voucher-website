<script lang="ts" setup>
await useFetchProfileOnSupabaseUserUpdate()

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
</script>

<template>
  <div class="bg-[#FFFBF5]">
    <Nav />
    <NuxtPage />
    <Footer />
  </div>
</template>
