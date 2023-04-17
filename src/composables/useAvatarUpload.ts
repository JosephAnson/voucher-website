export function useAvatarUpload() {
  const userStore = useUserStore()

  const { open, reset, files, onUpload } = useSupabaseUpload({
    bucket: 'avatars',
    path: `${userStore.user.id}/avatar`,
  })

  return { open, reset, files, onUpload }
}
