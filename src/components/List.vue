<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/vue/20/solid'
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { SORT_OPTIONS } from '~/types'

const props = defineProps<{
  title: string
  api: string
  pageLimit: number
  categories: { id: number | null; category: string }[]
}>()

const mobileFiltersOpen = ref(false)

const sort = useRouteQuery('sort', SORT_OPTIONS[0])
const category = useRouteQuery('category')
const page = useRouteQuery<string>('page')

const { data } = await useFetch(
  props.api,
  {
    query: {
      sort,
      category,
      limit: props.pageLimit,
      page,
    },
    watch: [sort, category, page],
  },
)
</script>

<template>
  <!-- Mobile filter dialog -->
  <TransitionRoot
    as="template"
    :show="mobileFiltersOpen"
  >
    <Dialog
      as="div"
      class="relative z-40 lg:hidden"
      @close="mobileFiltersOpen = false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="translate-x-full"
        >
          <DialogPanel class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-2 pb-12 shadow-xl">
            <div class="flex items-center justify-between px-4">
              <Heading
                h2
                :margin-bottom="false"
              >
                Filters
              </Heading>
              <button
                type="button"
                class="flex h-10 w-10 items-center justify-center rounded-md text-gray-400"
                @click="mobileFiltersOpen = false"
              >
                <span class="sr-only">Close menu</span>
                <XMarkIcon
                  class="h-6 w-6"
                  aria-hidden="true"
                />
              </button>
            </div>

            <!-- Filters -->
            <form class="mt-2 border-t border-gray-200">
              <h3 class="sr-only">
                Categories
              </h3>
              <ul
                role="list"
                class="px-2 py-1 font-medium text-gray-900"
              >
                <li
                  v-for="categoryItem in props.categories"
                  :key="categoryItem.category"
                >
                  <a
                    class="block p-2"
                    href="#"
                    @click.prevent="(category = categoryItem.id, mobileFiltersOpen = false)"
                  >
                    {{ categoryItem.category }}
                  </a>
                </li>
              </ul>
              <div class="px-4">
                <Button
                  class="w-full"
                  @click.prevent="(category = '', mobileFiltersOpen = false)"
                >
                  Clear Filters
                </Button>
              </div>
            </form>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
  <div class="flex items-baseline justify-between border-b border-gray-200 pb-2">
    <Heading
      h1
      class="!mb-0"
    >
      {{ props.title }}
    </Heading>

    <div class="flex items-center">
      <Menu
        as="div"
        class="relative inline-block text-left"
      >
        <div>
          <MenuButton class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
            Sort&nbsp;<span class="hidden md:inline">by: {{ $t(`sortOptions.${sort}`) }} </span>
            <ChevronDownIcon
              class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
          <MenuItems class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <MenuItem
                v-for="sortOption in SORT_OPTIONS"
                :key="sortOption"
                v-slot="{ active }"
              >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm"
                  :class="[sortOption === sort ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '']"
                  @click="sort = sortOption"
                >{{ $t(`sortOptions.${sortOption}`) }}</a>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>

      <button
        type="button"
        class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
        @click="mobileFiltersOpen = true"
      >
        <span class="sr-only">Filters</span>
        <FunnelIcon
          class="h-5 w-5"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>

  <section
    aria-labelledby="products-heading"
    class="pb-24 pt-6"
  >
    <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
      <!-- Filters -->
      <form class="hidden lg:block">
        <Heading
          h2
          class="sr-only"
        >
          Categories
        </Heading>
        <ul
          role="list"
          class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
        >
          <li
            v-for="categoryItem in categories"
            :key="categoryItem.category"
          >
            <a
              class="w-full flex items-center"
              href="#"
              @click.prevent="category = categoryItem.id"
            >
              {{ categoryItem.category }}
            </a>
          </li>
        </ul>
      </form>

      <!-- Product grid -->
      <div class="lg:col-span-3">
        <ul
          v-if="data?.items?.length > 0"
          class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-2 xl:gap-x-8"
        >
          <li
            v-for="item in data.items"
            :key="item.id"
          >
            <slot
              name="item"
              :item="item"
            />
          </li>
        </ul>
        <div
          v-else
          class="text-sm"
        >
          No items
        </div>

        <Pagination
          class="mt-5"
          :page="page"
          :total="data?.count || 0"
          :page-size="pageLimit"
          @change="page = $event"
        />
      </div>
    </div>
  </section>
</template>
