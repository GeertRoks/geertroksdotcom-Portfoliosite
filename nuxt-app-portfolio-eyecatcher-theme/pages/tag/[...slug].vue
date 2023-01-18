<template>
  <!-- projects -->
  <main class="flex-grow">
    <section class="py-16 m-auto max-w-6xl">
      <h1 class="text-5xl mb-8">Filtered tag: {{ route.params.slug[0] }}</h1>
      <ProjectGrid :projects="projects" />
      <!-- -->
    </section>
  </main>

</template>

<script setup>
const route = useRoute()
const { data: projects } = await useAsyncData('tag-projects', () => queryContent('/project').where({ tags: { $contains: route.params.slug } }).sort({ date: -1 }).find())
</script>

<script>
export default {
  name: "tagPage",
  data() {
    return {}
  },
};
</script>
