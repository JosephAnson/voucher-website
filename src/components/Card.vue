<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  imageSrc?: string
  imageAlt?: string
  imageWidth?: number
  imageClasses?: string
  to?: string
}>(), {
  imageClasses: 'object-contain aspect-1/1',
})

const component = computed(() => {
  if (props.to)
    return resolveComponent('NuxtLink')
  return 'div'
})
</script>

<template>
  <div class="bg-white shadow rounded-2xl p-1 md:p-2 flex items-center justify-center flex-col w-full h-full">
    <Component
      :is="component"
      :to="props.to"
      class="w-full"
    >
      <NuxtImg
        v-if="props.imageSrc"
        class="w-full rounded-xl mb-2 last:mb-0 flex-grow-1"
        :src="props.imageSrc"
        :alt="props?.imageAlt || props?.title || ''"
        :width="props?.imageWidth || ''"
        :class="props?.imageClasses"
        loading="lazy"
      />
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
    </Component>
  </div>
</template>
