<script setup lang="ts">
import { hideVoucherCode } from '~/utils/hideVoucherCode'

const props = defineProps<{
  id: number
  title: string
  description: string
  username: string
  avatarSrc: string
  code: string
  edit?: boolean
  revealed?: boolean
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
  <li class="overflow-hidden rounded-xl border border-gray-200 bg-white p-4">
    <div class="flex flex-col md:flex-row flex-grow-1 justify-between gap-x-4 mb-2">
      <Heading
        :margin-bottom="false"
        bold
        styled="h3"
      >
        {{ props.title }}
      </Heading>
      <div class="mt-2 md:mt-0 flex-shrink-0">
        <div class="flex items-center mb-1 mb-0 mt-1">
          <img
            :src="props.avatarSrc"
            :alt="`${props.username}.`"
            class="h-6 w-6 rounded-full md:order-2"
          >
          <h4 class="ml-2 md:ml-0 md:mr-2 text-xs color-primary text-bold mb-0 flex-shrink-0">
            {{ props.username }}
          </h4>
        </div>
      </div>
    </div>

    <div class="text-xs mb-4">
      <p class="line-clamp-3">
        {{ props.description }}
      </p>
    </div>

    <div class="flex items-center space-x-2">
      <Input
        readonly
        :model-value="revealCode"
        class="min-w-48"
        :disabled="!props.revealed"
        @click="copyCode"
      />

      <div class="flex justify-end space-x-2 flex-shrink-0">
        <Button
          v-if="!props.edit && props.revealed"
          class="flex-shrink-0"
          @click.prevent="copyCode"
        >
          Copy Code
        </Button>

        <Button
          v-if="!props.edit && !props.revealed"
          class="flex-shrink-0 w-full text-center"
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
  </li>
</template>
