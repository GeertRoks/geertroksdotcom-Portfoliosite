<template>
  <audio controls class="w-full my-5">
    <source :src="config.public.cdn_url + file" type="audio/mpeg">
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
