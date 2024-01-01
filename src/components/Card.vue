<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  imageSrc?: string
  imageAlt?: string
  imageWidth?: number
  imageClasses?: string
  imageQuality?: number
  to?: string
}>(), {
  imageQuality: 100,
  imageClasses: 'object-contain aspect-1/1',
})

const component = computed(() => {
  if (props.to)
    return resolveComponent('NuxtLink')
  return 'div'
})
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center rounded-2xl bg-white p-1 shadow md:p-2">
    <Component
      :is="component"
      :to="props.to"
      class="w-full"
    >
      <NuxtImg
        v-if="props.imageSrc"
        class="mb-2 w-full flex-grow-1 rounded-xl last:mb-0"
        :src="props.imageSrc"
        :alt="props?.imageAlt || props?.title || ''"
        :width="props?.imageWidth || ''"
        :class="props?.imageClasses"
        :quality="props.imageQuality"
        loading="lazy"
        fit="contain"
      />
      <h3
        v-if="props.title"
        class="text-center text-sm"
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
