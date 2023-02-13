<template>
  <iframe controls class="w-full my-5 aspect-video" :src="'https://www.youtube.com/embed/' + video_id">
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

