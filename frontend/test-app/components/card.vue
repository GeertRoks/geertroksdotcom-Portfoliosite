<template>
  <nuxt-link :to="{ path: 'project/' + project.slug }">
  <article class="cursor-pointer hover:bg-gray-100">
    <img v-bind:src="project.image" alt="project-image" class="w-full aspect-square object-cover">
    <div class="px-6">
      <h1 class="text-2xl font-bold">{{ project.title }}</h1>
      <h3 class="text-lg">{{ project.date }} {{ project.year }}</h3>
      <ul class="flex flex-row space-x-2">
        <li v-for="tag of project.tags" class="text-xs inline-block py-2 px-3.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full">{{ tag }}</li>
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
