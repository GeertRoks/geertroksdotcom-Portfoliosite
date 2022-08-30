<template>
  <div id="page" class="flex flex-col h-screen">
    <Navbar />

    <!-- projects -->
    <main class="flex-grow">
      <section class="py-16 m-auto max-w-6xl">
        <ProjectGrid :projects="projects" />
        <!-- -->
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
export default {
  name: "projectsPage",
  async asyncData({ $content, query }) {
    try {
      let query_tags = [];
      if (query.tags) {
        query_tags = query.tags.split(",");
      }
      const projects = await $content("portfolio")
        .where({ tags: { $contains: query_tags } })
        .sortBy("date", "desc")
        .fetch();
      return { projects };
    } catch (error) {
      return { error };
    }
  },
  watch: {
    "$route.query"() {
      this.$nuxt.refresh();
    },
  },
  //methods: {
  //  getTags: function() {
  //    let tags = [];
  //    for (let i = 0; i < projects.length; i++) {
  //      console.log(projects[i].tags);
  //      //tags = tags.concat(project.tags);
  //    }
  //    console.log("tags: " + tags + ", " + projects.length);
  //    return { tags }
  //  }
  //}
};
</script>
