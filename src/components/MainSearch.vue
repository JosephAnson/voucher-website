<script setup lang="ts">
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'

const { data } = useFetch('/api/companies')
const companies = computed(() => data.value?.items)

const router = useRouter()
const search = ref('')
const selectedCompany = ref<string | null>(null)

function searchCompanies(searchText: string | undefined) {
  router.push(searchText ? `/companies?search=${searchText}` : '/companies')
  search.value = ''
}

const input = ref<HTMLInputElement>(null)
const { meta, k } = useMagicKeys()

const { focused } = useFocus(input, { initialValue: true })

const filteredCompanies = computed(() =>
  search.value === ''
    ? companies
    : companies.value.filter((company) => {
      return company.name.toLowerCase().includes(search.value.toLowerCase())
    }),
)

watchEffect(() => {
  if (meta.value && k.value)
    focused.value = true
})

watch(selectedCompany, () => {
  if (selectedCompany.value) {
    if (companies.value.find(company => company.id === selectedCompany.value.id))
      router.push(`/companies/${selectedCompany.value.id}`)
    else if (companies.value.find(company => company.url === selectedCompany.value))
      router.push(`/companies/${selectedCompany.value}`)
    else
      searchCompanies(search.value)

    search.value = ''
    selectedCompany.value = ''
  }
})
</script>

<template>
  <form
    class="w-full"
    @submit.prevent="searchCompanies(search)"
  >
    <div class="relative">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <div
          class="h-5 w-5 text-gray-400 i-carbon-search z-2"
          aria-hidden="true"
        />
      </div>
      <div class="flex items-center space-x-2">
        <div class="relative  flex items-center w-full">
          <Combobox
            v-model="selectedCompany"
            as="div"
            class="w-full"
          >
            <ComboboxLabel
              class="sr-only"
            >
              Search
            </ComboboxLabel>
            <div class="relative">
              <ComboboxInput
                ref="input"
                aria-autocomplete="none"
                class="w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-1.5 md:pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                :display-value="(person) => person?.name"
                @change="search = $event.target.value"
                @keydown.enter="searchCompanies(search)"
              />
              <ComboboxButton class="absolute inset-y-0 right-8 hidden md:flex items-center rounded-r-md px-2 focus:outline-none hidden md:flex">
                <ChevronUpDownIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </ComboboxButton>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-out"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <ComboboxOptions
                  v-if="filteredCompanies.length > 0 || search"
                  class="absolute bottom-100% md:bottom-auto z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <ComboboxOption
                    v-if="search && filteredCompanies.length <= 0"
                    v-slot="{ active }"
                  >
                    <li
                      class="relative cursor-default select-none py-2 pl-3 pr-9"
                      :class="[active ? 'bg-primary-600 text-white' : 'text-gray-900']"
                    >
                      <div class="flex items-center">
                        Searching "{{ search }}"
                      </div>
                    </li>
                  </ComboboxOption>
                  <ComboboxOption
                    v-for="company in filteredCompanies"
                    :key="company.id"
                    v-slot="{ active }"
                    :static="true"
                    :value="company"
                    as="template"
                  >
                    <li
                      class="relative cursor-default select-none py-2 pl-3 pr-9"
                      :class="[active ? 'bg-primary-600 text-white' : 'text-gray-900']"
                    >
                      <div class="flex items-center">
                        <nuxt-img
                          :src="company.logo"
                          alt=""
                          width="27"
                          height="27"
                          class="h-6 w-6 flex-shrink-0 rounded-full object-contain"
                          format="webp"
                        />

                        <span
                          class="ml-3 truncate"
                        >
                          {{ company.name }}
                        </span>
                      </div>
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>
              </transition>
            </div>
          </Combobox>
          <div class="absolute inset-y-0 right-0 py-1.5 pr-1.5 hidden md:flex">
            <kbd class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">⌘K</kbd>
          </div>
        </div>
        <Button
          size="lg"
          @click="searchCompanies(search)"
        >
          Search <span class="hidden md:inline"> Company</span>
        </Button>
      </div>
    </div>
  </form>
</template>
