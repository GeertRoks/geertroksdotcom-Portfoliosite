<template>
  <div id="page" class="flex flex-col h-screen">
    <Navbar />

    <!-- projects -->
    <main class="flex-grow">
      <section class="py-16 m-auto max-w-6xl">
        <h1 class="text-5xl mb-8">Filtered tag: {{ this.$route.params.slug }}</h1>
        <ProjectGrid :projects="projects" />
        <!-- -->
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
export default {
  name: "tagPage",
  async asyncData({ $content, params }) {
    try {
      const projects = await $content("portfolio")
        .where({ tags: { $contains: params.slug } })
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
