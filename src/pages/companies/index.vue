<script setup  lang="ts">
const { data: _categories } = await useFetch('/api/categories')

const categories = computed(() => {
  return [
    { id: null, category: 'All' },
    ..._categories.value,
  ]
})
</script>

<template>
  <Section>
    <Container>
      <main>
        <List
          title="Companies"
          api="/api/companies"
          :page-limit="4"
          :categories="categories"
        >
          <template #item="{ item }">
            <CompanyCard
              :id="item.id"
              class="h-full"
              :description="item.description"
              :name="item.name"
              :logo="item.logo"
              :url="item.url"
              :codes="item.codes"
            />
          </template>
        </List>
      </main>
    </Container>
  </Section>
</template>
