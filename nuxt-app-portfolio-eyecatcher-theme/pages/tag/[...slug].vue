<template>
  <div id="page" class="flex flex-col h-screen overflow-scroll">
    <Navbar :showMenu.sync="showMenu"/>
    <div class="md:hidden opacity-60 bg-black absolute inset-0" v-if="showMenu"></div>

    <!-- projects -->
    <main class="flex-grow">
      <section class="py-16 m-auto max-w-6xl">
        <h1 class="text-5xl mb-8">Filtered tag: {{ route.params.slug[0] }}</h1>
        <ProjectGrid :projects="projects" />
        <!-- -->
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
const route = useRoute()
const { data: projects } = await useAsyncData('tag-projects', () => queryContent('/project').where({ tags: { $contains: route.params.slug } }).sort({ date: -1 }).find())
</script>

<script>
export default {
  name: "tagPage",
  data() {
    return {
      showMenu: false
    }
  },
};
</script>
