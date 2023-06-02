<script setup lang="ts">
definePageMeta({
  middleware: ['admin'],
  layout: 'admin',
})

const { data: companies } = await useFetch('/api/companies')

const sortedResults = useSorted(companies.value.items, (a, b) => b.featured - a.featured)

async function onChange(id: string, featured: boolean, callback) {
  callback(featured)

  const { error } = await $fetch(`/api/companies/${id}`, {
    method: 'PATCH',
    body: {
      featured,
    },
  })

  if (!error)
    openSnackbar(featured ? `${id} now featured` : `${id} no longer featured`)
}
</script>

<template>
  <TableFull
    v-if="sortedResults"
    :items="sortedResults"
    search-key="name"
    pick="id, name, featured"
    :labels="{
      id: 'ID',
      name: 'Name',
      featured: 'Featured',
    }"
  >
    <Heading
      h1
      :margin-bottom="false"
    >
      Set featured companies
    </Heading>

    <template
      #featured="{ item, value, setValue }"
    >
      <Checkbox
        :model-value="value"
        type="checkbox"
        class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
        @update:model-value="onChange(item.id, !value, setValue)"
      />
    </template>
  </TableFull>
</template>
