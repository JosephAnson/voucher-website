<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import UserAvatar from '~/components/UserAvatar.vue'

const userStore = useUserStore()

const user = await useSupabaseUser()

const loggedIn = computed(() => userStore.user.email && user.value)
const open = ref(false)

const userNavigation = [
  { name: 'Your Profile', to: '/account' },
  { name: 'Manage Codes', to: '/managecodes' },
  { name: 'Add Company', to: '/companies/add' },
]

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
        <div class="flex md:inset-y-0 md:left-0 lg:static">
          <div class="flex flex-shrink-0 items-center w-full pr-4 md:pr-0">
            <nuxt-link to="/">
              <nuxt-img
                class="block h-8 w-auto"
                src="/logo.svg"
                alt="Vouchers, Discounts, Codes"
              />
            </nuxt-link>
          </div>
        </div>
        <div class="min-w-0 flex-1 lg:px-0 max-w-xl fixed z-40 md:relative bottom-0 left-0 bg-white md:bg-transparent w-full md:w-auto">
          <div class="flex items-center px-2 py-2 xl:px-0 md:py-3">
            <MainSearch />
          </div>
        </div>
        <div class="flex items-center md:inset-y-0 md:right-0 lg:hidden">
          <!-- Mobile menu button -->
          <div
            class="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
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
        <div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
          <!-- Profile dropdown -->
          <Menu
            v-if="loggedIn"
            as="div"
            class="relative ml-5 flex-shrink-0"
          >
            <div>
              <MenuButton class="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                <span class="sr-only">Open user menu</span>
                <img
                  v-if="userStore.user.avatar_url"
                  class="h-8 w-8 rounded-full"
                  :src="userStore.user.avatar_url"
                  alt=""
                >
                <UserCircleIcon
                  v-else
                  class="h-8 w-8 rounded-full"
                  aria-hidden="true"
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem
                  v-for="item in userNavigation"
                  :key="item.name"
                  v-slot="{ active }"
                >
                  <NuxtLink
                    :to="item.to"
                    class="block px-4 py-2 text-sm text-gray-700"
                    :class="[active ? 'bg-gray-100' : '']"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    :class="[active ? 'bg-gray-100' : '']"
                    @click.prevent="userStore.signOut"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>

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
            <div class="text-base font-medium text-gray-800">
              {{ userStore.user.username }}
            </div>
            <div class="text-sm font-medium text-gray-500">
              {{ userStore.user.email }}
            </div>
          </div>
        </div>
        <div class="mt-3 space-y-1 sm:px-4">
          <NuxtLink
            v-if="!loggedIn"
            to="/login"
            class="block rounded-md px-6 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            Login
          </NuxtLink>
          <div v-if="loggedIn">
            <NuxtLink
              v-for="item in userNavigation"
              :key="item.name"
              :to="item.to"
              class="block rounded-md px-6 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              {{ item.name }}
            </NuxtLink>
            <a
              href="#"
              class="block rounded-md px-6 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
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
