<script setup>
const user = useSupabaseUser()

watchEffect(() => {
  if (user.value) navigateTo('/')
})
</script>

<template>
  <Head>
    <Title>Verify email</Title>
  </Head>

  <NuxtLayout name="centered-box">
    <section>
      <div class="space-y-4 text-center">
        <h1 class="text-3xl">
          Check your mail
        </h1>
        <p>
          Verify your email and click the link in your email to login automatically.
        </p>
      </div>
    </section>
  </NuxtLayout>
</template>
