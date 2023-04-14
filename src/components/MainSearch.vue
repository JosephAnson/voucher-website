<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { ref, useRouter } from '#imports'

const router = useRouter()
const search = ref('')
function searchCompanies() {
  router.push(`/companies?search=${search.value}`)
}
</script>

<template>
  <form
    class="w-full"
    @submit.prevent="searchCompanies"
  >
    <label
      for="search"
      class="sr-only"
    >
      Search
    </label>
    <div class="relative">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <div class="flex items-center space-x-2">
        <div class="relative  flex items-center w-full">
          <Input
            id="search"
            v-model="search"
            type="text"
            name="search"
          />
          <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <kbd class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">⌘K</kbd>
          </div>
        </div>
        <Button
          size="lg"
          @click="searchCompanies"
        >
          Search Company
        </Button>
      </div>
    </div>
  </form>
</template>
