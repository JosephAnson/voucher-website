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
const { copy } = useClipboard({ source: props.code })

function copyCode() {
  if (props.revealed) {
    copy()
    openSnackbar('Code Copied')
  }
}
</script>

<template>
  <li class="overflow-hidden rounded-xl border border-gray-200">
    <div class="flex flex-wrap flex-grow-1 justify-between gap-x-4 bg-gray-50 p-4">
      <div class="flex items-center">
        <img
          :src="props.avatarSrc"
          :alt="`${props.username}.`"
          class="h-12 w-12 rounded-full"
        >
        <div class="ml-4">
          <Heading
            h4
            class="!mb-0 font-bold text-gray-600"
          >
            {{ props.username }}
          </Heading>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <Input
          readonly
          :model-value="revealCode"
          class="min-w-48"
          @click="copyCode"
        />

        <a
          v-if="!props.edit && props.revealed"
          href="#"
          class="flex-shrink-0"
          @click.prevent="copyCode"
        >
          <Button>
            Copy Code
          </Button>
        </a>

        <NuxtLink
          v-if="!props.edit && !props.revealed"
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
