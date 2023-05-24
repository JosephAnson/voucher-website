<script lang="ts" setup>
const user = await useSupabaseClient()
const userStore = useUserStore()

await useAsyncData('profile', () => userStore.fetchUser())

user.auth.onAuthStateChange(async () => {
  await userStore.fetchUser()
})

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
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
