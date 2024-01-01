<template>
  <div class="grid grid-rows-[1fr,auto,1fr] grid-cols-1 min-h-full bg-white lg:grid-cols-[max(50%,36rem),1fr]">
    <main class="mx-auto max-w-7xl w-full px-6 py-24 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8 sm:py-32">
      <div class="max-w-lg">
        <p class="text-base text-primary-600 font-semibold leading-8">
          404
        </p>
        <h1 class="mt-4 text-3xl text-gray-900 font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p class="mt-6 text-base text-gray-600 leading-7">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div class="mt-10">
          <NuxtLink
            href="/"
            class="text-sm text-primary-600 font-semibold leading-7"
          >
            <span aria-hidden="true">&larr;</span> Back to home
          </NuxtLink>
        </div>
      </div>
    </main>
    <div class="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
      <img
        src="https://images.unsplash.com/photo-1470847355775-e0e3c35a9a2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
      >
    </div>
  </div>
</template>
