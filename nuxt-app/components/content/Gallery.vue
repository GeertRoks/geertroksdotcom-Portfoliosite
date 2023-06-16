<template>
  <div class="m-auto w-full bg-gray-100 my-5">

    <div class="flex flex-row items-center text-accent-300">
      <div class="w-10 flex items-center flex-col">
        <button @click="selected = Math.max(selected - 1, 0);" v-if="selected != 0">
          <svg height="20" width="20" class="hover:text-primary-300">
            <polygon points="20,0 20,20 0,10" style="fill:currentColor;" />
          </svg>
        </button>
      </div>

      <img :src="path + images[selected].file" class="object-contain w-full h-full aspect-video m-0"/>

      <div class="w-10 flex items-center flex-col">
        <button @click="selected = Math.min(selected + 1, images.length - 1);" v-if="selected != images.length-1">
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
  path: {
    type: String,
    default: ''
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
