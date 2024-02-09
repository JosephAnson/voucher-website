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
          v-if="categories?.length"
          title="Companies"
          api="/api/companies"
          :page-limit="24"
          :categories="categories"
        >
          <template #items="{ items }">
            <ul
              class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-2 xl:gap-x-8"
            >
              <li
                v-for="item in items"
                :key="item.id"
              >
                <CompanyCard
                  :id="item.id"
                  class="h-full"
                  :description="item.description"
                  :name="item.name"
                  :logo="item.logo"
                  :url="item.url"
                  :codes="item.codes"
                />
              </li>
            </ul>
          </template>
        </List>
      </main>
    </Container>
  </Section>
</template>
