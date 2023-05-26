<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { UserCircleIcon } from '@heroicons/vue/24/solid'

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
  <!-- Profile dropdown -->
  <Menu
    v-if="loggedIn"
    as="div"
    class="relative flex-shrink-0"
  >
    <div>
      <MenuButton class="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
        <span class="sr-only">Open user menu</span>
        <NuxtImg
          v-if="userStore.user.avatar_url"
          class="h-8 w-8 rounded-full object-cover"
          :src="userStore.user.avatar_url"
          alt="User Avatar"
          fit="cover"
          width="36"
          quality="100"
        />
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
        <template
          v-for="item in userNavigation"
          :key="item.name"
        >
          <MenuItem
            v-if="item.visible"
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
        </template>
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
</template>
