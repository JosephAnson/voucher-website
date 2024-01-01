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
  <div class="overflow-hidden border border-gray-200 rounded-xl bg-white p-4">
    <div class="mb-2 flex flex-grow-1 flex-col justify-between gap-x-4 md:flex-row">
      <Heading
        :margin-bottom="false"
        bold
        styled="h3"
      >
        {{ props.title }}
      </Heading>
      <div class="mt-2 flex-shrink-0 md:mt-0">
        <div class="mb-0 mb-1 mt-1 flex items-center">
          <img
            :src="props.avatarSrc"
            :alt="`${props.username}.`"
            class="h-6 w-6 rounded-full md:order-2"
          >
          <h4 class="text-bold mb-0 ml-2 flex-shrink-0 text-xs color-primary md:ml-0 md:mr-2">
            {{ props.username }}
          </h4>
        </div>
      </div>
    </div>

    <div class="mb-4 text-xs">
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

      <div class="flex flex-shrink-0 justify-end space-x-2">
        <Button
          v-if="!props.edit && props.revealed"
          class="flex-shrink-0"
          @click.prevent="copyCode"
        >
          Copy Code
        </Button>

        <Button
          v-if="!props.edit && !props.revealed"
          class="w-full flex-shrink-0 text-center"
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
</template>
