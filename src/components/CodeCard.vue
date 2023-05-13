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
  <li class="overflow-hidden rounded-xl border border-gray-200 bg-white">
    <div class="flex flex-wrap flex-grow-1 justify-between gap-x-4 bg-gray-50 p-4">
      <div class="flex items-center mb-2 mb-0">
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
      <div class="md:flex items-center md:space-x-2 space-y-2 md:space-y-0">
        <Input
          readonly
          :model-value="revealCode"
          class="min-w-48"
          @click="copyCode"
        />

        <div class="md:flex space-x-2 flex-shrink-0">
          <Button
            v-if="!props.edit && props.revealed"
            class="flex-shrink-0"
            @click.prevent="copyCode"
          >
            Copy Code
          </Button>

          <Button
            v-if="!props.edit && !props.revealed"
            class="flex-shrink-0"
            :to="`/vouchercode/${props.id}`"
          >
            Reveal Code
          </Button>

          <Button
            v-if="props.edit"
            class="flex-shrink-0"
            :to="`/vouchercode/edit/${props.id}`"
          >
            Edit Code
          </Button>

          <Button
            v-if="props.edit"
            theme="danger"
            class="flex-shrink-0"
            @click.prevent="$emit('delete', props.id)"
          >
            Delete
          </Button>
        </div>
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
