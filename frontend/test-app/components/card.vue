<template>
  <nuxt-link :to="{ path: 'project/' + project.slug }">
  <article class="cursor-pointer hover:bg-gray-100">
    <img v-bind:src="project.image" alt="project-image" class="w-full aspect-square object-cover">
    <div class="px-6">
      <h1 class="text-2xl font-bold">{{ project.title }}</h1>
      <h3 class="text-lg">{{ project.date }} {{ project.year }}</h3>
      <ul class="flex flex-row space-x-2">
        <tag v-for="tag of project.tags" :key="tag" :tag="tag" />
      </ul>
      <p>{{ project.description }}</p>
    </div>
  </article>
  </nuxt-link>
</template>

<script>
    export default {
        props: ['project'],
    }
</script>
