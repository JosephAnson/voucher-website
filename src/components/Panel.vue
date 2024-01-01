<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  link?: {
    href?: string
    text?: string
  }
}>()
</script>

<template>
  <div class="bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-base text-gray-900 font-semibold leading-6">
        {{ props.title }}
      </h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p><slot /></p>
      </div>
      <div
        v-if="props.link && props.link.href"
        class="mt-3 text-sm leading-6"
      >
        <a
          :href="props.link.href"
          class="text-primary-600 font-semibold hover:text-primary-500"
        >
          {{ props.link.text }}
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  </div>
</template>
