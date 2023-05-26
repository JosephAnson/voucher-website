<script setup lang="ts">
import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid'

const props = withDefaults(defineProps<{
  size?: 'small' | 'large'
  image?: string | null
  message?: string
  path?: string
  bucket: string
  fileName?: string
  onUpload: (url: string) => void
}>(), {
  path: '',
  size: 'small',
})

const component = computed(() => {
  if (props.size === 'small')
    return UserCircleIcon
  return PhotoIcon
})

const computedPath = computed(() => props.path)

const { open, onUpload: onSupabaseUpload } = useSupabaseUpload({
  fileName: props.fileName,
  bucket: props.bucket,
  path: computedPath,
})

onSupabaseUpload((url) => {
  props.onUpload(url)
})
</script>

<template>
  <div
    class="items-center gap-x-3"
    :class="{
      flex: props.size === 'small',
    }"
  >
    <template v-if="loading">
      <div
        class="i-carbon-progress-bar-round animate-spin"
        :class="{
          'h-10 w-10 rounded-full': props.size === 'small',
          'h-22 w-22 mb-2': props.size === 'large',
        }"
      />
    </template>
    <template v-else>
      <img
        v-if="props.image "
        class="object-contain"
        :class="{
          'h-10 w-10 rounded-full': props.size === 'small',
          'h-22 w-22 mb-2': props.size === 'large',
        }"
        :src="props.image"
        alt=""
      >
      <component
        :is="component"
        v-else
        class="text-gray-300"
        :class="{
          'h-12 w-12 rounded-full': props.size === 'small',
          'h-24 w-24 ml--1 mt--3': props.size === 'large',
        }"
        aria-hidden="true"
      />
      <Button
        theme="primary"
        @click="open"
      >
        Change
      </Button>
    </template>
  </div>
  <p
    v-if="props.message"
    class="text-xs mt-2"
  >
    {{ props.message }}
  </p>
</template>
