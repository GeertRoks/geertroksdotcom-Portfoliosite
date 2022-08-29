<template>
  <nuxt-link :to="{ path: 'project/' + project.slug }">
    <article class="cursor-pointer hover:bg-gray-100">
      <img
        v-bind:src="project.image"
        alt="project-image"
        class="w-full aspect-square object-cover"
      />
      <div class="px-6">
        <h1 class="text-2xl font-bold">{{ project.title }}</h1>
        <h3 class="text-lg">{{ project.date }} {{ project.year }}</h3>
        <ul class="flex flex-row space-x-2">
          <li
            class="text-xs inline-block py-2 px-3.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full"
            v-for="tag of project.tags"
            :key="project.slug + '-' + tag"
          >
            <nuxt-link :to="{ path: '/projects', query: { tags: tag } }" v-text="tag"></nuxt-link>
          </li>
        </ul>
        <p>{{ project.description }}</p>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    },
  },
};
</script>
