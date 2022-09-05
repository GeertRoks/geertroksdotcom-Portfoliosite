<template>
  <div id="page" class="flex flex-col h-screen">
    <Navbar />

    <!-- projects -->
    <main class="flex-grow">
      <section class="py-16 m-auto max-w-6xl">
        <h1 class="text-5xl mb-8">My Projects</h1>
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
  async asyncData({ $content }) {
    try {
      const projects = await $content("portfolio")
        .sortBy("date", "desc")
        .fetch();
      return { projects };
    } catch (error) {
      return { error };
    }
  },
};
</script>
