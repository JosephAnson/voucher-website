<script setup lang="ts">
const props = defineProps<{
  wrap?: boolean
}>()
</script>

<template>
  <div
    class="grid flex gap-2"
    :class="{ 'flex-wrap': props.wrap }"
  >
    <slot />
  </div>
</template>
