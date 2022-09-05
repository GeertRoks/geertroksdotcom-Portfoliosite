<template>
  <nuxt-link :to="{ path: '/tag/' + tag }">
    <li
      class="text-xs inline-block py-2 px-3.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full"
      v-text="tag"
    ></li>
  </nuxt-link>
</template>

<script>
export default {
  props: ["tag"],
};
</script>
