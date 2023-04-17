<script setup>
import { UserCircleIcon } from '@heroicons/vue/24/solid'

const userStore = useUserStore()

const username = ref(userStore.user.username)
const avatarUrl = ref(userStore.user.avatar_url)
</script>

<template>
  <Section>
    <Container>
      <form>
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>

            <div class="mt-10">
              <Field
                label="Email address"
                stacked
                label-for="email"
              >
                <Input
                  id="email"
                  readonly
                  :model-value="userStore.user.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                />
              </Field>

              <Field
                label="Username"
                stacked
                label-for="username"
              >
                <Input
                  id="username"
                  v-model="username"
                  type="text"
                  name="username"
                  autocomplete="username"
                  placeholder="janesmith"
                />
              </Field>

              <Field
                label="Photo"
                stacked
                label-for="photo"
              >
                <div class="flex items-center gap-x-3">
                  <img
                    v-if="avatarUrl"
                    class="h-10 w-10 rounded-full"
                    :src="avatarUrl"
                    alt=""
                  >
                  <UserCircleIcon
                    v-else
                    class="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </Field>
            </div>
          </div>

          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Notifications
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick what else you want to hear about.
            </p>

            <div class="mt-10 space-y-10">
              <fieldset>
                <legend class="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div class="mt-6 space-y-6">
                  <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      >
                    </div>
                    <div class="text-sm leading-6">
                      <label
                        for="comments"
                        class="font-medium text-gray-900"
                      >Comments</label>
                      <p class="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      >
                    </div>
                    <div class="text-sm leading-6">
                      <label
                        for="candidates"
                        class="font-medium text-gray-900"
                      >Candidates</label>
                      <p class="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      >
                    </div>
                    <div class="text-sm leading-6">
                      <label
                        for="offers"
                        class="font-medium text-gray-900"
                      >Offers</label>
                      <p class="text-gray-500">
                        Get notified when a candidate accepts or rejects an offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </Container>
  </Section>
</template>
