<script setup lang="ts">
const props = defineProps<{
  total: number
  page: number | string
  pageSize: number
}>()

const emits = defineEmits<{
  'change': number
}>()

const total = computed(() => props.total)
const pageSize = computed(() => props.pageSize)

const {
  currentPage,
  isFirstPage,
  isLastPage,
  pageCount,
  prev,
  next,
} = useOffsetPagination({
  total,
  page: Number(props.page),
  pageSize,
  onPageChange: ({ currentPage }) => emits('change', currentPage),
})

const twoPreviousPagesFromCurrentPage = computed(() => {
  const pages = []
  for (let i = currentPage.value - 2; i <= currentPage.value - 1; i++) {
    if (i >= 1)
      pages.push(i)
  }
  return pages
})

const twoNextPagesFromCurrentPage = computed(() => {
  const pages = []
  for (let i = currentPage.value + 1; i <= currentPage.value + 2; i++) {
    if (i <= pageCount.value)
      pages.push(i)
  }
  return pages
})
</script>

<template>
  <nav
    v-if="!isFirstPage || !isLastPage"
    class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
  >
    <div class="-mt-px flex w-0 flex-1">
      <a
        v-if="!isFirstPage"
        class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        @click="currentPage = 1"
      >
        <div
          class="i-carbon-arrow-left mr-3 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        First
      </a>
      <a
        v-if="!isFirstPage"
        class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        @click="prev"
      >
        <div
          class="i-carbon-chevron-left mr-3 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        Previous
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <span
        v-if="currentPage > 3"
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
      >...</span>

      <a
        v-for="pageItem in twoPreviousPagesFromCurrentPage"
        :key="pageItem"
        :class="{
          'border-primary-500 text-primary-600': pageItem === currentPage,
          'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': pageItem !== currentPage,
        }"
        href="#"
        class="inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium"
        @click="currentPage = pageItem"
      >{{ pageItem }}</a>
      <a class="inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium border-primary-500 text-primary-600">{{ currentPage }}</a>
      <a
        v-for="pageItem in twoNextPagesFromCurrentPage"
        :key="pageItem"
        :class="{
          'border-primary-500 text-primary-600': pageItem === currentPage,
          'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': pageItem !== currentPage,
        }"
        href="#"
        class="inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium"
        @click="currentPage = pageItem"
      >{{ pageItem }}</a>
      <span
        v-if="!isLastPage"
        class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
      >...</span>
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <a
        v-if="!isLastPage"
        class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        @click="next"
      >
        Next
        <div
          class="i-carbon-chevron-right ml-3 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </a>
      <a
        v-if="!isLastPage"
        class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        @click="currentPage = pageCount"
      >
        Last
        <div
          class="i-carbon-arrow-right ml-3 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </a>
    </div>
  </nav>
</template>
