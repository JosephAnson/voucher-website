<script setup lang="ts">
const props = defineProps<{
  id: number
  name: string
  description: string
  author: string
  avatarSrc: string
}>()
</script>

<template>
  <li class="overflow-hidden rounded-xl border border-gray-200">
    <NuxtLink
      :to="`/code/${props.id}`"
      class="flex flex-col h-full"
    >
      <div class="flex flex-grow-1 justify-between gap-x-4 bg-gray-50 p-4">
        <div class="flex items-center">
          <img
            :src="props.avatarSrc"
            :alt="`${props.author}.`"
            class="h-12 w-12 rounded-full"
          >
          <div class="ml-4">
            <h4 class="text-sm font-bold text-gray-900">
              {{ props.author }}
            </h4>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <Input model-value="RAON1****" />
          <Button class="flex-shrink-0">
            Reveal Code
          </Button>
        </div>
      </div>

      <div class="p-4 flex gap-x-4 justify-between">
        <div>
          <Heading>{{ props.name }}</Heading>
          <p class="line-clamp-3">
            {{ props.description }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </li>
</template>
