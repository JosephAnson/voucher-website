import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    unocss: true,
    typescript: {
      tsconfigPath: 'tsconfig.json',
    },
  },
)
