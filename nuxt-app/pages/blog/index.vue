<template>
  <!-- projects -->
  <main class="flex-grow">
    <section class="py-16 m-auto max-w-6xl">
      <h1 class="text-4xl font-bold mb-8 mx-2">Blog</h1>
      <ProjectGrid :projects="posts" class="sm:mx-2" />
      <!-- -->
    </section>
  </main>

</template>

<script setup>
const { data:posts } = await useAsyncData('post', () => queryContent('/blog/post').where({status: { $eq: "publish"}}).only(['_path', 'title', 'date', 'description', 'tags', 'image']).sort({ date: -1}).find())
</script>

<script>
export default {
  name: "blogPage",
  data() {
    return {}
  },
};
</script>
