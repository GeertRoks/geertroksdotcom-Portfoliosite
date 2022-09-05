<template>
  <div id="page" class="flex flex-col h-screen">
    <Navbar :showMenu.sync="showMenu"/>
    <div class="md:hidden opacity-60 bg-black absolute inset-0" v-if="showMenu"></div>

    <main class="flex-grow">
      <!-- About quick view -->
      <section class="bg-primary pb-16 md:py-16">
        <div
          class="m-auto max-w-6xl px-6 md:pl-6 md:grid md:grid-cols-2 lg:grid-cols-5"
        >
          <div class="md:my-auto md:pr-16 lg:col-span-3">
            <h1
              class="text-6xl font-bold text-center w-full py-20 leading-tight md:text-left md:py-10"
            >
              Geert <br class="sm:hidden" />
              Roks
            </h1>
            <p>{{ about.description }}</p>
            <div class="md:flex md:flex-row md:space-x-4">
              <button
                class="w-full bg-accent-light text-white font-bold py-4 my-2"
                onclick="window.location.href='/projects';"
              >
                Projects
              </button>
              <button
                class="w-full border-2 border-accent-light text-accent-light font-bold py-4 my-2"
                onclick="window.location.href='/contact';"
              >
                Contact me
              </button>
            </div>
          </div>
          <img
            v-bind:src="about.image"
            alt="picture of me"
            class="w-full aspect-square object-cover my-10 md:p-10 md:my-auto lg:col-span-2"
          />
        </div>
      </section>

      <!-- Projects quick view -->
      <section class="py-16 m-auto max-w-6xl">

        <ProjectGrid :projects="featured_projects" />

        <div class="w-full flex items-center">
          <button
            class="border-2 border-yellow-600 text-yellow-600 font-bold py-5 my-2 mx-auto px-32"
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
import { ref } from "vue";
import ProjectGrid from "../components/project-grid.vue";
export default {
    name: "IndexPage",
    async asyncData({ $content, params }) {
        const featured_projects = await $content("portfolio")
            .where({ featured: true })
            .sortBy("date", "desc")
            .fetch();
        const about = await $content("about").fetch();
        return { featured_projects, about };
    },
    components: { ProjectGrid },
    data() {
      return {
        showMenu: false
      }
    },
};
</script>
