<template>
  <section class="flex flex-col min-h-screen">
    <header class="shrink-0">
      <Navigation />
    </header>

    <main class="container flex flex-col items-center justify-center flex-1 space-y-8">
      <slot />
    </main>

    <Footer />
  </section>
</template>
