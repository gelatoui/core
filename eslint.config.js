// @ts-check

import { ConfigOption, eslintConfig, OptionalOption, SettingOption } from '@santi020k/eslint-config-santi020k'

export default [
  ...eslintConfig({
    config: [ConfigOption.Ts],
    optionals: [
      OptionalOption.Cspell,
      OptionalOption.Vitest,
      OptionalOption.Stencil,
      OptionalOption.Mdx,
      OptionalOption.Markdown
    ],
    settings: [SettingOption.Gitignore]
  }),
  {
    name: 'custom rules',
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@stylistic/lines-around-comment': ['error', { allowClassStart: true, beforeLineComment: false, allowBlockStart: true }]
    }
  }
]
