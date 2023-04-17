<script lang="ts" setup>
const route = useRoute()
</script>

<template>
  <Section>
    <Container>
      <div>
        We're adding things

        {{ route.query.name }}
      </div>
    </Container>
  </Section>
</template>
