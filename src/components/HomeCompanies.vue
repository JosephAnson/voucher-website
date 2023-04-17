<script setup lang="ts">
const { data: companies } = await useFetch('/api/companies')
</script>

<template>
  <div>
    <div class="-mx-6 grid grid-cols-3 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-5">
      <NuxtLink
        v-for="company in companies"
        :key="company.id"
        class="bg-gray-400/5 p-2 "
        :to="`/companies/${company.url}`"
      >
        <NuxtImg
          class="max-h-40 w-full object-contain"
          :src="company.logo"
          :alt="company.name"
          width="300"
          height="300"
        />
      </NuxtLink>
    </div>
    <div class="mt-16 flex justify-center">
      <p class="relative rounded-full bg-gray-50 px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-inset ring-gray-900/5">
        <span class="hidden md:inline">Get voucher codes for over 2500 companies.</span>
      </p>
    </div>
  </div>
</template>
