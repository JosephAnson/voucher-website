<script setup lang="ts">
definePageMeta({
  middleware: ['admin'],
  layout: 'admin',
})

const { data: companies } = await useFetch('/api/companies')
const { data: categories } = await useFetch('/api/categories')

async function addCategory(categoryId, companyId) {
  const { error } = await $fetch('/api/categories/add', {
    method: 'POST',
    body: {
      category: categoryId,
      company: companyId,
    },
  })

  if (!error)
    openSnackbar('added category from company')
}

async function deleteCategory(categoryId, companyId) {
  console.log({
    category: categoryId,
    company: companyId,
  })
  const { error } = await $fetch('/api/categories/delete', {
    method: 'DELETE',
    body: {
      category: categoryId,
      company: companyId,
    },
  })

  if (!error)
    openSnackbar('removed category from company')
}

function setCategory(categoryId, companyId, setValue, value) {
  console.log(categoryId, companyId, setValue, value)
  if (value.find(item => categoryId === item.category)) {
    deleteCategory(categoryId, companyId)
    value = value.filter(item => item.category !== categoryId)
  }
  else {
    addCategory(categoryId, companyId)
    value.push({ category: categoryId })
  }

  setValue(value)
}
</script>

<template>
  <TableFull
    v-if="companies"
    :items="companies"
    search-key="name"
    pick="id, name, company_categories"
    :labels="{
      id: 'ID',
      name: 'Name',
      company_categories: 'Categories',
    }"
  >
    <Heading
      h1
      :margin-bottom="false"
    >
      Set companies into categories
    </Heading>
    <template
      #company_categories="{ item: company, value, setValue }"
    >
      <Grouped wrap>
        <Button
          v-for="category in categories"
          :key="category.id"
          :theme="value.find(item => item.category === category.id) ? 'primary' : 'transparent'"
          @click="setCategory(category.id, company.id, setValue, value)"
        >
          {{ category.category }}
        </Button>
      </Grouped>
    </template>
  </TableFull>
</template>
