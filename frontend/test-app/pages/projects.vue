<template>
  <div id="page" class="flex flex-col h-screen">
    <Navbar :showMenu.sync="showMenu"/>
    <div class="md:hidden opacity-60 bg-black absolute inset-0" v-if="showMenu"></div>

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
  data() {
    return {
      showMenu: false
    }
  },
};
</script>
