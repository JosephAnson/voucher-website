<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { UserCircleIcon } from '@heroicons/vue/24/solid'

const userStore = useUserStore()

const user = await useSupabaseUser()

const loggedIn = computed(() => userStore.user.email && user.value)

const userNavigation = [
  { name: 'Your Profile', to: '/account' },
  { name: 'Manage Codes', to: '/managecodes' },
]
</script>

<template>
  <!-- When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars -->
  <Popover
    v-slot="{ open }"
    as="template"
  >
    <header
      class="bg-white shadow-sm lg:static lg:overflow-y-visible"
      :class="[open ? 'fixed inset-0 z-40 overflow-y-auto' : '']"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
          <div class="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
            <div class="flex flex-shrink-0 items-center">
              <nuxt-link to="/">
                <img
                  class="block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                >
              </nuxt-link>
            </div>
          </div>
          <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <div class="flex items-center px-6 py-4 xl:px-0">
              <MainSearch />
            </div>
          </div>
          <div class="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
            <!-- Mobile menu button -->
            <PopoverButton class="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
            </PopoverButton>
          </div>
          <div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
            <!-- Profile dropdown -->
            <Menu
              v-if="loggedIn"
              as="div"
              class="relative ml-5 flex-shrink-0"
            >
              <div>
                <MenuButton class="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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

            <NuxtLink
              v-if="!loggedIn"
              to="/login"
              class="ml-6"
            >
              <Button theme="transparent">
                Login
              </Button>
            </NuxtLink>

            <NuxtLink
              to="/note/create"
              class="ml-6"
            >
              <Button>
                New Code
              </Button>
            </NuxtLink>
          </div>
        </div>
      </div>

      <PopoverPanel
        as="nav"
        class="lg:hidden"
        aria-label="Global"
      >
        <div class="border-t border-gray-200 pb-3 pt-4">
          <div class="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
            <div class="flex-shrink-0">
              <img
                v-if="userStore.user.avatar_url"
                class="h-10 w-10 rounded-full"
                :src="userStore.user.avatar_url"
                alt=""
              >
              <UserCircleIcon
                v-else
                class="h-10 w-10 rounded-full"
                aria-hidden="true"
              />
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
          <div class="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
            <NuxtLink
              v-for="item in userNavigation"
              :key="item.name"
              :to="item.to"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              {{ item.name }}
            </NuxtLink>
            <a
              href="#"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              @click.prevent="userStore.signOut"
            >
              Sign out
            </a>
          </div>
        </div>
      </PopoverPanel>
    </header>
  </Popover>
</template>
