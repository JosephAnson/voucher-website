<script setup lang="ts">
import { UserCircleIcon } from '@heroicons/vue/24/solid'

const userStore = useUserStore()
</script>

<template>
  <div>
    <img
      v-if="userStore.user.avatar_url"
      class="h-8 w-8 rounded-full"
      :src="userStore.user.avatar_url"
      alt=""
    >
    <UserCircleIcon
      v-else
      class="h-8 w-8 rounded-full"
      aria-hidden="true"
    />
  </div>
</template>
