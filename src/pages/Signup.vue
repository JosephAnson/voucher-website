<script setup lang="ts">
const userStore = useUserStore()

const username = ref('')
const email = ref('')
const password = ref('')
const repeatPassword = ref('')
</script>

<template>
  <div class="min-h-full flex flex-col justify-center bg-gray-100 py-12 lg:px-8 sm:px-6">
    <div class="sm:mx-auto sm:max-w-md sm:w-full">
      <Heading
        h1
        class="text-center"
      >
        Create an account
      </Heading>
    </div>

    <div class="mt-8 sm:mx-auto sm:max-w-md sm:w-full">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          class="space-y-6"
          action="#"
          method="POST"
          @submit.prevent="userStore.signUpWithEmail({ email, username, password })"
        >
          <Field
            label="Username"
            stacked
          >
            <Input
              id="username"
              v-model="username"
              name="username"
              autocomplete="username"
              required=""
            />
          </Field>

          <Field
            label="Email address"
            stacked
          >
            <Input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required=""
            />
          </Field>

          <Field
            label="Password"
            stacked
          >
            <Input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="password"
              required=""
            />
          </Field>

          <Field
            label="Repeat Password"
            stacked
          >
            <Input
              id="repeat-password"
              v-model="repeatPassword"
              name="repeat-password"
              type="password"
              autocomplete="repeat-password"
              required=""
            />
          </Field>

          <Button
            type="submit"
            class="w-full flex justify-center rounded-md bg-primary-600 px-3 py-2 text-sm text-white font-semibold shadow-sm hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-primary-600 focus-visible:outline-offset-2 focus-visible:outline"
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>
