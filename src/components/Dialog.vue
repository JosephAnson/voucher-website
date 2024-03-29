<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const props = withDefaults(defineProps<{
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  onCancel?: () => void
  onConfirm?: () => void
}>(), {
  title: 'Delete Code?',
  message: 'Are you sure you want to do this? This will be permanent, this action cannot be undone.',
  cancelText: 'Cancel',
  confirmText: 'Confirm',
})

const emit = defineEmits(['cancel', 'close'])

const open = ref(true)

function onCancelClick() {
  emit('cancel')
  open.value = false

  if (props.onCancel)
    props.onCancel()
}

function onConfirmClick() {
  emit('close')
  open.value = false

  if (props.onConfirm)
    props.onConfirm()
}
</script>

<template>
  <teleport to="body">
    <TransitionRoot
      as="template"
      :show="open"
    >
      <Dialog
        as="div"
        class="relative z-10"
        @close="open = false"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="min-h-full flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto h-12 w-12 flex flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      class="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-base text-gray-900 font-semibold leading-6"
                    >
                      {{ props.title }}
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        {{ props.message }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    class="w-full inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm text-white font-semibold shadow-sm sm:ml-3 sm:w-auto hover:bg-red-500"
                    @click="onConfirmClick"
                  >
                    {{ props.confirmText }}
                  </button>
                  <button
                    type="button"
                    class="mt-3 w-full inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm text-gray-900 font-semibold shadow-sm ring-1 ring-gray-300 ring-inset sm:mt-0 sm:w-auto hover:bg-gray-50"
                    @click="onCancelClick"
                  >
                    {{ props.cancelText }}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </teleport>
</template>
