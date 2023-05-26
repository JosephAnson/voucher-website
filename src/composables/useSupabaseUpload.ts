import type { Ref } from 'vue'
import type { Database } from '~/supabase.types'
import { createGuid } from '~/utils/createGuid'

interface UseSupabaseUploadOptions {
  path: Ref<string>
  bucket: string
  fileName?: string
  accept?: string
}

export function useSupabaseUpload(
  { path, bucket, fileName: _fileName, accept = 'image/png, image/jpeg' }: UseSupabaseUploadOptions,
) {
  const { files, open, reset, onChange } = useFileDialog(
    { accept, multiple: false },
  )

  const client = useSupabaseClient<Database>()

  const { on: onUpload, trigger } = createEventHook<string>()

  onChange(async (fileList) => {
    if (fileList) {
      const file = fileList[0]
      const fileName = _fileName || createGuid().replace(/-/g, '')

      if (file) {
        const { data, error } = await client
          .storage
          .from(bucket)
          .upload(`${path.value}/${fileName}`, file, {
            upsert: true,
            cacheControl: '0',
          })

        if (error) {
          // Handle error
          openSnackbar({ status: 'danger', message: error.message })
        }
        else {
          // Handle success
          if (data?.path)
            await trigger(`https://vdzjsjlcezebwpavsjif.supabase.co/storage/v1/object/public/${bucket}/${data.path}?name=${fileName}`)
        }
      }
    }
  })

  return { open, reset, files, onUpload }
}
