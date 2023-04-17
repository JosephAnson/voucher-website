import { createApp } from 'vue'
import { Snackbar } from '#components'

interface SnackbarProps {
  title?: string | string[]
  message?: string | string[]
  duration?: number
  status?: 'success' | 'danger'
}

export function openSnackbar(params: (SnackbarProps & Record<string, any>) | string): any {
  if (typeof params === 'string') {
    params = {
      message: params,
    }
  }

  const component = createApp(Snackbar, params)

  if (process.client)
    component.mount(document.createElement('div'))
}
