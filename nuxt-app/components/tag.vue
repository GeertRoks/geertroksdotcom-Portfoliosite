<template>
  <NuxtLink :to="{ name: 'projects', query: { tag: props.tag } }" class="bg-white">
    <li
      class="text-xs inline-block py-2 px-3.5 leading-none text-center whitespace-nowrap align-baseline font-bold border-primary-500 border hover:bg-primary-100 text-gray-500 rounded-full"
      v-text="props.tag"
    ></li>
    <p>{{props.filtered}}</p>
  </NuxtLink>
</template>

<script setup lang="ts">
  const props = defineProps({
    tag: String,
    filtered: String
  });

  watchEffect(() => {
    console.log(props.filtered);
  });

</script>
