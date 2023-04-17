<script setup lang="ts">
const route = useRoute<'code-id'>()
const router = useRouter()

const { data: codeData } = await useFetch(`/api/code/${route.params.id}`)

const title = ref(codeData.value.title)
const description = ref(codeData.value.description)
const code = ref(codeData.value.code)

function submit() {
  updateCode({
    id: codeData.value.id,
    title: title.value,
    description: description.value,
    code: code.value,
  })

  router.back()
}
</script>

<template>
  <Section>
    <Container>
      <Heading h1>
        Edit Code
      </Heading>
      <form @submit.prevent="submit">
        <Field
          label="Title"
          stacked
          label-for="title"
        >
          <Input v-model="title" />
        </Field>

        <Field
          label="Description"
          stacked
          label-for="description"
        >
          <Input v-model="description" />
        </Field>

        <Field
          label="Code"
          stacked
          label-for="code"
        >
          <Input v-model="code" />
        </Field>

        <div class="mt-6 flex items-center justify-end gap-x-2">
          <Button
            theme="transparent"
            type="button"
            @click="router.back()"
          >
            Cancel
          </Button>
          <Button
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </Container>
  </Section>
</template>
