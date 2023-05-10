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
    class="field items-center mb-4 last-child:mb-0"
    :class="{ flex: !props.stacked }"
  >
    <slot name="label">
      <label
        v-if="props.label"
        :for="props.labelFor"
        class="label mr-4 inline-block text-sm font-medium leading-6 text-gray-900"

        :class="{ 'mb-2': props.stacked }"
      >
        {{ props.label }}
      </label>
    </slot>
    <slot />
    <p
      v-if="props.message"
      class="mt-1 text-xs leading-6 text-gray-600"
    >
      {{ props.message }}
    </p>
    <p
      v-if="props.error"
      class="mt-1 text-xs leading-6 text-red-600"
    >
      {{ props.error }}
    </p>
  </div>
</template>
