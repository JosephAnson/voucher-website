<script setup lang="ts">
import Grouped from '~/components/Grouped.vue'

definePageMeta({
  middleware: 'auth',
})

const userStore = useUserStore()

const username = ref<string>(userStore.user.username || '')
</script>

<template>
  <Section>
    <Container>
      <Heading h1>
        Profile
      </Heading>
      <p class="mt-1 text-sm text-gray-600 leading-6">
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
            disabled
            :model-value="userStore.user.email"
            name="email"
            type="email"
            autocomplete="off"
          />
        </Field>

        <Field
          v-if="userStore.user.role && userStore.user.role !== 'user'"
          label="Role"
          stacked
          label-for="role"
        >
          <Input
            id="email"
            disabled
            autocomplete="off"
            :model-value="userStore.user.role"
          />
        </Field>

        <form @submit.prevent="userStore.updateUsername(username)">
          <Field
            label="Username"
            stacked
            label-for="account-username"
          >
            <Grouped>
              <Input
                v-model="username"
                type="text"
                autocomplete="off"
                placeholder="janesmith"
              />
              <Button
                type="submit"
              >
                Save Username
              </Button>
            </Grouped>
          </Field>
        </form>

        <Field
          label="Photo"
          stacked
          label-for="photo"
        >
          <ImageUpload
            :image="userStore.user.avatar_url"
            message="max upload size is 5mb"
            bucket="avatars"
            :path="userStore.user.id"
            file-name="avatar"
            :on-upload="userStore.updateAvatar"
          />
        </Field>
      </div>

      <!--          <div class="border-b border-gray-900/10 pb-12">
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
                        class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
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
                        class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
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
                        class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
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
          </div> -->
    </Container>
  </Section>
</template>
