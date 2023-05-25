<script lang="ts" setup>
const props = withDefaults(defineProps<{
  modelValue?: number | string
  id?: string
  disabled?: boolean
  readonly?: boolean
}>(), {
  modelValue: '',
})

const emit = defineEmits(['update:modelValue'])

const input = useVModel(props, 'modelValue', emit)

const labelFor = inject('labelFor', null)
const error = inject('error', false)
</script>

<template>
  <input
    :id="labelFor || props.id"
    v-model="input"
    :name="props.id"
    type="checkbox"
    class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
    :class="{
      'bg-gray-300': props.disabled,
      'ring-red-300': error,
    }"
    :disabled="props.disabled"
    :readonly="props.readonly"
  >
</template>
