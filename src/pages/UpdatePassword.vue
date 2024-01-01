<script setup lang="ts">
const userStore = useUserStore()
const router = useRouter()

const newPassword = ref('')
const confirmPassword = ref('')

async function updatePassword() {
  if (newPassword.value === confirmPassword.value) {
    const { error } = await userStore.updatePassword({ newPassword: newPassword.value })

    if (error) {
      openSnackbar({ title: 'Password change failed!', message: error.message, status: 'danger' })
    }
    else {
      openSnackbar('Password changed successfully!')
      await router.push('/')
    }
  }
  else {
    openSnackbar({ status: 'danger', title: 'The passwords do not match!' })
  }
}
</script>

<template>
  <Section class="bg-gray-100">
    <div class="sm:mx-auto sm:max-w-md sm:w-full">
      <Heading
        h1
        class="text-center"
      >
        Update Password
      </Heading>
    </div>

    <div class="mt-8 sm:mx-auto sm:max-w-md sm:w-full">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          action="#"
          method="POST"
          @submit.prevent="updatePassword"
        >
          <Field
            label="New password"
            stacked
            label-for="password"
          >
            <Input
              v-model="newPassword"
              type="password"
              autocomplete="password"
              required=""
            />
          </Field>

          <Field
            label="Confirm password"
            stacked
            label-for="confirm-password"
          >
            <Input
              v-model="confirmPassword"
              type="password"
              autocomplete="confirm-password"
              required=""
            />
          </Field>

          <div>
            <Button
              type="submit"
              class="w-full justify-center rounded-md px-3 py-2"
            >
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  </Section>
</template>
