<script setup lang="ts">
import { hideVoucherCode } from '~/utils/hideVoucherCode'

const props = defineProps<{
  id: number
  title: string
  description: string
  username: string
  avatarSrc: string
  code: string
  edit: boolean
  revealed: boolean
}>()

defineEmits(['delete'])

const revealCode = computed(() => props.revealed ? props.code : hideVoucherCode(props.code))
</script>

<template>
  <li class="overflow-hidden rounded-xl border border-gray-200">
    <div class="flex flex-grow-1 justify-between gap-x-4 bg-gray-50 p-4">
      <div class="flex items-center">
        <img
          :src="props.avatarSrc"
          :alt="`${props.username}.`"
          class="h-12 w-12 rounded-full"
        >
        <div class="ml-4">
          <h4 class="text-sm font-bold text-gray-900">
            {{ props.username }}
          </h4>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <Input
          disabled
          :model-value="revealCode"
        />

        <NuxtLink
          v-if="!props.edit"
          class="flex-shrink-0"
          :to="`/vouchercode/${props.id}`"
        >
          <Button>
            Reveal Code
          </Button>
        </NuxtLink>

        <NuxtLink
          v-if="props.edit"
          class="flex-shrink-0"
          :to="`/vouchercode/edit/${props.id}`"
        >
          <Button>
            Edit Code
          </Button>
        </NuxtLink>

        <a
          v-if="props.edit"
          href="#"
          class="flex-shrink-0"
          @click.prevent="$emit('delete', props.id)"
        >
          <Button theme="danger">
            Delete
          </Button>
        </a>
      </div>
    </div>

    <div class="p-4 flex gap-x-4 justify-between">
      <div>
        <Heading>{{ props.title }}</Heading>
        <p class="line-clamp-3">
          {{ props.description }}
        </p>
      </div>
    </div>
  </li>
</template>
