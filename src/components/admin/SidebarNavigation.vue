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
      { name: 'Set featured', to: '/admin/companies/featured' },
      { name: 'Set categories', to: '/admin/companies/categories' },
    ],
  },
  {
    name: 'Codes',
    children: [
      { name: 'Banned List', to: '/admin/codes/banned' },
    ],
  },
]
</script>

<template>
  <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
    <div class="h-16 flex shrink-0 items-center">
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
            class="flex items-center gap-x-3 rounded-md text-xs text-gray-400 font-semibold leading-6 -mb-3 hover:text-white"
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
              class="group flex gap-x-3 rounded-md p-2 text-sm text-gray-400 font-semibold leading-6 hover:bg-gray-800 hover:text-white"
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
            <div class="text-xs text-gray-400 font-semibold leading-6">
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
                  class="group flex gap-x-3 rounded-md p-2 text-sm text-gray-400 font-semibold leading-6 hover:bg-gray-800 hover:text-white"
                  exact-active-class="bg-gray-800 !text-white"
                >
                  <span
                    v-if="child.initial"
                    class="h-6 w-6 flex shrink-0 items-center justify-center border border-gray-700 rounded-lg bg-gray-800 text-[0.625rem] text-gray-400 font-medium group-hover:text-white"
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
