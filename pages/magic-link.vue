<script setup>
const user = useSupabaseUser()

watchEffect(() => {
  if (user.value) navigateTo('/')
})
</script>

<template>
  <Head>
    <Title>Magic link</Title>
  </Head>

  <NuxtLayout name="centered-box">
    <section>
      <div class="space-y-4 text-center">
        <h1 class="text-3xl">
          Check your mail
        </h1>
        <p>
          We've send a login-link to your email. Please navigate to that link to login.
        </p>
      </div>
    </section>
  </NuxtLayout>
</template>
