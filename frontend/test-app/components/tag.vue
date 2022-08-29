<template>
  <li
    class="text-xs inline-block py-2 px-3.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full"
  >
    <nuxt-link :to="{ path: '/projects?tags=' + tag }">
      {{ tag }}
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: ["tag"],
};
</script>
