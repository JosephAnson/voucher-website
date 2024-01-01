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
        <div class="justify-between sm:flex">
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
                class="text-sm text-gray-600 leading-6 hover:text-gray-900"
              >
                {{ item.name }}
              </NuxtLink>
            </div>
          </nav>
          <p class="text-center text-xs text-gray-500 leading-5">
            &copy; 2024 VouchersDiscountsCodes. All rights reserved.
          </p>
        </div>
      </Container>
    </Section>
  </footer>
</template>
