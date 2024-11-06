<template>
  <div class="m-auto w-full bg-gray-100 my-5 md:p-8 sm:p-4 p-2">

    <div class="relative overflow-hidden">
      <div class="flex flex-row justify-between text-primary-300 text-opacity-40 absolute h-full w-full z-30">
        <div class="h-fill">
          <div @click="decrementSelected();" v-if="selected != 0" class="px-8 h-full flex items-center justify-start w-56  hover:bg-gradient-to-r bg-transparant hover:from-gray-100 hover:text-primary-400 transition-all ease-in duration-100">
            <div class="w-10 h-fill">
              <svg height="40" width="40" viewBox="-4.5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrow_left [#335]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-345.000000, -6679.000000)" fill="currentColor"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M299.633777,6519.29231 L299.633777,6519.29231 C299.228878,6518.90256 298.573377,6518.90256 298.169513,6519.29231 L289.606572,6527.55587 C288.797809,6528.33636 288.797809,6529.60253 289.606572,6530.38301 L298.231646,6538.70754 C298.632403,6539.09329 299.27962,6539.09828 299.685554,6538.71753 L299.685554,6538.71753 C300.100809,6538.32879 300.104951,6537.68821 299.696945,6537.29347 L291.802968,6529.67648 C291.398069,6529.28574 291.398069,6528.65315 291.802968,6528.26241 L299.633777,6520.70538 C300.038676,6520.31563 300.038676,6519.68305 299.633777,6519.29231" id="arrow_left-[#335]"> </path> </g> </g> </g> </g></svg>
            </div>
          </div>
        </div>


        <div class="h-fill">
          <div @click="incrementSelected();" v-if="selected != images.length-1" class="px-8 h-full flex items-center justify-end w-56  hover:bg-gradient-to-l bg-transparant hover:from-gray-100 hover:text-primary-400 transition-all ease-in duration-100">
            <div class="w-10 h-fill">
              <svg height="40" width="40" viewBox="-4.5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrow_right [#336]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-305.000000, -6679.000000)" fill="currentColor"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769" id="arrow_right-[#336]"> </path> </g> </g> </g> </g></svg>
            </div>
          </div>
        </div>
      </div>
        <Transition
            :name="transitionDirection"
            mode="out-in"
        >
        <NuxtImg :src="path + images[selected].file" :key="selected" preload class="object-contain w-full h-full m-auto aspect-video bg-gray-200"/>
      </Transition>
    </div>

    <div v-if="images.length > 1" class="flex flex-row gap-4 justify-center">
      <span v-for="(image, index) in images" :key="index" @click="setSelected(index)" :class="{'font-black': selected === index}" class="text-accent-300 text-4xl cursor-pointer select-none hover:text-primary-300">
        .
      </span>
    </div>


    <p class="text-center m-0 pt-4 md:px-10 italic text-gray-400 sm:text-sm text-xs">
      {{ images[selected].description }}
    </p>

  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

interface Image {
  file: string
  description: string
}
const props = defineProps<{
  images: Image[]
  path: string
}>()

// Selected image logic
const selected = ref(0);
const transitionDirection = ref('slide-left');

watch(selected, (val, old) => {
  transitionDirection.value = val > old ? 'slide-left' : 'slide-right'
})

function incrementSelected(): void {
  if (selected.value < props.images.length-1) {
    selected.value++;
  }
}
function decrementSelected(): void {
  if (selected.value > 0) {
    selected.value--;
  }
}
function setSelected(index: Number): void{
  selected.value = index;
}

</script>

<style scoped>
.slide-right-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.slide-left-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.slide-right-leave-from,
.slide-right-enter-to,
.slide-left-leave-from,
.slide-left-enter-to {
  opacity: 1;
}
.slide-right-leave-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-left-enter-active {
  transition: all 0.2s;
}
</style>
