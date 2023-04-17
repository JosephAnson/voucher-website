<script setup lang="ts">
const { data: codes } = await useFetch('/api/profile/codes', {
  headers: useRequestHeaders(['cookie']) as any,
})
</script>

<template>
  <Section>
    <Container>
      <Heading h1>
        Your voucher codes
      </Heading>

      <div class="space-y-4">
        <CodeCard
          v-for="code in codes"
          :id="code.id"
          :key="code.id"
          :description="code.description"
          :title="code.title"
          :avatar-src="code.author.avatar_url"
          :code="code.code"
          edit
        />
      </div>
    </Container>
  </Section>
</template>
