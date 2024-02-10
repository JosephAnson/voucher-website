export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: 'https://www.vouchersdiscountscodes.com',
      siteName: 'Vouchers Discounts Codes',
      siteDescription: 'Discover the latest voucher codes, discounts and promo codes for your favorite online stores at VouchersDiscountsCodes. Get huge savings on fashion, beauty, home decor, electronics and more. Start saving today!',
      language: 'en',
    },
  },
  devtools: true,
  app: {
    head: {
      titleTemplate: (titleChunk: string): string => {
        return titleChunk ? `${titleChunk} - VouchersDiscountsCodes` : 'VouchersDiscountsCodes - Save Big with the Latest Deals and Promo Codes'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'vouchers, discounts, codes, promo codes, online stores, savings, fashion, beauty, home decor, electronics.',
        },
        { name: 'msapplication-TileColor', content: '#da532c' },
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
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
    '@nuxtjs/i18n',
    '@nuxtjs/supabase',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    'nuxt-schema-org',
    'nuxt-scheduler',
  ],
  srcDir: 'src/',
  image: {
    domains: [process.env.SUPABASE_URL as string, 'source.unsplash.com'],
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
  imports: {
    dirs: ['services', 'store'],
  },
  features: {
    inlineStyles: false,
  },
  experimental: {
    typedPages: true,
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [],
    },
    storage: {
      cache: {
        driver: 'redis',
        host: `${process.env.REDIS_HOST}`,
        port: 6379, // Redis port
        username: 'default', // needs Redis >= 6
        password: `${process.env.REDIS_PASSWORD}`,
        db: 3, // Defaults to 0
      },
      data: {
        driver: 'redis',
        host: `${process.env.REDIS_HOST}`,
        port: 6379, // Redis port
        username: 'default', // needs Redis >= 6
        password: `${process.env.REDIS_PASSWORD}`,
        db: 3, // Defaults to 0
      },
    },
    // Development
    devStorage: {
      cache: {
        driver: 'redis',
        host: `${process.env.REDIS_HOST}`,
        port: 6379, // Redis port
        username: 'default', // needs Redis >= 6
        password: `${process.env.REDIS_PASSWORD}`,
        db: 3, // Defaults to 0
      },
      data: {
        driver: 'redis',
        host: `${process.env.REDIS_HOST}`,
        port: 6379, // Redis port
        username: 'default', // needs Redis >= 6
        password: `${process.env.REDIS_PASSWORD}`,
        db: 3, // Defaults to 0
      },
    },
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['*'],
    },
  },
})
