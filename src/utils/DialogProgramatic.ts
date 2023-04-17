import { createApp } from 'vue'
import { Dialog } from '#components'

interface DialogProps {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  onCancel?: () => void
  onConfirm?: () => void
}

export function openDialog(params: (DialogProps & Record<string, any>) | string): any {
  if (typeof params === 'string') {
    params = {
      message: params,
    }
  }

  const component = createApp(Dialog, params)

  if (process.client)
    component.mount(document.createElement('div'))
}
