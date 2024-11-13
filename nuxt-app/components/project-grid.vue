<template>
  <div v-if="projects.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-9">
    <Card v-for="project in projects" :key="project.slug" :project="project" :selectedTag="props.selectedTag" />
  </div>
  <p v-else>No projects found.</p>
</template>

<script setup lang="ts">
  const props = defineProps({
    projects: Array,
    selectedTag: String,
  });
</script>
