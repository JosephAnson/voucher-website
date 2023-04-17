<script setup lang="ts">
const { data: codes, refresh } = await useFetch('/api/profile/codes', {
  headers: useRequestHeaders(['cookie']) as any,
})

function deleteVoucherCode(id) {
  openDialog({
    onConfirm: () => {
      deleteCode({ id })
      refresh()
      openSnackbar('Voucher Deleted!')
    },
  })
}
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
          :username="code.author.username"
          :avatar-src="code.author.avatar_url"
          :code="code.code"
          edit
          @delete="deleteVoucherCode"
        />
      </div>
    </Container>
  </Section>
</template>
