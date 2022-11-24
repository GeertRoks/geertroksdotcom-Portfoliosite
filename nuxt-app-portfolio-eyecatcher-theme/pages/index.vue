<template>
  <div id="page" class="flex flex-col h-screen overflow-scroll bg-gray-100">
    <Navbar :showMenu.sync="showMenu"/>
    <div class="md:hidden opacity-60 bg-black absolute inset-0" v-if="showMenu"></div>

    <main class="flex-grow">
      <!-- About quick view -->
      <section class="bg-primary py-8 md:py-16">
        <div
          class="m-auto max-w-6xl px-6 md:pl-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
        >
          <div class="md:my-auto md:pr-16 lg:col-span-3">
            <h1
              class="text-5xl text-center pb-3 font-bold w-full leading-tight lg:text-6xl md:text-left md:py-10"
            >
              Geert Roks
            </h1>
            <p>{{ about.description }}</p>
            <div class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
              <button
                class="btn btn-primary"
                onclick="window.location.href='/projects';"
              >
                Projects
              </button>
              <button
                class="btn btn-secondary"
                onclick="window.location.href='/contact';"
              >
                Contact me
              </button>
            </div>
          </div>
          <img
            v-bind:src="about.image"
            alt="picture of me"
            class="w-8/12 sm:w-6/12 order-first m-auto md:order-none md:w-full aspect-square object-cover mb-7 md:p-10 md:my-auto lg:col-span-2"
          />
        </div>
      </section>

      <!-- Projects quick view -->
      <section class="py-8 md:py-16 m-auto max-w-6xl">

        <ProjectGrid :projects="featured_projects" class="mb-8" />

        <div class="w-full flex items-center justify-center">
          <button
            class="btn btn-large btn-primary"
            onclick="window.location.href='/projects';"
          >
            See more
          </button>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import ProjectGrid from "../components/project-grid.vue";
export default {
    name: "IndexPage",
    async asyncData({ $content }) {
      if (process.server) {
        const featured_projects = await $content("portfolio")
            .where({ featured: true })
            .only(['slug', 'title', 'date', 'description', 'tags', 'image'])
            .sortBy("date", "desc")
            .limit(6)
            .fetch();
        const about = await $content("about").fetch();
        return { featured_projects, about };
      }
    },
    components: { ProjectGrid },
    data() {
      return {
        showMenu: false
      }
    },
};
</script>
