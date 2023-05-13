<script setup lang="ts">
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/vue/24/outline'
import HomeCompanies from '~/components/HomeCompanies.vue'

const { data: categories } = await useFetch('/api/categories')

const features = [
  {
    name: 'Push to deploy',
    description:
            'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates',
    description:
            'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
    icon: LockClosedIcon,
  },
  {
    name: 'Simple queues',
    description:
            'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced security',
    description:
            'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: FingerPrintIcon,
  },
]
</script>

<template>
  <Section>
    <Container>
      <Heading h1>
        Save money with our vouchers, discounts and codes
      </Heading>
      <Heading
        h3
        primary
        styled="h4"
      >
        Categories
      </Heading>
      <div class="flex flex-wrap justify-center space-x-2 mt-2 ">
        <ul class="grid grid-cols-6 gap-4 w-full">
          <li
            v-for="category in categories"
            :key="category.id"
          >
            <Card
              :title="
                category.category"
              :image-src="`https://source.unsplash.com/random/200x200/?${category.category}`"
              :image-width="195"
              image-classes="object-cover aspect-3/2"
            />
          </li>
        </ul>
      </div>
    </Container>
  </Section>

  <Section :padding-top="false">
    <Container>
      <Heading
        h3
        primary
        styled="h4"
      >
        Best Offers
      </Heading>
      <HomeCompanies />
    </Container>
  </Section>

  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <Heading h3>
          made easy and simple
        </Heading>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Share your voucher codes
        </p>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          <div
            v-for="feature in features"
            :key="feature.name"
            class="relative pl-16"
          >
            <dt class="text-base font-semibold leading-7 text-gray-900">
              <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                <component
                  :is="feature.icon"
                  class="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              {{ feature.name }}
            </dt>
            <dd class="mt-2 text-base leading-7 text-gray-600">
              {{ feature.description }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
