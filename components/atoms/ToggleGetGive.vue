<template>
  <div>
    <NuxtLink
      to="get"
      class="bg-primary/20 hover:bg-primary duration-200 ease-out rounded-l-full text-white px-4 py-1"
      active-class="active-link"
    >
      GET
    </NuxtLink>
    <NuxtLink
      to="give"
      class="bg-primary/20 hover:bg-primary duration-200 ease-out rounded-r-full text-white px-4 py-1"
      active-class="active-link"
    >
      GIVE
    </NuxtLink>
  </div>
</template>

<style scoped>
.active-link {
  @apply bg-primary ring ring-primary/30;
}
</style>
