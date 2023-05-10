<script setup lang="ts">
const props = withDefaults(defineProps<{
  paddingTop?: boolean
  paddingBottom?: boolean
}>(), {
  paddingTop: true,
  paddingBottom: true,
})
</script>

<template>
  <div
    :class="{
      'pt-8': props.paddingTop,
      'pb-8': props.paddingBottom,
    }"
  >
    <slot />
  </div>
</template>
