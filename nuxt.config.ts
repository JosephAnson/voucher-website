import {
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineNuxtConfig({
  app: {
    head: {
      title: '[REPLACE]: App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: '[REPLACE]: new app descript',
        },
      ],
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  css: ['~/assets/styles/main.scss'],
  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
      {
        code: 'nl',
        file: 'nl.json',
      },
    ],
    lazy: true,
    langDir: 'lang',
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxt/devtools',
    '@nuxtjs/i18n',
    '@nuxt/image-edge',
    '@unocss/nuxt',
    'nuxt-simple-sitemap',
    '@nuxtjs/eslint-module',
    '@nuxtjs/web-vitals',
    '@nuxtjs/robots',
    'nuxt-schema-org',
    '@unlighthouse/nuxt',
    'nuxt-og-image',
  ],
  plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],
  srcDir: 'src/',
  unocss: {
    presets: [
      presetWind({
        dark: 'class',
      }),
      presetIcons(),
      presetTypography(),
      presetWebFonts({
        provider: 'google',
        fonts: {
          sans: ['Montserrat:400,700', 'Source Sans Pro'],
        },
      }),
    ],
    theme: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
        },
      },
      colors: {
        primary: {
          DEFAULT: '#020816',
          100: '#0f399c',
          200: '#0d338b',
          300: '#0c2d7b',
          400: '#0a276a',
          500: '#09215a',
          600: '#071b49',
          700: '#051539',
          800: '#040f28',
          900: '#020816',
        },
      },
    },
    transformers: [transformerDirectives(), transformerVariantGroup()],
    safelist: 'text-l text-xl text-2xl'.split(' '),
  },
  webVitals: {
    provider: 'vercel',
  },
  image: {
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536,
    },
  },
  ogImage: {
    fonts: ['Source Sans Pro:400', 'Montserrat:700'],
  },
})
