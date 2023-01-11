<script setup>
definePageMeta({ middleware: ['auth'] })
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col">
      <Head>
        <Title>Home</Title>
      </Head>

      <h1 class="text-3xl text-primary">
        Hello, world
      </h1>
    </div>
  </NuxtLayout>
</template>
