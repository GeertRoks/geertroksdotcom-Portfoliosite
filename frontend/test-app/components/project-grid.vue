<template>
  <client-only>
    <div class="project-grid">
      <div class="w-full flex flex-row items-end justify-end">
        <button @click="toggleFilters()" class="mx-3 my-2">&#9660;filters</button>
      </div>
      <div id="filters" class="hidden">
        javascript, other tags, etc. ...
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        <Card v-for="project in projects" :key="project.slug" :project="project" />
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  props: ["projects"],
  created() {
    console.log(this.projects);
  },
  methods: {
    toggleFilters: function() {
      let filter_div = document.getElementById('filters');
      filter_div.classList.toggle('hidden');
    },
  }
};
</script>
