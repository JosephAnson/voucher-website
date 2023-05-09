<script lang="ts" setup>
await useFetchProfileOnSupabaseUserUpdate()

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
  <div class="bg-[#FFFBF5]">
    <Nav />
    <NuxtPage />
    <Footer />
  </div>
</template>
