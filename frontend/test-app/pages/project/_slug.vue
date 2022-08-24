<template>
  <div id="page">
    <Navbar />

    <!-- Project page -->

    <article class="project-content">
      <h1 class="text-5xl font-medium text-gray-900 leading-tight mt-0 mb-2">{{ project.title }}</h1>
      <h3 class="text-lg font-semibold text-gray-600 mb-2">{{ project.description }}</h3>
      <ul class="flex flex-row space-x-2">
        <li v-for="tag of project.tags" class="text-xs inline-block py-2 px-3.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full">{{ tag }}</li>
      </ul>
      <div class="mt-4 mx-auto">
        <nuxt-content class="max-w-none" :document="project" />
      </div>
    </article>

  </div>
</template>

<script>
export default {
  async asyncData({ $content, params}) {
    const project = await $content('portfolio', params.slug).fetch();
    return { project };
  },
}
</script>

<style>
  .project-content {
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
