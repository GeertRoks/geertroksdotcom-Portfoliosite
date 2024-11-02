
export default defineNuxtConfig({
  // Target: https://go.nuxtjs.dev/config-target
  devtools: { enabled: true },
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Portfolio Geert Roks",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  runtimeConfig: {
    public: {
      assets_server: process.env.STATIC_ASSETS_SERVER_URL,
      enable_contact: process.env.ENABLE_CONTACT != undefined ? process.env.ENABLE_CONTACT.toLowerCase() === 'true' : false,
      enable_blog: process.env.ENABLE_BLOG != undefined ? process.env.ENABLE_BLOG.toLowerCase() === 'true' : false,
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  //plugins: [
  //  {src: '~/plugins/formatDate.js', mode:'client'}
  //],

  // Auto import components: https://go.nuxtjs.dev/config-components
  //components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  //buildModules: [
  //  // https://go.nuxtjs.dev/tailwindcss
  //  "@nuxtjs/tailwindcss",
  //],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    "@nuxt/image",
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    nestedProperties: ["project.tags"],
    markdown: {
      anchorLinks: false,
      mdc: true,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
})
