<template>
  <video controls class="w-full my-5 aspect-video" preload="metadata">
    <source :src="config.public.cdn_url + file + `.mp4`" type="video/mp4">
    <source :src="config.public.cdn_url + file + `.webm`" type="video/webm">
    <source :src="config.public.cdn_url + file + `.ogg`" type="video/ogg">
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
