<script setup lang="ts">
const userStore = useUserStore()
const email = ref('')
const password = ref('')
</script>

<template>
  <Section>
    <Heading
      h1
      class="text-center !mb-2"
    >
      Sign in to your account
    </Heading>

    <p class="mt-2 text-center text-sm text-gray-600">
      Or
      {{ ' ' }}
      <NuxtLink
        to="/signup"
        class="text-primary-600 font-medium hover:text-primary-500"
      >
        Sign up
      </NuxtLink>
    </p>

    <div class="mt-8 sm:mx-auto sm:max-w-md sm:w-full">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          class="space-y-6"
          action="#"
          method="POST"
          @submit.prevent="userStore.signInWithEmail({ email, password })"
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

          <Field
            label="Password"
            stacked
            label-for="password"
          >
            <template #label>
              <div class="mb-2 flex justify-between">
                <label
                  for="password"
                  class="label mr-4 inline-block text-sm text-gray-900 font-medium leading-6"
                >
                  Password
                </label>
                <NuxtLink to="/forgotpassword">
                  <TextLink class="text-xs">
                    Forgot your password?
                  </TextLink>
                </NuxtLink>
              </div>
            </template>
            <Input
              v-model="password"
              type="password"
              autocomplete="current-password"
              required=""
            />
          </Field>
          <!--
                      <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                          >
                          <label
                            for="remember-me"
                            class="ml-2 block text-sm text-gray-900"
                          >Remember me</label>
                        </div>

                      </div>
            -->
          <div>
            <Button
              type="submit"
              class="w-full justify-center rounded-md px-3 py-2"
            >
              Sign in
            </Button>
          </div>
        </form>

        <div class="mt-4 text-center">
          <NuxtLink
            to="/magiclink"
          >
            <TextLink class="text-sm">
              Sign in with magic link
            </TextLink>
          </NuxtLink>
        </div>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div class="grid grid-cols-3 mt-6 gap-3">
            <div>
              <a
                href="#"
                class="w-full inline-flex justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:outline-offset-0"
                @click.prevent="userStore.signInWithSocial({ provider: 'google' })"
              >
                <span class="sr-only">Sign in with Google</span>
                <div class="i-carbon-logo-google" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>
