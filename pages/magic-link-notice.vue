<script setup>
const user = useSupabaseUser()

watchEffect(() => {
  if (user.value) navigateTo('/')
})
</script>

<template>
  <NuxtLayout name="centered">
    <section class="space-y-6">
      <div class="space-y-8">
        <h1 class="text-center">
          Check your mail
        </h1>
        <p>
          We've send a login-link to your email. Please navigate to that link to login.
        </p>
      </div>
    </section>
  </NuxtLayout>
</template>
