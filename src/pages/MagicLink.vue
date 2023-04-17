<script setup lang="ts">
const userStore = useUserStore()
const email = ref('')
const password = ref('')
</script>

<template>
  <Section class="bg-gray-100">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <Heading
        h1
        class="text-center"
      >
        Sign in to your account
      </Heading>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          class="space-y-6"
          action="#"
          method="POST"
          @submit.prevent="userStore.signInWithOtp({ email, password })"
        >
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

          <div>
            <Button
              type="submit"
              class="w-full justify-center rounded-md px-3 py-2"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  </Section>
</template>
