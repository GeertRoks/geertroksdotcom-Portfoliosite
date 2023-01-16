<template>
  <div id="page" class="flex flex-col h-screen overflow-scroll bg-white">
    <Navbar :showMenu.sync="showMenu"/>
    <div class="md:hidden opacity-60 bg-black absolute inset-0" v-if="showMenu"></div>

    <!-- projects -->
    <main class="flex-grow">
      <section class="py-16 m-auto max-w-6xl">
        <h1 class="text-4xl font-bold mb-8 mx-2">My Projects</h1>
        <ProjectGrid :projects="projects" class="sm:mx-2" />
        <!-- -->
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
const { data: projects } = await useAsyncData('projects', () => queryContent('/project').only(['_path', 'title', 'date', 'description', 'tags', 'image']).sort({ date: -1}).find())
</script>

<script>
export default {
  name: "projectsPage",
  data() {
    return {
      showMenu: false
    }
  },
};
</script>
