<script setup>
const appName = 'Left-over'
const appDescription = 'A crowdsourced neighbourhood platform to prevent food waste'

useHead({
  meta: [{ name: 'description', content: appDescription }],
  titleTemplate: title => title ? `${title} - ${appName}` : appName,
})
</script>

<template>
  <NuxtPage />
</template>
