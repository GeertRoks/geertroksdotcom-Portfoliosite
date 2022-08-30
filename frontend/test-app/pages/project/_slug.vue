<template>
  <div id="page" class="flex flex-col h-screen">
    <Navbar />

    <!-- Project page -->
    <main class="flex-grow mb-12">
      <article class="w-article">
        <img
          v-bind:src="project.image"
          alt="project image"
          class="h-screen-60 w-full object-cover"
        />
        <div class="w-text">
          <h1
            class="text-5xl font-medium text-gray-900 leading-tight mt-0 mb-2"
          >
            {{ project.title }}
          </h1>
          <h3 class="text-lg font-semibold text-gray-600 mb-2">
            {{ project.description }}
          </h3>
          <ul class="flex flex-row space-x-2">
            <tag v-for="tag of project.tags" :key="tag" :tag="tag" />
          </ul>
          <div class="mt-4 mx-auto">
            <nuxt-content class="max-w-none" :document="project" />
          </div>
        </div>
      </article>
    </main>

    <Footer />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const project = await $content("portfolio", params.slug).fetch();
    return { project };
  },
};
</script>

<style>
.w-article {
  max-width: 120ch;
  margin: auto;
}
.w-text {
  max-width: 90ch;
  margin: auto;
}
.nuxt-content h2 {
  @apply text-2xl font-bold;
}
.nuxt-content h3 {
  @apply text-xl font-bold;
}
.nuxt-content p {
  @apply text-lg text-gray-700;
}
</style>
