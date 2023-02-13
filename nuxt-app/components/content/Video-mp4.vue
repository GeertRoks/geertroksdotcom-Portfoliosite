<template>
  <video controls class="w-full my-5 aspect-video" preload="metadata">
    <source :src="file + `.mp4`" type="video/mp4">
    <source :src="file + `.webm`" type="video/webm">
    <source :src="file + `.ogg`" type="video/ogg">
  </video>
</template>

<script setup>
defineProps({
  file: {
    type: String,
    default: ''
  },
})
</script>
