<template>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
    <Card v-for="project in projects" :key="project.slug" :project="project" />
  </div>
</template>

<script>
export default {
  props: ["projects"],
};
</script>
