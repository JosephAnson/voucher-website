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
          @delete="deleteVoucherCode"
        />
      </div>
      <div v-else>
        <Heading h3>
          You've added no vouchers
        </Heading>
        <NuxtLink
          to="/vouchercode/submit"
          class="text-blue-500 hover:underline"
        >
          <Button>Click here to add some</Button>
        </NuxtLink>
      </div>
    </Container>
  </Section>
</template>
