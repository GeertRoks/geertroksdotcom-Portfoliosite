<template>
  <!-- blog page -->
  <main class="flex-grow">
    <article class="w-article bg-white pb-12">
      <ContentDoc v-slot="{ doc }">
        <img
          :src="`/_ipx/_` + doc._path + `/` + doc.image"
          alt="Blog post image"
          class="h-screen-40 md:h-screen-60 w-full object-cover rounded-b-md"
        />
        <div class="w-text px-4 py-4">
          <div class="flex flex-row justify-between mb-2 space-x-2 items-end">
            <h1 class="text-3xl md:text-5xl font-medium text-gray-900 leading-tight mt-0 mb-3 sm:mb-2">{{ doc.title }}</h1>
            <h3 class="text-lg md:text-2xl flex-shrink-0 mb-5">{{ $formatDate(doc.date) }}</h3>
          </div>
          <h3 class="text-lg text-justify font-semibold text-gray-600 mb-2">
            {{ doc.description }}
          </h3>
          <ul class="flex flex-row flex-wrap gap-1.5">
            <tag v-for="tag of doc.tags" :key="tag" :tag="tag" />
          </ul>
          <div class="mt-4 mx-auto">
            <ContentRenderer :value="doc" class="prose max-w-none" />
          </div>
        </div>
      </ContentDoc>
    </article>
  </main>
</template>

<script setup>
const config = useRuntimeConfig();
</script>

<script>
export default {
  data() {
    return {}
  },
};
</script>

<style>
.w-article {
  max-width: 120ch;
  margin: auto;
}
.w-text {
  max-width: 90ch;
  margin: auto;
}
</style>
