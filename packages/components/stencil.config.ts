import { Config } from '@stencil/core'
import { OutputTarget } from '@stencil/core/internal'
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
      hydrateModule: '@gelato-ui/hydrate'
    }) as unknown as OutputTarget,
    {
      type: 'dist-hydrate-script',
      dir: './../hydrate'
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
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  testing: {
    browserHeadless: 'shell'
  }
}
