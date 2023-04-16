<script lang="ts" setup>
const props = withDefaults(defineProps<{
  label?: string
  stacked?: boolean
  labelFor?: boolean
}>(), {
  stacked: false,
  labelFor: false,
})

provide('labelFor', props.labelFor)
</script>

<template>
  <div
    class="field items-center mb-4 last-child:mb-0"
    :class="{ flex: !props.stacked }"
  >
    <label
      v-if="props.label"
      :for="props.labelFor"
      class="label mr-4 inline-block"
      :class="{ 'mb-2': props.stacked }"
    >
      {{ props.label }}
    </label>
    <slot />
  </div>
</template>
