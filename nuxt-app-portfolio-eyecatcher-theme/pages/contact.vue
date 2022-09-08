<template>
  <div id="page" class="flex flex-col h-screen overflow-scroll">
    <Navbar :showMenu.sync="showMenu"/>
    <div class="md:hidden opacity-60 bg-black absolute inset-0" v-if="showMenu"></div>

    <!-- contact -->
    <main class="flex-grow">
      <section id="contact" class="py-16 m-auto max-w-6xl px-6">
        <h1
          class="text-4xl font-bold text-center w-full leading-tight md:text-left"
        >
          Contact
        </h1>
        <p>Reach out to me</p>
        <form action="">
          <label for="name">Name</label><br />
          <input type="text" id="name" class="border-2 w-full h-12" /><br />

          <label for="email">E-mail address</label><br />
          <input type="text" id="email" class="border-2 w-full h-12" /><br />

          <label for="message">Message</label><br />
          <textarea
            name="message"
            id="message"
            rows="10"
            class="border-2 w-full"
          ></textarea>
          <br />
        </form>
      </section>
      <div class="h-72"></div>
    </main>

    <Footer />
  </div>
</template>

<script>
export default {
  name: "ContactPage",
  data() {
    return {
      showMenu: false
    }
  },
};
</script>
