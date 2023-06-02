<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

function deleteVoucherCode(refresh, id) {
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
      <List
        title="Your voucher codes"
        api="/api/profile/codes"
        :page-limit="6"
      >
        <template #items="{ items: codes, refresh }">
          <ul class="space-y-4">
            <li
              v-for="code in codes"
              :key="code.id"
            >
              <CodeCard
                :id="code.id"
                :description="code.description"
                :title="code.title"
                :username="code.author.username"
                :avatar-src="code.author.avatar_url"
                :code="code.code"
                edit
                revealed
                @delete="deleteVoucherCode(refresh, code.id)"
              />
            </li>
          </ul>
        </template>
        <template #empty>
          <div>
            <Heading h3>
              You've added no vouchers
            </Heading>

            <Button to="/vouchercode/submit">
              Click here to add some
            </Button>
          </div>
        </template>
      </List>
    </Container>
  </Section>
</template>
