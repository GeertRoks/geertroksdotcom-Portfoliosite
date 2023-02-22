<template>
  <audio controls class="w-full my-5">
    <source :src="file" type="audio/mpeg">
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
