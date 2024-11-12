<template>
  <NuxtLink :to="project._path">
    <article class="h-full cursor-pointer bg-white shadow-md hover:shadow-xl border-b border-accent-500 sm:rounded-md">
      <NuxtImg :src="project._path + `/` + project.image"
        alt="project-image"
        class="w-full aspect-square object-cover sm:rounded-t-md"
      />
      <div class="px-4 pt-3 pb-4">
        <h1 class="text-2xl font-bold mb-1">{{ project.title }}</h1>
        <h3 class="text-lg mb-4 font-light">{{ $formatDate(project.date) }}</h3>
        <ul class="flex flex-row flex-wrap gap-1.5 mb-2">
          <Tag
            v-for="tag of project.tags"
            :key="project.slug + '-' + tag"
            :tag="tag"
          />
        </ul>
        <p>{{ project.description }}</p>
      </div>
    </article>
  </NuxtLink>
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
