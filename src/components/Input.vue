<script lang="ts" setup>
const props = withDefaults(defineProps<{
  modelValue?: number | string
  id?: string
  disabled?: boolean
  type?: string
  placeholder?: string
}>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
})

const emit = defineEmits(['update:modelValue', 'change'])

const input = useVModel(props, 'modelValue', emit)
</script>

<template>
  <textarea
    v-if="type === 'textarea'"
    :id="id"
    v-model="input"
    :placeholder="placeholder"
    class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    :class="{
      'bg-gray-300 cursor-not-allowed': disabled,
    }"
    :disabled="disabled"
  />
  <input
    v-else
    :id="id"
    v-model="input"
    :type="type"
    :placeholder="placeholder"
    class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    :class="{
      'bg-gray-300 cursor-not-allowed': disabled,
    }"
    :disabled="disabled"
  >
</template>
