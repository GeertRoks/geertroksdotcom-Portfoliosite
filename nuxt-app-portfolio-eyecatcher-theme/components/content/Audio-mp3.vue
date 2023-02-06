<template>
  <audio controls class="w-full">
    <source :src="'http://localhost:3434/images/' + file" type="audio/mp3">
  </audio>
</template>

<script setup>
defineProps({
  file: {
    type: String,
    default: ''
  },
})
</script>
