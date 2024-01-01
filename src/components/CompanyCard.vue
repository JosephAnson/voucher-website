<script setup lang="ts">
const props = defineProps<{
  id: number | string
  name: string
  description?: string
  logo: string
  url: string
  codes: { id: number }[]
}>()

const codeCount = computed(() => props.codes.length)
</script>

<template>
  <li
    class="overflow-hidden border rounded-xl bg-white"
  >
    <NuxtLink
      :to="`/companies/${props.id}`"
      class="h-full flex flex-col"
    >
      <div class="flex flex-grow-1 justify-between gap-x-4 p-4 pb-0">
        <div>
          <Heading
            :margin-bottom="false"
            class="mb-2"
          >
            {{ props.name }}
          </Heading>
          <p
            v-if="props.description"
            class="line-clamp-3 text-sm text-gray-500"
          >
            {{ props.description }}
          </p>
        </div>
        <nuxt-img
          width="54"
          height="54"
          :src="props.logo"
          :alt="props.name"
          class="h-12 w-12 flex-none rounded-lg bg-white object-contain p-1 ring-1 ring-gray-900/10"
          format="webp"
        />
      </div>
      <div class="flex justify-between gap-x-4 p-4">
        <div class="flex gap-x-4">
          <Button
            theme="transparent"
            :rounded="false"
            :class="{
              'bg-green-50': codeCount > 0,
            }"
          >
            {{ codeCount === 1 ? `${codeCount} Code` : `${codeCount} Codes` }}
          </Button>
        </div>
        <Button>Show Codes</Button>
      </div>
    </NuxtLink>
  </li>
</template>
