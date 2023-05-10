<script setup lang="ts">
import { string } from 'yup'

const router = useRouter()

const { meta, errors, validate } = useForm()
const { errorMessage: urlErrorMessage, value: url } = useField('url', string().required().url(), { initialValue: '' })
const { errorMessage: nameErrorMessage, value: name } = useField('name', string().required(), { initialValue: '' })
const { errorMessage: logoErrorMessage, value: logo } = useField('logo', string().required().url(), { initialValue: '' })
const hasErrors = computed(() => !!Object.values(errors.value).length)
function uploadImage(imageUrl: string) {
  logo.value = imageUrl
}

async function submit() {
  const val = await validate()

  if (!val.valid) {
    openSnackbar({ message: 'Fix the errors before submitting', status: 'danger' })
  }
  else {
    await $fetch('/api/companies/add', {
      method: 'POST',
      body: {
        url: url.value,
        name: name.value,
        logo: logo.value,
      },
      onRequestError(context) {
        openSnackbar({ message: `Error creating company${context.error.message}` })
      },
      onResponse(context) {
        if (context.response._data?.statusCode === 409) {
          openSnackbar({ message: 'Company already exists', status: 'danger' })
        }
        else {
          openSnackbar({ message: `Company created: ${name.value}` })
          router.push('/companies')
        }
      },
    })
  }
}
</script>

<template>
  <Section>
    <Container>
      <Heading h1>
        Add Company
      </Heading>
      <form @submit.prevent="submit">
        <Field
          label="Url"
          stacked
          label-for="url"
          :error="urlErrorMessage"
        >
          <Input v-model="url" />
        </Field>
        <Field
          label="Name"
          stacked
          label-for="name"
          :error="nameErrorMessage"
        >
          <Input v-model="name" />
        </Field>

        <Field
          label="Logo"
          stacked
          label-for="logo"
          :error="logoErrorMessage"
        >
          <ImageUpload
            :image="logo"
            message="max upload size is 5mb"
            bucket="logos"
            size="large"
            :on-upload="uploadImage"
          />
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
            :disabled="!meta.dirty || hasErrors"
          >
            Add Company
          </Button>
        </div>
      </form>
    </Container>
  </Section>
</template>
