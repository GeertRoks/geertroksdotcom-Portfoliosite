<template>

  <!-- About quick view -->

  <section class="bg-orange-300 pb-16 md:py-16">
  <div class="m-auto max-w-6xl px-6 md:pl-6 md:grid md:grid-cols-2 lg:grid-cols-5">
    <div class="md:my-auto md:pr-16 lg:col-span-3">
    <h1 class="text-6xl font-bold text-center w-full py-20 leading-tight md:text-left md:py-10">Geert <br class="sm:hidden"> Roks</h1>
    <p>
      I am Geert. I have a broad range of intrests; from Linux to hardware to music and art. This site showcases my work through the years.
    </p>
    <div class="md:flex md:flex-row md:space-x-4">
      <button class="w-full bg-orange-400 text-white font-bold py-4 my-2" onclick="window.location.href='/projects';">Projects</button>
      <button class="w-full border-2 border-orange-400 text-orange-400 font-bold py-4 my-2" onclick="window.location.href='/contact';">Contact me</button>
    </div>
    </div>
    <img src="https://source.unsplash.com/featured/?face,creative,portrait" alt="picture of me" class="w-full aspect-square object-cover my-10 md:p-10 md:my-auto lg:col-span-2">
  </div>
  </section>

  <!-- Projects quick view -->

  <section id="projects" class="py-16 m-auto max-w-6xl ">
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
  <article class="cursor-pointer hover:bg-gray-100" v-for="index in 6" :key="index">
    <img src="https://source.unsplash.com/featured/?creative" alt="project-image" class="w-full aspect-square object-cover">
    <div class="px-6">
      <h1 class="text-2xl font-bold">Title</h1>
      <h3 class="text-lg">Jan 2022</h3>
      <ul class="flex flex-row space-x-2">
        <li class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full">tag-1</li>
        <li class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full">tag-2</li>
        <li class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full">tag-3</li>
      </ul>
      <p>
        Snippet of the project describtion. Describing what it is about in about 150 characters.
      </p>
    </div>
  </article>

    </div>
    <button class="w-full border-2 border-orange-400 text-orange-400 font-bold py-5 my-2 m-auto" onclick="window.location.href='/projects';">See more</button>
  </section>

</template>

<script>
definePageMeta({
  layout: false,
});
</script>
