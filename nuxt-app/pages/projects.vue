<template>
  <!-- projects -->
  <main class="flex-grow">
    <section class="py-16 m-auto max-w-6xl">
      <h1 class="text-4xl font-bold mb-8 mx-2">All Projects</h1>
      <div class="px-6 py-4">
        <div class="flex justify-end">
          <div @click="showFilterDropdown = !showFilterDropdown" class="flex flex-row items-center gap-3 w-fit p-1 cursor-pointer">
            <p>
            filter
            </p>
            <svg fill="#000000" height="1.125rem" width="1.125rem" class="mb-1 transition-transform duration-300 ease-out" :class="{ 'rotate-180': showFilterDropdown }" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_102_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"></path> </g></svg>
          </div>
        </div>

        <transition name="tagFilter" mode="out-in">
        <!-- Todo: add transition style -->
          <ul v-if="showFilterDropdown" class="flex flex-row flex-wrap justify-center gap-2 mb-2">
          <Tag
            v-for="tag of tags"
            :key="tag"
            :tag="tag"
            :highlight="isTagFiltered(tag)"
            clickable
            @click="toggleFilter(tag)"
            />
          </ul>
        </transition>
      </div>
      <LoadingComponent v-if="isLoading" />
      <ProjectGrid v-else :projects="filteredProjects" :selectedTag="selectedTag" class="sm:mx-2" />
      <!-- -->
    </section>
  </main>

</template>

<script setup lang="ts">
  const route = useRoute();
  const router = useRouter();

  // Fetch all projects
  const showDrafts = import.meta.env.DEV;
  const statusList = showDrafts ? ['publish', 'draft'] : ['publish'];
  const isLoading = ref(true);

  const { data: projects } = await useAsyncData(
    'projects', () => queryContent('/project')
    .where({status: { $in: statusList }})
    .only(['_path', 'title', 'date', 'description', 'tags', 'image'])
    .sort({ date: -1})
    .find()
  );
  watch(projects, (newProjects) => {
    isLoading.value = false;
  }, { immediate: true});

  // Get all unique tags from the projects and sort alphabetically
  const tags = computed(() => {
    return Array.from(new Set(projects.value.flatMap(p => p.tags))).sort((a, b) => a.localeCompare(b));
  });

  // Filter dropdown menu
  const showFilterDropdown = ref(false);
  const selectedTag = ref<string | null>(route.query.tag);

  // Flag to track whether a tag is currently filtered
  const isTagFiltered = (tag: string) => {
    return selectedTag.value === tag;
  };
  // Method to handle button click
  const toggleFilter = (tag: string) => {
    selectedTag.value = isTagFiltered(tag) ? null : tag;

    // Update URL with selected tag
    if (selectedTag.value) {
      router.push({
        query: { ...route.query, tag }
      });
    } else {
      const queryParams = { ...route.query };
      delete queryParams.tag;
      router.replace({ query: queryParams });
    }
  };

  // Filter projects based on the selected tag
  const filteredProjects = computed(() => {
    if (!selectedTag.value) return projects.value;
    return projects.value.filter(project =>
      project.tags.includes(selectedTag.value)
    );
  });

  watchEffect(() => {
    const newQuery = route.query;

    // Check for specific query parameters
    if (newQuery.tag) {
      selectedTag.value = newQuery.tag;
    } else {
      selectedTag.value = null;
    }
  });

  const clickableTag = true;
</script>

<style scoped>
.tagFilter-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.tagFilter-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.tagFilter-leave-active,
.tagFilter-enter-active {
  transition: all 0.2s;
}
</style>
