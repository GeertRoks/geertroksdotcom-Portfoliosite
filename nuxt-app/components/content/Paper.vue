<template>
  <NuxtLink :to="link" external class="max-w-fit my-5 px-8 border-2 rounded-full flex flex-row items-center gap-10 hover:bg-gray-100">
      <span class="inline-block relative btn-svg ">
      <svg fill="#000000" viewBox="0 0 32 32" width="29" height="29" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect height="1" width="10" x="10" y="2"></rect><rect height="1" width="10" x="10" y="27"></rect><rect height="1" transform="translate(-8.5 21.5) rotate(-90)" width="18" x="-2.5" y="14.5"></rect><rect height="1" transform="translate(8.5 38.5) rotate(-90)" width="18" x="14.5" y="14.5"></rect><rect height="1" width="10" x="12" y="29"></rect><rect height="1" transform="translate(8.5 42.5) rotate(-90)" width="18" x="16.5" y="16.5"></rect><path d="M22,30V29h2a1,1,0,0,0,1-1V26h1v2a2,2,0,0,1-2,2Z"></path><path d="M20,28V27h2a1,1,0,0,0,1-1V24h1v2a2,2,0,0,1-2,2Z"></path><path d="M10,28V27H8a1,1,0,0,1-1-1V24H6v2a2,2,0,0,0,2,2Z"></path><path d="M20,2V3h2a1,1,0,0,1,1,1V6h1V4a2,2,0,0,0-2-2Z"></path><path d="M10,2V3H8A1,1,0,0,0,7,4V6H6V4A2,2,0,0,1,8,2Z"></path><path d="M23,4V5h1a1,1,0,0,1,1,1V8h1V6a2,2,0,0,0-2-2Z"></path><path d="M12,30V29H10a1,1,0,0,1-1-1V27H8v1a2,2,0,0,0,2,2Z"></path><rect height="1" transform="translate(30 45) rotate(-180)" width="12" x="9" y="22"></rect><rect height="1" transform="translate(30 37) rotate(-180)" width="12" x="9" y="18"></rect><rect height="1" transform="translate(30 29) rotate(-180)" width="12" x="9" y="14"></rect><rect height="1" transform="translate(30 21) rotate(-180)" width="12" x="9" y="10"></rect><rect height="1" transform="translate(30 13) rotate(-180)" width="12" x="9" y="6"></rect></g></svg>
      </span>
      <ContentSlot />
  </NuxtLink>
</template>

<script setup>
defineProps({
  link: {
    type: String,
    default: ''
  },
})
</script>
