<script setup lang="ts">
import { CheckIcon, StarIcon } from '@heroicons/vue/20/solid'

const route = useRoute<'companies-url'>()

const { data: company } = await useFetch(`/api/companies/${route.params.id}`)

const reviews = { average: 4, totalCount: 1624 }
</script>

<template>
  <Container class="py-16 sm:py-24 lg:flex lg:gap-x-8">
    <!-- Product details -->
    <div class="lg:max-w-md">
      <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg max-w-50">
        <nuxt-img
          width="200"
          height="200"
          :src="company.logo"
          :alt="company.name"
          class="h-full w-full object-cover object-center"
        />
      </div>
      <div class="mt-4">
        <Heading h1>
          {{ company.name }}
        </Heading>
      </div>

      <section
        aria-labelledby="information-heading"
        class="mt-4"
      >
        <h2
          id="information-heading"
          class="sr-only"
        >
          Product information
        </h2>

        <div class="flex items-center">
          <div>
            <h2 class="sr-only">
              Reviews
            </h2>
            <div class="flex items-center">
              <div>
                <div class="flex items-center">
                  <StarIcon
                    v-for="rating in [0, 1, 2, 3, 4]"
                    :key="rating"
                    class="h-5 w-5 flex-shrink-0"
                    :class="[reviews.average > rating ? 'text-yellow-400' : 'text-gray-300']"
                    aria-hidden="true"
                  />
                </div>
                <p class="sr-only">
                  {{ reviews.average }} out of 5 stars
                </p>
              </div>
              <p class="ml-2 text-sm text-gray-500">
                {{ reviews.totalCount }} reviews
              </p>
            </div>
          </div>
        </div>

        <div class="mt-4 space-y-6">
          <p class="text-base text-gray-500">
            {{ company.description }}
          </p>
        </div>

        <div class="mt-6 flex items-center">
          <CheckIcon
            class="h-5 w-5 flex-shrink-0 text-green-500"
            aria-hidden="true"
          />
          <p class="ml-2 text-sm text-gray-500">
            Codes available
          </p>
        </div>
      </section>

      <Panel
        class="mt-10"
        title="How Referrals work"
        description="Collaboratively deploy interoperable value before synergistic human capital. Rapidiously build sticky models via error-free markets. Appropriately initiate high standards in e-business after state of the."
      />
    </div>

    <div class="flex flex-col space-y-4 flex-grow-1">
      <CodeCard
        v-for="code in company.codes"
        :id="code.id"
        :key="code.id"
        :description="code.description"
        :title="code.title"
        :username="code.author.username"
        :avatar-src="code.author.avatar_url"
        :code="code.code"
      />
    </div>
  </Container>
</template>
