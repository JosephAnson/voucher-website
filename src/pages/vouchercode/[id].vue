<script setup lang="ts">
const route = useRoute<'code-id'>()

const { data: code } = await useFetch(`/api/code/${route.params.id}`)
</script>

<template>
  <div>
    <Container class="py-16 sm:py-24 lg:flex lg:gap-x-8">
      <div class="flex flex-col space-y-4 flex-grow-1">
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
