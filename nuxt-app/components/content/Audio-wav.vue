<template>
  <audio controls class="w-full my-5">
    <source :src="file" type="audio/wav">
  </audio>
</template>

<script setup>
const config = useRuntimeConfig();
defineProps({
  file: {
    type: String,
    default: ''
  },
})
</script>

