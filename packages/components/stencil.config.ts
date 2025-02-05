import { Config } from '@stencil/core'
import { reactOutputTarget } from '@stencil/react-output-target'

export const config: Config = {
  namespace: 'components',
  globalStyle: 'src/global/global.css',
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
      type: 'docs-readme'
    },
    {
      type: 'docs-vscode',
      file: 'dist/html.html-data.json'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  testing: {
    browserHeadless: 'shell'
  }
}
