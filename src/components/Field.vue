<script lang="ts" setup>
const props = withDefaults(defineProps<{
  label?: string
  message?: string
  error?: string
  stacked?: boolean
  labelFor?: string
}>(), {
  stacked: false,
})

provide('labelFor', props.labelFor)
provide('error', props.error)
</script>

<template>
  <div
    class="field last-child:mb-0 mb-4 items-center"
    :class="{ flex: !props.stacked }"
  >
    <slot name="label">
      <label
        v-if="props.label"
        :for="props.labelFor"
        class="label mr-4 inline-block text-sm text-gray-900 font-medium leading-6"

        :class="{ 'mb-2': props.stacked }"
      >
        {{ props.label }}
      </label>
    </slot>
    <slot />
    <p
      v-if="props.message"
      class="mt-1 text-xs text-gray-600 leading-6"
    >
      {{ props.message }}
    </p>
    <p
      v-if="props.error"
      class="mt-1 text-xs text-red-600 leading-6"
    >
      {{ props.error }}
    </p>
  </div>
</template>
