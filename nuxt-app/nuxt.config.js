import tailwindcssTypography from '@tailwindcss/typography'

export default defineNuxtConfig({
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "test-app",
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
      tailwindcss: {
        config: {
          plugins: [
            tailwindcssTypography,
          ],
          content: [
            "./components/**/*.{js,vue,ts}",
            "./layouts/**/*.vue",
            "./pages/**/*.vue",
            "./plugins/**/*.{js,ts}",
            "./nuxt.config.{js,ts}",
            "./app.vue"
          ],
          theme: {
            colors: {
              'primary': {
                50:  '#FFF9EB',
                100: '#FFEDC2',
                200: '#FFE099',
                300: '#FFD470',
                400: '#FFC847',
                500: '#FFC030',
                600: '#FFB60A',
                700: '#F5AB00',
                800: '#CC8F00',
                900: '#A37200'
              },
              'accent': {
                50:  '#B9D1DF',
                100: '#9CBFD3',
                200: '#80ADC6',
                300: '#649AB9',
                400: '#5691B3',
                500: '#4C87A9',
                600: '#467C9B',
                700: '#39657F',
                800: '#2C4F63',
                900: '#203846'
              },
              'white': '#FFFFFF',
              'black': '#1C1C1C',
              'gray': {
                50:  '#f9fafb',
                100: '#f3f4f6',
                200: '#e5e7eb',
                300: '#d1d5db',
                400: '#9ca3af',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#1f2937',
                900: '#111827'
              }
            },
            extend: {},
          },
        },
      },
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
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
  ],

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
