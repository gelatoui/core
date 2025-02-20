import { Config } from '@stencil/core'
import { reactOutputTarget } from '@stencil/react-output-target'

export const config: Config = {
  namespace: 'glu',
  globalStyle: 'src/global/global.css',
  preamble: 'Built with GelatoUI',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    reactOutputTarget({
      outDir: '../react/src/components/',
      hydrateModule: '@gelato-ui/components/hydrate'
    }),
    {
      type: 'dist-hydrate-script'
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false
    },
    {
      type: 'docs-readme',
      strict: true,
      dir: './dist/readme'
    },
    {
      type: 'docs-vscode',
      file: './dist/vscode-data.json'
    },
    {
      type: 'docs-json',
      file: './dist/docs.json'
    },
    {
      type: 'www',
      dir: './dist/www',
      serviceWorker: null // disable service workers
    }
  ],
  testing: {
    browserHeadless: 'shell',
    transform: {
      '^.+\\.js$': 'babel-jest',
      '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub'
    },
    moduleNameMapper: {
      '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub'
    },
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: -10
      }
    }
  }
}
