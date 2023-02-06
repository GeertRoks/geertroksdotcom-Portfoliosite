<template>
  <video controls class="w-full aspect-video">
    <source :src="config.assets_server + file" type="video/mp4">
  </video>
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
