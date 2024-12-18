<template>
  <div class="m-auto w-full">

    <NuxtImg :src="path + image.file" class="object-contain m-auto max-h-[640px] max-w-[80%]"/>

    <p class="text-center m-0 pt-4 md:px-10 italic text-gray-400 sm:text-sm text-xs">
      {{ image.description }}
    </p>

  </div>
</template>

<script setup lang="ts">

interface Image {
  file: string
  description: string
}
const props = defineProps<{
  image: Image
  path: string
}>()

</script>
