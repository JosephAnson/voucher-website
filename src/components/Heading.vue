<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  h1: {
    type: Boolean,
    default: false,
  },
  h2: {
    type: Boolean,
    default: false,
  },
  h4: {
    type: Boolean,
    default: false,
  },
  p: {
    type: Boolean,
    default: false,
  },
  bold: {
    type: Boolean,
    default: false,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  styled: {
    type: String as PropType<HeadingSizesType | null>,
    validator: (value: HeadingSizesType) => (['h1', 'h2', 'h3', 'h4', 'p'] as HeadingSizesTuple).includes(value),
    default: null,
  },
  marginBottom: {
    type: Boolean,
    default: true,
  },
})

const HEADING_SIZES = ['h1', 'h2', 'h3', 'h4', 'p'] as const
type HeadingSizesTuple = typeof HEADING_SIZES
type HeadingSizesType = HeadingSizesTuple[number]

const type = computed(() => {
  if (props.h1)
    return 'h1'
  if (props.h2)
    return 'h2'
  if (props.h4)
    return 'h4'
  if (props.p)
    return 'p'

  return 'h3'
})

function getHeaderClass(type: HeadingSizesType) {
  switch (type) {
    case 'h1':
      return 'text-2xl md:text-3xl'.concat(props.marginBottom ? ' mb-5' : '')
    case 'h2':
      return 'text-xl md:text-2xl'.concat(props.marginBottom ? ' mb-4' : '')
    case 'h4':
      return 'md:text-l'.concat(props.marginBottom ? ' mb-2' : '')
    default:
      return 'text-xl md:text-xl'.concat(props.marginBottom ? ' mb-3' : '')
  }
}

const styles = computed(() => {
  if (!props.styled)
    return getHeaderClass(type.value)
  return getHeaderClass(props.styled)
})
</script>

<template>
  <component
    :is="type"
    class="heading font-semibold"
    :class="[styles, { 'font-bold': bold, 'font-secondary': !props.primary }]"
  >
    <slot />
  </component>
</template>
