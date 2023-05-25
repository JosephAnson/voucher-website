<script setup lang="ts">
definePageMeta({
  middleware: ['admin'],
  layout: 'admin',
})

const { data: companies } = await useFetch('/api/companies')

const search = ref('')
const results = computed(() => companies.value.filter((company) => {
  return company.name.toLowerCase().includes(search.value.toLowerCase())
}))
const sortedResults = useSorted(results, (a, b) => b.featured - a.featured)

async function onChange(id: number, featured: number) {
  console.log('onChange', id, featured)
  const { error } = await $fetch(`/api/companies/${id}`, {
    method: 'PATCH',
    body: {
      featured,
    },
  })

  if (!error)
    openSnackbar(`${id} feature status updated`)
}
</script>

<template>
  <div>
    <Heading h1>
      Set featured companies
    </Heading>

    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h2 class="mt-2 text-sm text-gray-700">
          A list of all the companies.
        </h2>
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
    <div class="mt-8 flow-root min-h-64 max-h-[calc(100vh-400px)] overflow-y-auto shadow">
      <div class="-my-2">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                >
                  ID
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                >
                  Featured
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(company, personIdx) in sortedResults"
                :key="company.id"
                class="hover:bg-gray-100 transition"
                :class="[personIdx % 2 === 0 ? 'bg-gray-50' : '']"
              >
                <td
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                >
                  {{ company.id }}
                </td>
                <td
                  class="whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                >
                  {{ company.name }}
                </td>
                <td
                  class="whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                >
                  <input
                    v-model="company.featured"
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    @change="onChange(company.id, company.featured)"
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
