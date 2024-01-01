<script setup lang="ts">
const { data: companies } = await useFetch('/api/companies/featured', { query: { limit: 36 } })
const companyCount = computed(() => companies.value?.length)
</script>

<template>
  <div class="grid grid-cols-4 gap-2 md:grid-cols-6 xl:grid-cols-12">
    <Card
      v-for="company in companies"
      :key="company.id"
      :to="`/companies/${company.id}`"
      :image-src="company.logo"
      :image-alt="company.alt"
      :image-width="88"
      :image-quality="75"
    />
  </div>
  <div class="mt-16 flex justify-center">
    <p class="relative rounded-full bg-gray-50 px-4 py-1.5 text-sm text-gray-600 leading-6 ring-1 ring-gray-900/5 ring-inset">
      <span class="hidden md:inline">Get voucher codes for over {{ companyCount }} companies.</span>
    </p>
  </div>
</template>
