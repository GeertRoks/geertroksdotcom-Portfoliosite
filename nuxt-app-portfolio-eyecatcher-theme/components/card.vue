<template>
  <nuxt-link :to="{ path: '/project/' + project.slug }">
    <article class="cursor-pointer hover:bg-gray-100">
      <img
        v-bind:src="project.image"
        alt="project-image"
        class="w-full aspect-square object-cover"
      />
      <div class="px-4">
        <div class="flex flex-row justify-between mb-2 space-x-2">
          <h1 class="text-2xl font-bold">{{ project.title }}</h1>
          <h3 class="text-lg flex-shrink-0">{{ project.date | formatDate }}</h3>
        </div>
        <ul class="flex flex-row space-x-2 mb-1">
          <Tag
            v-for="tag of project.tags"
            :key="project.slug + '-' + tag"
            :tag="tag"
          />
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
