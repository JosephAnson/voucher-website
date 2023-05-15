<script setup lang="ts">
const { data: codes, refresh } = await useFetch('/api/profile/codes', {
  headers: useRequestHeaders(['cookie']) as any,
})

function deleteVoucherCode(id) {
  openDialog({
    onConfirm: async () => {
      await $fetch('/api/code/delete', {
        method: 'POST',
        body: { id },
      })
      await refresh()
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

      <div
        v-if="codes.length"
        class="space-y-4"
      >
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
          revealed
          @delete="deleteVoucherCode"
        />
      </div>
      <div v-else>
        <Heading h3>
          You've added no vouchers
        </Heading>

        <Button to="/vouchercode/submit">
          Click here to add some
        </Button>
      </div>
    </Container>
  </Section>
</template>
