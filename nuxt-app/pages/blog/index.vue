<template>
  <!-- blog -->
  <main class="flex-grow">
    <section class="py-16 m-auto max-w-6xl">
      <h1 class="text-4xl font-bold mb-8 mx-2">Blog</h1>
      <LoadingComponent v-if="isLoading" />
      <ProjectGrid v-else :projects="posts" postType="blog" filterMenu class="sm:mx-2" />
    </section>
  </main>

</template>

<script setup lang="ts">
  const showDrafts = import.meta.env.DEV;
  const statusList = showDrafts ? ['publish', 'draft'] : ['publish'];

  const { data:posts } = await useAsyncData(
    'post', () => queryContent('/blog/post')
    .where({status: { $in: statusList}})
    .only(['_path', 'status', 'title', 'date', 'description', 'tags', 'image'])
    .sort({ date: -1})
    .find()
  );

  const isLoading = ref(true);
  watch(posts, (newPosts) => {
    isLoading.value = false;
  }, { immediate: true});


</script>

