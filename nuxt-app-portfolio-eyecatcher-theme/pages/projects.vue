<template>
  <div id="page" class="flex flex-col h-screen overflow-scroll bg-white">
    <Navbar :showMenu.sync="showMenu"/>
    <div class="md:hidden opacity-60 bg-black absolute inset-0" v-if="showMenu"></div>

    <!-- projects -->
    <main class="flex-grow">
      <section class="py-16 m-auto max-w-6xl">
        <h1 class="text-4xl font-bold mb-8">My Projects</h1>
        <ProjectGrid :projects="projects" />
        <!-- -->
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
const { data: projects } = await useAsyncData('projects', () => queryContent('/portfolio').only(['slug', 'title', 'date', 'description', 'tags', 'image']).sort({ date: -1}).find())
console.log("projects: ", projects)
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
