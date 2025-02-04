// @ts-check
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupConfigRules, includeIgnoreFile } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import { ConfigOption, eslintConfig, OptionalOption } from '@santi020k/eslint-config-santi020k'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')
const flatCompat = new FlatCompat()

export default [
  includeIgnoreFile(gitignorePath),
  ...fixupConfigRules(flatCompat.plugins('@stencil-community')),
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
