<template>
  <li
    class="select-none bg-white text-xs inline-block py-2 px-3.5 leading-none text-center whitespace-nowrap align-baseline font-bold border-primary-500 border text-gray-500 rounded-full"
    :class="{ 'active': props.highlight, 'clickable': props.clickable }"
    v-text="props.tag"
  ></li>
</template>

<script setup lang="ts">
  const props = defineProps({
    tag: String,
    highlight: Boolean,
    clickable: Boolean
  });
</script>

<style scoped>
.active {
  @apply bg-primary-200;
}
.clickable {
  @apply hover:bg-primary-100 cursor-pointer;
}
</style>
