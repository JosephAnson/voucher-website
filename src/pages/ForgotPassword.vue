<script setup lang="ts">
const userStore = useUserStore()
const email = ref('')
const reset = ref(false)

async function resetPassword() {
  const { error } = await userStore.forgotPassword({ email: email.value })
  if (!error)
    reset.value = true
}
</script>

<template>
  <Section class="bg-gray-100">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <Heading
        h1
        class="text-center"
      >
        Forgot Password
      </Heading>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          v-if="!reset"
          action="#"
          method="POST"
          @submit.prevent="resetPassword"
        >
          <Field
            label="Email address"
            stacked
            label-for="email"
          >
            <Input
              v-model="email"
              type="email"
              autocomplete="email"
              required=""
            />
          </Field>

          <div>
            <Button
              type="submit"
              class="w-full justify-center rounded-md px-3 py-2"
            >
              Reset Password
            </Button>
          </div>
        </form>
        <div
          v-else
          class="prose text-center"
        >
          <p>If you've had an account with this email, you'll be sent an email to reset your password!</p>
        </div>
      </div>
    </div>
  </Section>
</template>
