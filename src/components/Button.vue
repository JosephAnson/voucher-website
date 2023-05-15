<script lang="ts" setup>
const props = withDefaults(defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  theme?: 'primary' | 'white' | 'transparent' | 'danger'
  rounded?: boolean
  disabled?: boolean
  to?: string
}>(), {
  size: 'md',
  theme: 'primary',
  rounded: true,
})

const component = computed(() => {
  if (props.to)
    return resolveComponent('NuxtLink')
  return 'button'
})
</script>

<template>
  <component
    :is="component"
    :to="props.to"
    type="button"
    class="flex-shrink-0 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    :class="{
      'text-xs px-2.5 py-1': props.size === 'xs',
      'text-sm px-2.5 py-1': props.size === 'sm',
      'text-sm px-3 py-1.5': props.size === 'md',
      'text-sm px-3.5 py-2': props.size === 'lg',
      'text-sm px-4 py-2.5': props.size === 'xl',
      'bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline-primary-600': props.theme === 'primary',
      'bg-white border hover:bg-gray-100 focus-visible:outline-primary-600': props.theme === 'white',
      'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600': props.theme === 'danger',
      'border hover:bg-gray-100 focus-visible:outline-primary-600': props.theme === 'transparent',
      'rounded-md': props.rounded,
      'rounded': !props.rounded,
      'opacity-50': props.disabled,
    }"
  >
    <slot />
  </component>
</template>
