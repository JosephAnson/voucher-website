<script lang="ts" setup>
import { XMarkIcon } from '@heroicons/vue/20/solid'

const props = withDefaults(defineProps<{
  title?: string | string[]
  message?: string | string[]
  duration?: number
  status?: 'success' | 'danger'
}>(), {
  duration: 3500,
  status: 'success',
})

const emit = defineEmits(['close'])

const isActive = ref(true)
const timer = ref<any>(null)

function close(): void {
  if (timer.value)
    clearTimeout(timer.value)

  isActive.value = false
  emit('close')
}

function showNotice(): void {
  isActive.value = true

  timer.value = setTimeout(() => {
    close()
  }, props.duration)
}

onMounted(() => showNotice())
</script>

<template>
  <teleport to="body">
    <div
      aria-live="assertive"
      class="pointer-events-none fixed inset-0 z-200 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div class="w-full flex flex-col items-center sm:items-end space-y-4">
        <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
        <transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="isActive"
            class="pointer-events-auto max-w-sm w-full overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div class="p-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div
                    v-if="props.status === 'success'"
                    class="i-carbon-checkmark-outline h-6 w-6 text-green-400"
                  />
                  <div
                    v-if="props.status === 'danger'"
                    class="i-carbon-warning h-6 w-6 text-red-400"
                  />
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p
                    v-if="props.title"
                    class="text-sm text-gray-900 font-medium"
                  >
                    {{ props.title }}
                  </p>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ props.message }}
                  </p>
                </div>
                <div class="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    @click="isActive = false"
                  >
                    <span class="sr-only">Close</span>
                    <XMarkIcon
                      class="h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>
