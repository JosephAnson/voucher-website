<script setup lang="ts">
const navigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Pricing', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
    { name: 'API Status', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  legal: [
    { name: 'Claim', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',

    },
    {
      name: 'Instagram',
      href: '#',

    },
    {
      name: 'Twitter',
      href: '#',

    },
    {
      name: 'GitHub',
      href: '#',

    },
    {
      name: 'YouTube',
      href: '#',

    },
  ],
}
</script>

<template>
  <footer
    class="bg-gray-900"
    aria-labelledby="footer-heading"
  >
    <h2
      id="footer-heading"
      class="sr-only"
    >
      Footer
    </h2>
    <Container class="px-6 pb-8 pt-20 sm:pt-24 lg:pt-32">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="grid grid-cols-2 gap-8 xl:col-span-2">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold leading-6 text-white">
                Solutions
              </h3>
              <ul
                role="list"
                class="mt-6 space-y-4"
              >
                <li
                  v-for="item in navigation.solutions"
                  :key="item.name"
                >
                  <a
                    :href="item.href"
                    class="text-sm leading-6 text-gray-300 hover:text-white"
                  >{{ item.name }}</a>
                </li>
              </ul>
            </div>
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6 text-white">
                Support
              </h3>
              <ul
                role="list"
                class="mt-6 space-y-4"
              >
                <li
                  v-for="item in navigation.support"
                  :key="item.name"
                >
                  <a
                    :href="item.href"
                    class="text-sm leading-6 text-gray-300 hover:text-white"
                  >{{ item.name }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold leading-6 text-white">
                Company
              </h3>
              <ul
                role="list"
                class="mt-6 space-y-4"
              >
                <li
                  v-for="item in navigation.company"
                  :key="item.name"
                >
                  <a
                    :href="item.href"
                    class="text-sm leading-6 text-gray-300 hover:text-white"
                  >{{ item.name }}</a>
                </li>
              </ul>
            </div>
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6 text-white">
                Legal
              </h3>
              <ul
                role="list"
                class="mt-6 space-y-4"
              >
                <li
                  v-for="item in navigation.legal"
                  :key="item.name"
                >
                  <a
                    :href="item.href"
                    class="text-sm leading-6 text-gray-300 hover:text-white"
                  >{{ item.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-10 xl:mt-0">
          <h3 class="text-sm font-semibold leading-6 text-white">
            Subscribe to our newsletter
          </h3>
          <p class="mt-2 text-sm leading-6 text-gray-300">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form class="mt-6 sm:flex sm:max-w-md">
            <label
              for="email-address"
              class="sr-only"
            >Email address</label>
            <input
              id="email-address"
              type="email"
              name="email-address"
              autocomplete="email"
              required
              class="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
              placeholder="Enter your email"
            >
            <div class="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                class="flex w-full items-center justify-center rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="mt-16 border-t border-white/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
        <div class="flex space-x-6 md:order-2">
          <a
            v-for="item in navigation.social"
            :key="item.name"
            :href="item.href"
            class="text-gray-500 hover:text-gray-400"
          >
            <span>{{ item.name }}</span>
          </a>
        </div>
        <p class="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
          &copy; 2020 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </Container>
  </footer>
</template>
