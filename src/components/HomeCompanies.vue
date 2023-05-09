<script setup lang="ts">
const { data: companies } = await useFetch('/api/companies')
</script>

<template>
  <div class="grid grid-cols-4 gap-2 md:grid-cols-6 xl:grid-cols-12">
    <Card
      v-for="company in companies"
      :key="company.id"
      :to="`/companies/${company.id}`"
      :image-src="company.logo"
      :image-alt="company.alt"
    />
  </div>
  <div class="mt-16 flex justify-center">
    <p class="relative rounded-full bg-gray-50 px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-inset ring-gray-900/5">
      <span class="hidden md:inline">Get voucher codes for over 2500 companies.</span>
    </p>
  </div>
</template>
