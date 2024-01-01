<script setup lang="ts">
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import UserAvatar from '~/components/UserAvatar.vue'

const userStore = useUserStore()
const { userNavigation } = useUserNavigation()

const user = await useSupabaseUser()

const loggedIn = computed(() => userStore.user.email && user.value)
const open = ref(false)

const router = useRouter()

router.afterEach(() => {
  open.value = false
})
</script>

<template>
  <!-- When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars -->

  <header
    class="bg-white shadow-sm lg:static lg:overflow-y-visible"
    :class="[open ? 'fixed inset-0 z-40 overflow-y-auto' : '']"
  >
    <Container>
      <div class="relative flex justify-between lg:gap-8">
        <div class="flex lg:static md:inset-y-0 md:left-0">
          <div class="w-full flex flex-shrink-0 items-center pr-4 md:pr-0">
            <nuxt-link to="/">
              <nuxt-img
                class="block h-8 w-auto"
                src="/logo.svg"
                alt="Vouchers, Discounts, Codes"
              />
            </nuxt-link>
          </div>
        </div>
        <div class="fixed bottom-0 left-0 z-40 max-w-xl min-w-0 w-full flex-1 bg-white md:relative md:w-auto md:bg-transparent lg:px-0">
          <div class="flex items-center px-2 py-2 md:py-3 xl:px-0">
            <MainSearch />
          </div>
        </div>
        <div class="flex items-center md:inset-y-0 md:right-0 lg:hidden">
          <!-- Mobile menu button -->
          <div
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 -mx-2 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
            @click="open = !open"
          >
            <span class="sr-only">Open menu</span>
            <Bars3Icon
              v-if="!open"
              class="block h-6 w-6"
              aria-hidden="true"
            />
            <XMarkIcon
              v-else
              class="block h-6 w-6"
              aria-hidden="true"
            />
          </div>
        </div>
        <div class="hidden xl:col-span-4 lg:flex lg:items-center lg:justify-end">
          <NavProfile class="ml-5" />

          <div>
            <Button
              v-if="!loggedIn"
              theme="transparent"
              to="/login"
              class="ml-6"
            >
              Login
            </Button>
          </div>

          <div>
            <Button
              :to="loggedIn ? '/vouchercode/submit' : '/login'"
              class="ml-6"
            >
              New Code
            </Button>
          </div>
        </div>
      </div>
    </Container>

    <nav
      v-if="open"
      class="lg:hidden"
      aria-label="Global"
    >
      <div class="border-t border-gray-200 pb-3 pt-4">
        <div
          v-if="loggedIn"
          class="flex items-center px-6"
        >
          <div class="flex-shrink-0">
            <UserAvatar />
          </div>
          <div class="ml-3">
            <div class="text-base text-gray-800 font-medium">
              {{ userStore.user.username }}
            </div>
            <div class="text-sm text-gray-500 font-medium">
              {{ userStore.user.email }}
            </div>
          </div>
        </div>
        <div class="mt-3 space-y-1 sm:px-4">
          <NuxtLink
            v-if="!loggedIn"
            to="/login"
            class="block rounded-md px-6 py-2 text-base text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-900"
          >
            Login
          </NuxtLink>

          <div v-if="loggedIn">
            <NuxtLink
              v-for="item in userNavigation"
              :key="item.name"
              :to="item.to"
              class="block rounded-md px-6 py-2 text-base text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-900"
            >
              {{ item.name }}
            </NuxtLink>
            <a
              href="#"
              class="block rounded-md px-6 py-2 text-base text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-900"
              @click.prevent="userStore.signOut"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
