<template>
  <div id="page" class="flex flex-col h-screen overflow-scroll bg-primary">
    <Navbar :showMenu.sync="showMenu"/>
    <div class="md:hidden opacity-60 bg-black absolute inset-0" v-if="showMenu"></div>

    <!-- contact -->
    <main class="flex-grow">
      <section id="contact" class="py-8 bg-white">
        <div class="max-w-6xl m-auto ">
          <div class="px-12 mb-8">
            <h1 class="text-4xl font-bold mb-1 leading-tight">Contact</h1>
            <p class="">Reach out to me</p>
          </div>
          <div class="m-auto bg-primary-500 sm:w-10/12 sm:rounded-md">
            <form action="" class="w-full px-6 sm:px-12 py-6">
              <label for="name" class="font-bold text-sm text-accent-light">Name</label><br />
              <input type="text" id="name" class="w-full h-12 mb-4 border-b-4 bg-transparent border-accent-light active:border-none" v-model="form.name" /><br />

              <label for="email" class="font-bold text-sm">E-mail address</label><br />
              <input type="text" id="email" class="w-full h-12 mb-4 border-b-4 bg-transparent border-accent-light" v-model="form.email" /><br />

              <label for="subject" class="font-bold text-sm">Subject</label><br />
              <input type="text" id="subject" class="w-full h-12 mb-4 border-b-4 bg-transparent border-accent-light" v-model="form.subject" /><br />

              <label for="message" class="font-bold text-sm">Message</label><br />
              <textarea
                name="message"
                id="message"
                rows="5"
                class="w-full mb-12 border-b-4 bg-transparent border-accent-light"
                v-model="form.message"
              ></textarea>
              <br />
              <div class="sm:w-4/12 flex">
                <button class="btn btn-primary">Send</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!--
      <div class="max-w-6xl m-auto">
        <h3 class="text-2xl">Form Data</h3>
        <p>name: {{form.name}}</p>
        <p>email: {{form.email}}</p>
        <p>subject: {{form.subject}}</p>
        <p class="whitespace-pre-line">message: {{form.message}}</p>
      </div>
      -->
    </main>

    <Footer />
  </div>
</template>

<script>
export default {
  name: "ContactPage",
  data() {
    return {
      showMenu: false,
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
};
</script>
