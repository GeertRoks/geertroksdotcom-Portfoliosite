<template>
  <main class="flex-grow">
    <!-- About quick view -->
    <section class="bg-primary-500 py-8 md:py-16">
      <div
        class="m-auto max-w-6xl px-6 md:pl-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
      >
        <ContentRenderer :value="about">
	        <div class="md:my-auto md:pr-16 lg:col-span-3">

            <h4 class="font-semibold text-md"> Hi, my name is </h4>
            <h1 class="text-5xl pb-3 font-bold w-full leading-tight lg:text-6xl md:text-left md:py-4">
              {{ about.name }}
            </h1>
            <h2 class="text-2xl pb-3 font-bold w-full leading-tight lg:text-3xl md:text-left md:py-4">
              {{ about.subtitle }}
            </h2>

            <ContentRendererMarkdown :value="about" class="mb-4" />

            <div class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
              <NuxtLink to="/projects" class="btn btn-primary">Projects</NuxtLink>
              <NuxtLink to="/contact" v-if="config.enable_contact" class="btn btn-secondary">Contact me</NuxtLink>
            </div>
          </div>
        </ContentRenderer>
        <NuxtImg :src="about.image"
          alt="picture of me"
          class="w-8/12 sm:w-6/12 order-first m-auto md:order-none md:w-full aspect-square object-contain mb-7 md:p-10 md:my-auto lg:col-span-2"
        />
      </div>
    </section>

    <!-- Projects quick view -->
    <section class="py-8 m-auto md:py-16 max-w-6xl">

      <h1 class="text-4xl font-bold mb-8 mx-2">Featured Projects</h1>
      <ProjectGrid :projects="featured_projects" class="sm:mx-2 mb-8" />

      <div class="w-full flex items-center justify-center">
        <NuxtLink
          class="btn btn-large btn-primary"
          to="/projects"
        >
          See more
        </NuxtLink>
      </div>
    </section>
  </main>

</template>

<script setup>
  const config = useRuntimeConfig();
  const showDrafts = import.meta.env.DEV;
  const statusList = showDrafts ? ['publish', 'draft'] : ['publish'];

  const { data: featured_projects } = await useAsyncData(
    'featured_projects', () => queryContent('/project')
    .where({ featured: true, status: { $in: statusList } })
    .limit(6)
    .only(['_path', 'title', 'date', 'description', 'tags', 'image'])
    .sort({ date: -1})
    .find()
  )
  const { data: about } = await useAsyncData(
    'about', () => queryContent('/')
    .where({title: "About"})
    .findOne()
  )
</script>
