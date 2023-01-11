<script setup>

</script>

<template>
  <Head>
    <Title>Home</Title>
  </Head>

  <NuxtLayout name="centered">
    <div class="flex flex-col items-center space-y-16">
      <div class="flex flex-col items-center space-y-4 text-center">
        <h1 class="text-primary">
          Left-over
        </h1>

        <blockquote class="max-w-sm text-xl">
          "A <strong>crowdsourced</strong> neighbourhood platform to prevent food waste"
        </blockquote>
      </div>

      <div class="flex items-center justify-center space-x-16">
        <NuxtLink to="/get" class="flex flex-col items-center max-w-sm p-8 space-y-8 transition-all duration-100 ease-out shadow-2xl hover:scale-110 rounded-3xl lex shadow-primary/75">
          <h2 class="text-primary">
            Get <span class="text-black">food</span>
          </h2>

          <p class="italic text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sagittis erat a nisi congue, ut pellentesque tortor sollicitudin. Nunc finibus <strong>tellus</strong> sem, laoreet lobortis metus facilisis vitae. Nam ut rhoncus lectus. Quisque placerat leo ut nunc ullamcorper blandit. Proin vitae vulputate quam.
          </p>
        </NuxtLink>

        <NuxtLink to="/give" class="flex flex-col items-center max-w-sm p-8 space-y-8 transition-all duration-100 ease-out shadow-2xl hover:scale-110 rounded-3xl shadow-primary/75">
          <h2 class="text-primary">
            Give <span class="text-black">food</span>
          </h2>

          <p class="italic text-center">
            Nam a nibh iaculis, viverra justo vitae, ornare nulla. Fusce nec malesuada ligula. Phasellus convallis condimentum tellus non tincidunt. Donec dignissim <strong>telum</strong> aliquet. Cras a mattis felis. Pellentesque eget lectus facilisis, maximus justo eu, imperdiet erat. Aenean sed lorem eget nisi aliquet euismod vitae sed sem.
          </p>
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>
