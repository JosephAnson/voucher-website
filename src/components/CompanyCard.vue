<script setup lang="ts">
const props = defineProps<{
  id: number
  name: string
  description: string
  logo: string
  url: string
  codes: { id: number }[]
}>()

const codeCount = computed(() => props.codes.length)
</script>

<template>
  <li class="overflow-hidden rounded-xl border border-gray-200 bg-white">
    <NuxtLink
      :to="`/companies/${props.id}`"
      class="flex flex-col h-full"
    >
      <div class="flex flex-grow-1 justify-between gap-x-4 bg-gray-50 p-4">
        <div>
          <Heading>{{ props.name }}</Heading>
          <p class="line-clamp-3">
            {{ props.description }}
          </p>
        </div>
        <nuxt-img
          width="54"
          height="54"
          :src="props.logo"
          :alt="props.name"
          class="h-12 w-12 flex-none rounded-lg bg-white object-contain p-1 ring-1 ring-gray-900/10"
        />
      </div>
      <div class="p-4 flex gap-x-4 justify-between">
        <div class="flex gap-x-4">
          <Button
            theme="transparent"
            :rounded="false"
            :class="{
              'border-primary': codeCount > 0,
            }"
          >
            {{ codeCount === 1 ? `${codeCount} Code` : `${codeCount} Codes` }}
          </Button>

          <Button
            theme="transparent"
            :rounded="false"
          >
            100 Views a day
          </Button>
        </div>
        <Button>Show Codes</Button>
      </div>
    </NuxtLink>
  </li>
</template>
