<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

const props = withDefaults(defineProps<{
  modelValue?: string | number | boolean
  id?: string
  placeholder?: string
}>(), {
  modelValue: '',
})

const emit = defineEmits(['update:modelValue'])
const newValue = useVModel(props, 'modelValue', emit, { passive: true })

const labelFor = inject('labelFor', null)
</script>

<template>
  <select
    :id="labelFor || props.id"
    v-model="newValue"
    class="block w-full border-0 rounded-md py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset sm:text-sm placeholder:text-gray-400 sm:leading-6 focus:ring-2 focus:ring-primary-600 focus:ring-inset"
  >
    <template v-if="props.placeholder">
      <option
        :value="null"
        disabled
        hidden
      >
        {{ props.placeholder }}
      </option>
    </template>

    <slot />
  </select>
</template>
