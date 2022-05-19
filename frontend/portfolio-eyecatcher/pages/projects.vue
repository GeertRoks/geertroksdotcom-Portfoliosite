<template>
  <section id="projects" class="py-16 m-auto max-w-6xl ">
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
      <Card v-for="index in 8" :key="index" />

    </div>
  </section>

  <footer class="h-48 bg-orange-300">
  </footer>
</template>
