<!--
<template>
  <div class="flex flex-row w-full h-16 items-center">
    <h1 class="font-medium text-3xl"><a href="/">Geert Roks</a></h1>
    <div class="flex-grow"></div>
    <nav class="flex">
        <a href="/projects" class="hidden sm:mx-5 sm:block">Projects</a>
        <a href="/contact" class="hidden sm:mx-5 sm:block">Contact</a>

      <div id="hamburger-nav" class="cursor-pointer mx-4 sm:hidden">&#9776;</div>
      <div class="space-y-1 mx-2">
        <span class="block w-5 h-0.5 bg-gray-600"></span>
        <span class="block w-5 h-0.5 bg-gray-600"></span>
        <span class="block w-5 h-0.5 bg-gray-600"></span>
      </div>
    </nav>
  </div>

</template>
-->

<template>
    <nav
      class="
        py-8
        mx-auto
        md:flex md:justify-between md:items-center
      "
    >
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="
            text-xl
            font-bold
            text-gray-800
            md:text-2xl
            hover:text-grey-400
          "
          >Geert Roks
        </router-link>
        <!-- Mobile menu button -->
        <div @click="toggleNav" class="flex md:hidden">
          <button
            type="button"
            class="
              text-grey-100
              hover:text-black-400
            "
          >
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <ul
        :class="showMenu ? 'flex' : 'hidden'"
        class="
          flex-col
          mt-8
          space-y-4
          md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0
        "
      >
        <li class="text-black-800 cursor-pointer">
        <router-link to="/projects">Projects</router-link>
        </li>
        <!--<li class="text-gray-100 hover:text-indigo-400">About</li>-->
        <li class="text-black-800 cursor-pointer">
        <router-link to="/contact">Contact</router-link>
        </li>
      </ul>
    </nav>
</template>
<script>
import { ref } from 'vue';
export default {
  setup() {
    let showMenu = ref(false);
    const toggleNav = () => (showMenu.value = !showMenu.value);
    return { showMenu, toggleNav };
  },
};
</script>
