<template>
  <header class="w-full bg-white sticky top-0 z-50 border-b-4 border-primary-500">
    <div class="max-w-6xl m-auto px-6">
      <nav class="py-6 md:py-8 mx-auto md:flex md:justify-between md:items-center">
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/"
            class="text-xl font-bold text-gray-800 md:text-2xl hover:text-grey-400"
            id="nav-home"
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
        <div
          :class="showMenu ? 'block absolute left-0 right-0 top-16 px-12 pb-12' : ''"
          class="bg-white md:static md:pb-0"
        >
          <ul
            :class="showMenu ? 'flex' : 'hidden'"
            class="flex-col mt-8 space-y-12 text-xl md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
          >
            <li class="text-black-800 hover:text-primary cursor-pointer">
              <NuxtLink to="/projects">Projects</NuxtLink>
            </li>
            <!--<li class="text-gray-100 hover:text-indigo-400">About</li>-->
            <li class="text-black-800 hover:text-primary cursor-pointer">
              <NuxtLink to="/contact">Contact</NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  props: ['showMenu'],
  methods: {
    toggleNav() {
      this.$emit('update:showMenu', !this.showMenu);
    }
  },
};
</script>
