<template>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-9">
    <ClientOnly>
      <Card v-for="project in projects" :key="project.slug" :project="project" />
      <template #fallback>
        <!-- Possible server side code for fill when loading the projects, maybe Spotify style? -->
      </template>
    </ClientOnly>
  </div>
</template>

<script>
export default {
  props: ["projects"],
};
</script>
