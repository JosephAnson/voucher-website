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
</script>

<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
