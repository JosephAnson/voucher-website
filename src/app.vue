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

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - VouchersDiscountsCodes` : 'VouchersDiscountsCodes - Save Big with the Latest Deals and Promo Codes'
  },
})
</script>

<template>
  <div class="bg-[#FFFBF5]">
    <Nav />
    <NuxtPage />
    <Footer />
  </div>
</template>
