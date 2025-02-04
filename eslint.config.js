// @ts-check
import { ConfigOption, eslintConfig, OptionalOption } from '@santi020k/eslint-config-santi020k'

export default [
  {
    name: 'ignore-local',
    ignores: [
      '**/packages/components/.stencil/**',
      '**/packages/components/dist/**',
      '**/packages/components/loader/**',
      '**/packages/components/www/**',
      '**/packages/hydrate/**',
      '**/packages/react/**',
      '**/packages/website/.docusaurus/**'
    ]
  },
  ...eslintConfig({
    config: [ConfigOption.Ts],
    optionals: [OptionalOption.Cspell, OptionalOption.Vitest]
  }),
  {
    name: 'custom-local',
    rules: {
      'testing-library/no-dom-import': 'off'
    }
  }
]
