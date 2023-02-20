<template>
  <!-- projects -->
  <main class="flex-grow">
    <section class="py-16 m-auto max-w-6xl">
      <h1 class="text-4xl font-bold mb-8 mx-2">Filtered tag: {{ route.params.slug[0] }}</h1>
      <ProjectGrid :projects="projects" class="sm:mx-2" />
      <!-- -->
    </section>
  </main>

</template>

<script setup>
const route = useRoute()
const { data: projects } = await useAsyncData('tag-projects', () => queryContent('/project').where({ tags: { $contains: route.params.slug }, status: { $eq: "publish"} }).sort({ date: -1 }).find())
</script>

<script>
export default {
  name: "tagPage",
  data() {
    return {}
  },
};
</script>
