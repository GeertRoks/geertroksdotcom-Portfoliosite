<template>
  <header class="w-full bg-white sticky top-0 z-40 border-b-4 border-primary-500">
    <div class="max-w-6xl m-auto px-6 z-50 relative bg-white">
      <nav class="py-6 md:py-8 mx-auto md:flex md:justify-between md:items-center">
        <div class="flex items-center justify-between z-50">
          <NuxtLink
            to="/"
            class="text-xl font-bold text-gray-800 md:text-2xl hover:text-grey-400"
            id="nav-home"
            @click.native="showMobileMenu = false"
            >Geert Roks
          </NuxtLink>

          <!-- Mobile menu button -->
          <div @click="showMobileMenu = !showMobileMenu" class="flex md:hidden">
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
          :class="showMobileMenu ? 'block absolute left-0 right-0 top-16 px-12 pb-12' : ''"
          class="bg-white md:static md:pb-0 z-40"
        >
          <ul
            :class="showMobileMenu ? 'flex' : 'hidden'"
            class="flex-col mt-8 space-y-12 text-xl md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
          >
            <!--<li class="text-gray-100 hover:text-indigo-400">About</li>-->
            <li class="text-black-800 hover:text-primary-500 cursor-pointer">
              <NuxtLink to="/projects" @click.native="showMobileMenu = false" class="nav-link">Projects</NuxtLink>
            </li>
            <li class="text-black-800 hover:text-primary-500 cursor-pointer" v-if="config.public.enable_blog">
              <NuxtLink to="/blog" @click.native="showMobileMenu = false" class="nav-link">Blog</NuxtLink>
            </li>
            <li class="text-black-800 hover:text-primary-500 cursor-pointer" v-if="config.public.enable_contact">
              <NuxtLink to="/contact" @click.native="showMobileMenu = false" class="nav-link">Contact</NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <Transition name="nav-underlay" mode="out-in">
      <div class="md:hidden opacity-60 bg-black absolute inset-0 z-0 h-screen" v-if="showMobileMenu"></div>
    </Transition>
  </header>
</template>

<script setup>
const config = useRuntimeConfig();

const showMobileMenu = ref(false);

</script>

<style scoped>
.nav-underlay-leave-to,
.nav-underlay-enter-from {
  opacity: 0;
  transform: translateY(-300px);
}
.nav-underlay-leave-from,
.nav-underlay-enter-to {
  @apply opacity-60;
}
.nav-underlay-leave-active,
.nav-underlay-enter-active {
  transition: all 0.2s;
}
a.router-link-active.nav-link {
  @apply border-b-4 border-primary-500;
}
</style>
