<template>
  <iframe controls class="w-full aspect-video" :src="'https://www.youtube.com/embed/' + video_id">
  </iframe>
</template>

<script setup>
defineProps({
  video_id: {
    type: String,
    default: ''
  },
})
</script>

