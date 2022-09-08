<template>
  <div id="page" class="flex flex-col h-screen overflow-scroll">
    <Navbar :showMenu.sync="showMenu"/>
    <div class="md:hidden opacity-60 bg-black absolute inset-0" v-if="showMenu"></div>

    <!-- contact -->
    <main class="flex-grow">
      <section id="contact" class="py-16 m-auto max-w-6xl px-6 bg-primary">
        <div class="text-center">
          <h1
            class="text-4xl font-bold text-center w-full leading-tight"
          >
            Contact
          </h1>
          <p class="text-center">Reach out to me</p>
        </div>
        <form action="" class="w-10/12 m-auto">
          <label for="name" class="font-bold text-sm">Name</label><br />
          <input type="text" id="name" class="border-2 w-full h-12 mb-4" v-model="form.name" /><br />

          <label for="email" class="font-bold text-sm">E-mail address</label><br />
          <input type="text" id="email" class="border-2 w-full h-12 mb-4" v-model="form.email" /><br />

          <label for="subject" class="font-bold text-sm">Subject</label><br />
          <input type="text" id="subject" class="border-2 w-full h-12 mb-4" v-model="form.subject" /><br />

          <label for="message" class="font-bold text-sm">Message</label><br />
          <textarea
            name="message"
            id="message"
            rows="10"
            class="border-2 w-full mb-12"
            v-model="form.message"
          ></textarea>
          <br />
          <div class="w-full flex items-center justify-center">
            <input type="submit" value="Send" class="max-w-sm w-full m-auto py-4">
          </div>
        </form>
      </section>

      <!-- Debug -->
      <div class="max-w-6xl m-auto">
        <h3 class="text-2xl">Form Data</h3>
        <p>name: {{form.name}}</p>
        <p>email: {{form.email}}</p>
        <p>subject: {{form.subject}}</p>
        <p class="whitespace-pre-line">message: {{form.message}}</p>
      </div>
      <!-- /Debug -->
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
