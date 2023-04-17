export function useSupabaseUpload(
  { path, bucket, accept = 'image/png, image/jpeg' }: { path: string; bucket: string; accept?: string },
) {
  const { files, open, reset, onChange } = useFileDialog(
    { accept, multiple: false },
  )

  const client = useSupabaseClient()

  const { on: onUpload, trigger } = createEventHook<string>()

  onChange(async (fileList) => {
    if (fileList) {
      const file = fileList[0]

      if (file) {
        const { data, error } = await client
          .storage
          .from(bucket)
          .upload(path, file, {
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
            await trigger(`https://vdzjsjlcezebwpavsjif.supabase.co/storage/v1/object/public/avatars/${data.path}?name=${file.name}`)
        }
      }
    }
  })

  return { open, reset, files, onUpload }
}
