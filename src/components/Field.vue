<script lang="ts" setup>
const props = withDefaults(defineProps<{
  label?: string
  message?: string
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
      class="label mr-4 inline-block text-sm font-medium leading-6 text-gray-900"

      :class="{ 'mb-2': props.stacked }"
    >
      {{ props.label }}
    </label>
    <slot />
    <p
      v-if="props.message"
      class="mt-1 text-xs leading-6 text-gray-600"
    >
      {{ props.message }}
    </p>
  </div>
</template>
