<template>
  <video controls class="w-full aspect-video">
    <source :src="'http://localhost:3434/images/' + link" type="video/mp4">
  </video>
</template>

<script setup>
defineProps({
  link: {
    type: String,
    default: ''
  },
})
</script>
