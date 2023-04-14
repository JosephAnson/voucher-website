<script lang="ts" setup>
import Pagination from '~/components/Pagination.vue'

const clients = [
  {
    id: 1,
    name: 'Tuple',
    description: 'Bolt, previously known as Taxify, is the leading European transportation platform providing ride, Bolt, previously known as Taxify, is the leading European transportation platform providing ride',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
  },
  {
    id: 2,
    name: 'SavvyCal',
    description: 'lorem ipsom this is a description',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
  },
  {
    id: 3,
    name: 'Reform',
    description: 'lorem ipsom this is a description',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
  },
]
</script>

<template>
  <Section>
    <Container>
      <ul
        role="list"
        class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
      >
        <CompanyCard
          v-for="client in clients"
          :id="client.id"
          :key="client.id"
          :description="client.description"
          :name="client.name"
          :image-url="client.imageUrl"
        />
      </ul>

      <Pagination class="mt-10" />
    </Container>
  </Section>
</template>
