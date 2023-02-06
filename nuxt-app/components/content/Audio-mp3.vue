<template>
  <audio controls class="w-full">
    <source :src="config.assets_server + file" type="audio/mp3">
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
