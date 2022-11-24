<template>
  <nuxt-link :to="{ path: '/tag/' + tag }">
    <li
      class="text-xs inline-block py-2 px-3.5 leading-none text-center whitespace-nowrap align-baseline font-bold border-primary border-2 text-white hover:bg-primary text-gray-700 rounded-full"
      v-text="tag"
    ></li>
  </nuxt-link>
</template>

<script>
export default {
  props: ["tag"],
};
</script>
