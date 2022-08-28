<template>
  <div id="page">
    <Navbar />

    <!-- projects -->
    <section id="projects" class="py-16 m-auto max-w-6xl ">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        <Card v-for="project in projects" :key="project.slug" :project=project />
      </div>
    </section>

    <footer class="h-48 bg-orange-300">
    </footer>

  </div>
</template>

<script>
  export default {
    name: 'ContactPage',
    async asyncData({$content, query}) {
      let query_tags = [];
      if (query.tags) {
        query_tags = query.tags.split(',');
        console.log("query.tags: " + query_tags + ", " + typeof(query_tags));
      }
      const projects = await $content("portfolio")
        .where({'tags': {$contains: query_tags} })
        .sortBy("date", 'desc')
        .fetch();
      return {projects};
    },
    watch: {
      '$route.query'() {
        this.$nuxt.refresh();
      }
    },
  }
</script>
