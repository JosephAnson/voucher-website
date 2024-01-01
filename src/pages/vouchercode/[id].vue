<script setup lang="ts">
const route = useRoute<'code-id'>()

const { data: code } = await useFetch(`/api/code/${route.params.id}`)
</script>

<template>
  <div>
    <Container class="py-16 lg:flex lg:gap-x-8 sm:py-24">
      <div class="flex flex-grow-1 flex-col space-y-4">
        <CodeCard
          :id="code.id"
          :key="code.id"
          :description="code.description"
          :title="code.title"
          :username="code.author.username"
          :avatar-src="code.author.avatar_url"
          :code="code.code"
          revealed
        />
      </div>
    </Container>
  </div>
</template>
