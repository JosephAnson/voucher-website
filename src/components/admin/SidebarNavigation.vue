<script setup lang="ts">
interface NavigationItem {
  name: string
  icon?: string
  to?: string
  initial?: string
  children?: NavigationItem[]
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', icon: 'i-carbon-dashboard', to: '/admin' },
  {
    name: 'Companies',
    children: [
      { name: 'Set featured', to: '/admin/companies/featurecompany' },
    ],
  },
  {
    name: 'Codes',
    children: [
      { name: 'Banned List', to: '/admin/codes/bannedcodes' },
    ],
  },
]
</script>

<template>
  <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
    <div class="flex h-16 shrink-0 items-center">
      <img
        class="h-8 w-auto"
        src="/logo.svg"
        alt="Your Company"
      >
    </div>
    <nav class="flex flex-1 flex-col">
      <ul
        role="list"
        class="flex flex-1 flex-col gap-y-7"
      >
        <li>
          <NuxtLink
            to="/"
            class="flex items-center gap-x-3 rounded-md text-xs leading-6 font-semibold text-gray-400 hover:text-white -mb-3"
          >
            <div
              class="i-carbon-arrow-left h-3 w-3 shrink-0"
            />
            Back to store
          </NuxtLink>
        </li>
        <template
          v-for="item in navigation"
          :key="item.name"
        >
          <li v-if="!item?.children">
            <NuxtLink
              :to="item.to"
              class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-400 hover:text-white hover:bg-gray-800"
              exact-active-class="bg-gray-800 !text-white"
            >
              <div
                v-if="item.icon"
                :class="item.icon"
                class="h-6 w-6 shrink-0"
              />
              {{ item.name }}
            </NuxtLink>
          </li>
          <li v-else>
            <div class="text-xs font-semibold leading-6 text-gray-400">
              {{ item.name }}
            </div>
            <ul
              role="list"
              class="mt-2 space-y-1"
            >
              <li
                v-for="child in item.children"
                :key="child.name"
              >
                <NuxtLink
                  :to="child.to"
                  class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-400 hover:text-white hover:bg-gray-800"
                  exact-active-class="bg-gray-800 !text-white"
                >
                  <span
                    v-if="child.initial"
                    class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
                  >
                    {{ child.initial }}
                  </span>
                  <span class="truncate">{{ child.name }}</span>
                </NuxtLink>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>
