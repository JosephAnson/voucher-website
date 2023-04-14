<script setup>
const code = {
  id: 1,
  name: 'Tuple',
  description: 'Bolt, previously known as Taxify, is the leading European transportation platform providing ride, Bolt, previously known as Taxify, is the leading European transportation platform providing ride',
  avatarSrc: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
  author: 'Dave',
}
</script>

<template>
  <div>
    <Container class="py-16 sm:py-24 lg:flex lg:gap-x-8">
      <div class="flex flex-col space-y-4 flex-grow-1">
        <CodeCard
          :id="code.id"
          :description="code.description"
          :name="code.name"
          :avatar-src="code.avatarSrc"
        />
      </div>
    </Container>
  </div>
</template>
