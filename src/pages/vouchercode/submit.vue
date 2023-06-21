<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const route = useRoute<'code-id'>()
const router = useRouter()

const { data: codeData } = await useFetch(`/api/code/${route.params.id}`)
const { data } = await useFetch('/api/companies')
const companies = computed(() => data.value?.items)

const company = ref(companies.value[0].id)
const title = ref(codeData.value.title)
const description = ref(codeData.value.description)
const code = ref(codeData.value.code)

async function submit() {
  await $fetch('/api/code/add', {
    method: 'POST',
    body: {
      id: codeData.value.id,
      title: title.value,
      description: description.value,
      code: code.value,
      company: company.value,
    },
  })

  openSnackbar('Code Saved!')

  await router.push('/managecodes')
}
</script>

<template>
  <Section>
    <Container>
      <Heading h1>
        Create Code
      </Heading>
      <form @submit.prevent="submit">
        <Field
          label="Company"
          stacked
          label-for="company"
        >
          <Select v-model="company">
            <option
              v-for="companyItem in companies"
              :key="companyItem.id"
              :value="companyItem.id"
            >
              {{ companyItem.name }}
            </option>
          </Select>
        </Field>

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
          <Input
            v-model="description"
            type="textarea"
          />
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
            Create
          </Button>
        </div>
      </form>
    </Container>
  </Section>
</template>
