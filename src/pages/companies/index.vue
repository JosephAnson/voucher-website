<script lang="ts" setup>
import Pagination from '~/components/Pagination.vue'

const { data: companies } = await useFetch('/api/companies')
</script>

<template>
  <Section>
    <Container>
      <ul
        class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
      >
        <CompanyCard
          v-for="company in companies"
          :id="company.id"
          :key="company.url"
          :description="company.description"
          :name="company.name"
          :logo="company.logo"
          :url="company.url"
          :codes="company.codes"
        />
      </ul>

      <Pagination class="mt-10" />
    </Container>
  </Section>
</template>
