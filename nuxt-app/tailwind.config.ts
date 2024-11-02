import tailwindcssTypography from '@tailwindcss/typography'

export default {
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
  plugins: [
    tailwindcssTypography,
  ],
};
