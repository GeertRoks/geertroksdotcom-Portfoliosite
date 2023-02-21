<template>
  <!-- projects -->
  <main class="flex-grow">
    <section class="py-16 m-auto max-w-6xl">
      <h1 class="text-4xl font-bold mb-8 mx-2">All Projects</h1>
      <ProjectGrid :projects="projects" class="sm:mx-2" />
      <!-- -->
    </section>
  </main>

</template>

<script setup>
const { data: projects } = await useAsyncData('projects', () => queryContent('/project').where({status: { $eq: "publish"}}).only(['_path', 'title', 'date', 'description', 'tags', 'image']).sort({ date: -1}).find())
</script>

<script>
export default {
  name: "projectsPage",
  data() {
    return {}
  },
};
</script>
