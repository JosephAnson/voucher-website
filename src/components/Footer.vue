<script setup>
const navigation = {
  main: [
    { name: 'Terms of use', to: '#' },
    { name: 'Privacy Policy', to: '#' },
    { name: 'Legal', to: '#' },
  ],
}
</script>

<template>
  <footer class="bg-white pb-10 sm:pb-10">
    <Section>
      <Container>
        <div class="sm:flex justify-between">
          <nav
            class="sm:flex sm:justify-center sm:space-x-12"
            aria-label="Footer"
          >
            <div
              v-for="item in navigation.main"
              :key="item.name"
              class="pb-6"
            >
              <NuxtLink
                :to="item.to"
                class="text-sm leading-6 text-gray-600 hover:text-gray-900"
              >
                {{ item.name }}
              </NuxtLink>
            </div>
          </nav>
          <p class="text-center text-xs leading-5 text-gray-500">
            &copy; 2020 VouchersDiscountsCodes. All rights reserved.
          </p>
        </div>
      </Container>
    </Section>
  </footer>
</template>
