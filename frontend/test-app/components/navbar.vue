<template>
  <header class="w-full bg-gray-100 sticky top-0 z-50">
    <div class="max-w-6xl m-auto px-6">
      <nav class="py-8 mx-auto md:flex md:justify-between md:items-center">
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/"
            class="text-xl font-bold text-gray-800 md:text-2xl hover:text-grey-400"
            >Geert Roks
          </NuxtLink>
          <!-- Mobile menu button -->
          <div @click="toggleNav" class="flex md:hidden">
            <button type="button" class="text-grey-100 hover:text-black-400">
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
          class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
        >
          <li class="text-black-800 cursor-pointer">
            <NuxtLink to="/projects">Projects</NuxtLink>
          </li>
          <!--<li class="text-gray-100 hover:text-indigo-400">About</li>-->
          <li class="text-black-800 cursor-pointer">
            <NuxtLink to="/contact">Contact</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let showMenu = ref(false);
    const toggleNav = () => (showMenu.value = !showMenu.value);
    return { showMenu, toggleNav };
  },
};
</script>
