import {
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Discover the latest voucher codes, discounts and promo codes for your favorite online stores at VouchersDiscountsCodes. Get huge savings on fashion, beauty, home decor, electronics and more. Start saving today!',
        },
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
    '@nuxtjs/eslint-module',
    '@nuxtjs/robots',
    '@nuxtjs/supabase',
    // '@nuxtjs/html-validator',
    '@nuxt/image-edge',
    '@nuxt/devtools',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@unlighthouse/nuxt',
    '@vee-validate/nuxt',
    'nuxt-simple-sitemap',
    'nuxt-schema-org',
    'nuxt-og-image',
    'nuxt-typed-router',
    'nuxt-scheduler',
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
          sans: ['DM Sans:400,500,700'],
          serif: ['DM Serif Display:400,500,700'],
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
          DEFAULT: '#2E51FF',
          50: '#F5F7FF',
          100: '#E5EAFF',
          200: '#CCD5FF',
          300: '#ADBBFF',
          400: '#8095FF',
          500: '#4766FF',
          600: '#2E51FF',
          700: '#1A40FF',
          800: '#0026E6',
          900: '#001DAD',
          950: '#00147A',
        },
        secondary: {
          DEFAULT: '#8FADFF',
          50: '#F5F8FF',
          100: '#F0F4FF',
          200: '#E0E9FF',
          300: '#D1DDFF',
          400: '#BDCEFF',
          500: '#A9C0FF',
          600: '#8FADFF',
          700: '#7096FF',
          800: '#4275FF',
          900: '#0043FA',
          950: '#002EAD',
        },
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.5rem' }],
        'base': ['1rem', { lineHeight: '1.75rem' }],
        'lg': ['1.125rem', { lineHeight: '2rem' }],
        'xl': ['1.25rem', { lineHeight: '2rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['2rem', { lineHeight: '2.5rem' }],
        '4xl': ['2.5rem', { lineHeight: '3.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      extend: {
        borderRadius: {
          '4xl': '2rem',
        },
        fontFamily: {
          sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
        },
        maxWidth: {
          '2xl': '40rem',
        },
      },
    },
    transformers: [transformerDirectives(), transformerVariantGroup()],
    safelist: 'text-l text-xl text-2xl'.split(' '),
    preflights: [{
      layer: '_forms_css',
      getCSS: ({ theme }: { theme: { colors: Record<string, Record<number, string>> } } & any) => {
        const encodeSvg = (svg: string) => {
          return `data:image/svg+xml,${svg
              .replace('<svg', (~svg.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"'))
              .replace(/"/g, '\'')
              .replace(/%/g, '%25')
              .replace(/#/g, '%23')
              .replace(/{/g, '%7B')
              .replace(/}/g, '%7D')
              .replace(/</g, '%3C')
              .replace(/>/g, '%3E')}`
        }

        const gray = theme?.colors?.gray?.[500] ?? '#6b7280'
        const blue = theme?.colors?.blue?.[600] ?? '#2563eb'
        const borderRadius = { none: 'none' }
        const borderWidth = { DEFAULT: '1px' }
        const baseFontSize = '1rem'
        const baseLineHeight = '1.5rem'

        const spacing = {
          2: '0.5rem',
          3: '0.75rem',
          4: '1rem',
          10: '2.5rem',
        }

        const rules = [
          {
            base: [
              '[type=\'text\']',
              '[type=\'email\']',
              '[type=\'url\']',
              '[type=\'password\']',
              '[type=\'number\']',
              '[type=\'date\']',
              '[type=\'datetime-local\']',
              '[type=\'month\']',
              '[type=\'search\']',
              '[type=\'tel\']',
              '[type=\'time\']',
              '[type=\'week\']',
              '[multiple]',
              'textarea',
              'select',
            ],
            styles: {
              'appearance': 'none',
              'background-color': '#fff',
              'border-color': gray,
              'border-width': borderWidth.DEFAULT,
              'border-radius': borderRadius.none,
              'padding-top': spacing[2],
              'padding-right': spacing[3],
              'padding-bottom': spacing[2],
              'padding-left': spacing[3],
              'font-size': baseFontSize,
              'line-height': baseLineHeight,
              '--un-shadow': '0 0 #0000',
            },
          },
          {
            base: [
              '[type=\'text\']:focus',
              '[type=\'email\']:focus',
              '[type=\'url\']:focus',
              '[type=\'password\']:focus',
              '[type=\'number\']:focus',
              '[type=\'date\']:focus',
              '[type=\'datetime-local\']:focus',
              '[type=\'month\']:focus',
              '[type=\'search\']:focus',
              '[type=\'tel\']:focus',
              '[type=\'time\']:focus',
              '[type=\'week\']:focus',
              '[multiple]:focus',
              'textarea:focus',
              'select:focus',
            ],
            styles: {
              'outline': '2px solid transparent',
              'outline-offset': '2px',
              '--un-ring-inset': 'var(--un-empty,/*!*/ /*!*/)',
              '--un-ring-offset-width': '0px',
              '--un-ring-offset-color': '#fff',
              '--un-ring-color': blue,
              '--un-ring-offset-shadow': 'var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color)',
              '--un-ring-shadow': 'var(--un-ring-inset) 0 0 0 calc(1px + var(--un-ring-offset-width)) var(--un-ring-color)',
              'box-shadow': 'var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)',
              'border-color': blue,
            },
          },
          {
            base: ['input::placeholder', 'textarea::placeholder'],
            styles: {
              color: gray,
              opacity: '1',
            },
          },
          {
            base: ['::-webkit-datetime-edit-fields-wrapper'],
            styles: {
              padding: '0',
            },
          },
          {
            // Unfortunate hack until https://bugs.webkit.org/show_bug.cgi?id=198959 is fixed.
            // This sucks because users can't change line-height with a utility on date inputs now.
            // Reference: https://github.com/twbs/bootstrap/pull/31993
            base: ['::-webkit-date-and-time-value'],
            styles: {
              'min-height': '1.5em',
            },
          },
          {
            // In Safari on macOS date time inputs are 4px taller than normal inputs
            // This is because there is extra padding on the datetime-edit and datetime-edit-{part}-field pseudo elements
            // See https://github.com/tailwindlabs/tailwindcss-forms/issues/95
            base: [
              '::-webkit-datetime-edit',
              '::-webkit-datetime-edit-year-field',
              '::-webkit-datetime-edit-month-field',
              '::-webkit-datetime-edit-day-field',
              '::-webkit-datetime-edit-hour-field',
              '::-webkit-datetime-edit-minute-field',
              '::-webkit-datetime-edit-second-field',
              '::-webkit-datetime-edit-millisecond-field',
              '::-webkit-datetime-edit-meridiem-field',
            ],
            styles: {
              'padding-top': '0',
              'padding-bottom': '0',
            },
          },
          {
            base: ['select'],
            styles: {
              'background-image': `url("${encodeSvg(
                  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${
                      gray
                  }" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`,
              )}")`,
              'background-position': `right ${spacing[2]} center`,
              'background-repeat': 'no-repeat',
              'background-size': '1.5em 1.5em',
              'padding-right': spacing[10],
              'print-color-adjust': 'exact',
            },
          },
          {
            base: ['[multiple]'],
            styles: {
              'background-image': 'initial',
              'background-position': 'initial',
              'background-repeat': 'unset',
              'background-size': 'initial',
              'padding-right': spacing[3],
              'print-color-adjust': 'unset',
            },
          },
          {
            base: ['[type=\'checkbox\']', '[type=\'radio\']'],
            styles: {
              'appearance': 'none',
              'padding': '0',
              'print-color-adjust': 'exact',
              'display': 'inline-block',
              'vertical-align': 'middle',
              'background-origin': 'border-box',
              'user-select': 'none',
              'flex-shrink': '0',
              'height': spacing[4],
              'width': spacing[4],
              'color': blue,
              'background-color': '#fff',
              'border-color': gray,
              'border-width': borderWidth.DEFAULT,
              '--un-shadow': '0 0 #0000',
            },
          },
          {
            base: ['[type=\'checkbox\']'],
            styles: {
              'border-radius': borderRadius.none,
            },
          },
          {
            base: ['[type=\'radio\']'],
            styles: {
              'border-radius': '100%',
            },
          },
          {
            base: ['[type=\'checkbox\']:focus', '[type=\'radio\']:focus'],
            styles: {
              'outline': '2px solid transparent',
              'outline-offset': '2px',
              '--un-ring-inset': 'var(--un-empty,/*!*/ /*!*/)',
              '--un-ring-offset-width': '2px',
              '--un-ring-offset-color': '#fff',
              '--un-ring-color': blue,
              '--un-ring-offset-shadow': 'var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color)',
              '--un-ring-shadow': 'var(--un-ring-inset) 0 0 0 calc(2px + var(--un-ring-offset-width)) var(--un-ring-color)',
              'box-shadow': 'var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)',
            },
          },
          {
            base: ['[type=\'checkbox\']:checked', '[type=\'radio\']:checked'],
            styles: {
              'border-color': 'transparent',
              'background-color': 'currentColor',
              'background-size': '100% 100%',
              'background-position': 'center',
              'background-repeat': 'no-repeat',
            },
          },
          {
            base: ['[type=\'checkbox\']:checked'],
            styles: {
              'background-image': `url("${encodeSvg(
                  '<svg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>',
              )}")`,
            },
          },
          {
            base: ['[type=\'radio\']:checked'],
            styles: {
              'background-image': `url("${encodeSvg(
                  '<svg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="3"/></svg>',
              )}")`,
            },
          },
          {
            base: [
              '[type=\'checkbox\']:checked:hover',
              '[type=\'checkbox\']:checked:focus',
              '[type=\'radio\']:checked:hover',
              '[type=\'radio\']:checked:focus',
            ],
            styles: {
              'border-color': 'transparent',
              'background-color': 'currentColor',
            },
          },
          {
            base: ['[type=\'checkbox\']:indeterminate'],
            styles: {
              'background-image': `url("${encodeSvg(
                  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h8"/></svg>',
              )}")`,
              'border-color': 'transparent',
              'background-color': 'currentColor',
              'background-size': '100% 100%',
              'background-position': 'center',
              'background-repeat': 'no-repeat',
            },
          },
          {
            base: ['[type=\'checkbox\']:indeterminate:hover', '[type=\'checkbox\']:indeterminate:focus'],
            styles: {
              'border-color': 'transparent',
              'background-color': 'currentColor',
            },
          },
          {
            base: ['[type=\'file\']'],
            styles: {
              'background': 'unset',
              'border-color': 'inherit',
              'border-width': '0',
              'border-radius': '0',
              'padding': '0',
              'font-size': 'unset',
              'line-height': 'inherit',
            },
          },
          {
            base: ['[type=\'file\']:focus'],
            styles: {
              outline: [
                '1px solid ButtonText',
                '1px auto -webkit-focus-ring-color',
              ],
            },
          },
        ]

        return rules.map(({ base, styles }) => {
          const s = base.join(',')
          const d = Object.entries(styles).map(
            ([k, values]) => (Array.isArray(values) ? values : [values]).map(v => `${k}:${v}`),
          ).flat(1).join(';')
          return `${s}{${d}}`
        }).join('\n')
      },
    },
    ],
  },
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
  ogImage: {
    fonts: ['DM+Serif+Display:400', 'DM+Sans:400'],
  },
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  imports: {
    dirs: ['services', 'store'],
  },
  htmlValidator: {
    usePrettier: false,
    logLevel: 'verbose',
    failOnError: false,
  },
})
