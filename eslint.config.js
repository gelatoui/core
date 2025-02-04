// @ts-check
import { ConfigOption, eslintConfig, OptionalOption } from '@santi020k/eslint-config-santi020k'

export default [
  {
    name: 'ignore-local',
    ignores: ['dist/']
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
