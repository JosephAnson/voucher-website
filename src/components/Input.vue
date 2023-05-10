<script lang="ts" setup>
const props = withDefaults(defineProps<{
  modelValue?: number | string
  id?: string
  disabled?: boolean
  readonly?: boolean
  type?: string
  placeholder?: string
}>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
})

const emit = defineEmits(['update:modelValue', 'change'])

const input = useVModel(props, 'modelValue', emit)

const labelFor = inject('labelFor', null)
const error = inject('error', false)
</script>

<template>
  <textarea
    v-if="type === 'textarea'"
    :id="labelFor || props.id"
    v-model="input"
    :name="props.id"
    :placeholder="props.placeholder"
    class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
    :class="{
      'bg-gray-300 cursor-not-allowed': props.disabled,
      'ring-red-300': error,
    }"
    :disabled="props.disabled"
  />
  <input
    v-else
    :id="labelFor || props.id"
    v-model="input"
    :name="props.id"
    :type="props.type"
    :placeholder="props.placeholder"
    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
    :class="{
      'bg-gray-300': props.disabled,
      'ring-red-300': error,
    }"
    :disabled="props.disabled"
    :readonly="props.readonly"
  >
</template>
