<template>
  <img class="my-5" :src="file"/>
</template>

<script setup>
defineProps({
  file: {
    type: String,
    default: ''
  },
});
</script>
