<template>
  <div class="m-auto w-full bg-gray-100">

    <div class="relative">
      <img :src="config.assets_server + images[selected].file" class="object-contain w-full h-full aspect-video m-0"/>

      <div class="absolute inset-0 p-4 text-accent-300">
        <button @click="selected = Math.max(selected - 1, 0);" v-if="selected != 0" class="relative inset-y-1/2 left-0 float-left">
          <svg height="20" width="20" class="hover:text-primary-300">
            <polygon points="20,0 20,20 0,10" style="fill:currentColor;" />
          </svg>
        </button>
        <button @click="selected = Math.min(selected + 1, images.length - 1);" v-if="selected != images.length-1" class="relative inset-y-1/2 right-0 float-right">
          <svg height="20" width="20" class="hover:text-primary-300">
            <polygon points="0,0 0,20 20,10" style="fill:currentColor;" />
          </svg>
        </button>
      </div>
    </div>


    <p class="text-center mt-1">
      {{ images[selected].description }}
    </p>

    <div class=" h-24 flex flex-row gap-2 justify-center flex-0 m-auto relative overflow-hidden" v-if="menu">
      <!-- TODO: center the selected img in the menu -->
      <img v-for="(image, index) in images" :src="config.assets_server + image.file" class="object-cover aspect-square m-0 border-primary-500 hover:border-2 hover:border-primary-300 cursor-pointer" :class="{ 'border-2' :index===selected }" @click="selected = index"/>
    </div>

  </div>
</template>

<script setup>
const config = useRuntimeConfig();
defineProps({
  images: {
    type: Array,
    default: []
  },
  selected: {
    type: Number,
    default: 0
  },
  menu: {
    type: Boolean,
    default: false
  }
})
</script>
