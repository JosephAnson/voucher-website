<script setup lang="ts" generic="T">
const props = defineProps<{
  items: T[]
  searchKey: keyof T
  pick: string
  labels: Record<string, string>
}>()

const pickedKeys = computed<string[]>(() => props.pick.split(',').map(key => key.trim()) || [])
const columns = computed<typeof T[]>(() => Object.keys(props.items[0]).filter(key => pickedKeys.value.includes(key)))

const search = ref('')

const searchedResult = computed(() => props.items.filter((item) => {
  return item[props.searchKey].toLowerCase().includes(search.value.toLowerCase())
}))

function setValue(item: T, key: keyof T, value: any) {
  item[key] = value
}
</script>

<template>
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <slot />
    </div>

    <div>
      <Input
        v-model="search"
        type="text"
        placeholder="Search"
        class="w-full sm:w-64"
      />
    </div>
  </div>
  <div class="mt-8 flow-root max-h-[calc(100vh-400px)] min-h-64 overflow-y-auto shadow">
    <div class="-my-2">
      <div class="inline-block min-w-full py-2 align-middle">
        <table class="min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th
                v-for="key in columns"
                :key="key"
                scope="col"
                class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 font-semibold backdrop-blur backdrop-filter lg:pl-8 sm:pl-6"
              >
                {{ props?.labels?.[key] || key }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in searchedResult"
              :key="item.id"
              class="transition hover:bg-gray-100"
              :class="[index % 2 === 0 ? 'bg-gray-50' : '']"
            >
              <td
                v-for="key in columns"
                :key="key"
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 font-medium lg:pl-8 sm:pl-6"
              >
                <template v-if="!$slots[key]">
                  {{ item[key] }}
                </template>
                <slot
                  v-else
                  :key="key"
                  :name="key"
                  :item="item"
                  :value="item[key]"
                  :set-value="(value) => setValue(item, key, value)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
