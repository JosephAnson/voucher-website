<script setup lang="ts">
const props = defineProps<{
  title: string
  imageSrc: string
  imageAlt: string
  to: string
}>()
</script>

<template>
  <div class="bg-white shadow rounded-2xl p-2 flex items-center justify-center flex-col w-full h-full">
    <component
      :is="props.to ? 'NuxtLink' : 'div'"
      :to="props.to"
      class="w-full"
    >
      <img
        v-if="props.imageSrc"
        class="w-full rounded-xl mb-2 last:mb-0 flex-grow-1 object-contain aspect-1/1"
        :src="props.imageSrc"
        :alt="props.imageAlt"
      >
      <h3
        v-if="props.title"
        class="text-sm text-center"
      >
        {{ props.title }}
      </h3>
      <div
        v-if="$slots.default"
        class="w-full"
      >
        <slot />
      </div>
    </component>
  </div>
</template>
