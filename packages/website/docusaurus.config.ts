import { themes as prismThemes } from 'prism-react-renderer'
import { remarkSandpack } from 'remark-sandpack'

import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Gelato UI',
  tagline: 'Design System that fits every tech stack',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://gelato-ui.com',

  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'gelato-ui', // Usually your GitHub org/user name.
  projectName: 'gelato-ui', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      }
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        crossorigin: 'anonymous',
        href: 'https://fonts.gstatic.com'
      }
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap'
      }
    }
  ],

  markdown: {
    mermaid: true
  },

  plugins: ['@docusaurus/theme-live-codeblock', '@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          sidebarCollapsed: false,
          editUrl:
            'https://github.com/gelatoui/core/tree/main/packages/website/',
          beforeDefaultRemarkPlugins: [remarkSandpack]
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true
          },
          editUrl:
            'https://github.com/gelatoui/core/tree/main/packages/website/',

          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn'
        },
        theme: {
          customCss: './src/css/custom.css'
        }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    mermaid: {
      theme: { light: 'neutral', dark: 'forest' }
    },

    // Replace with your project's social card
    liveCodeBlock: {
      playgroundPosition: 'top'
    },
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Gelato UI',
      // TODO: Logo is not ready yet
      // logo: {
      //   alt: 'Gelato UI Logo',
      //   src: 'img/logo.svg'
      // },
      items: [
        // TODO: We just have one version for now
        // {
        //   type: 'docsVersionDropdown'
        // },
        {
          to: '/docs/category/components', label: 'Components', position: 'left'
        },
        {
          type: 'docSidebar',
          sidebarId: 'documentationSidebar',
          position: 'left',
          label: 'Docs'
        },
        { to: '/templates', label: 'templates', position: 'left' },
        {
          href: '/docs/category/getting-started',
          label: 'Get Started',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Company',
          items: [
            {
              label: 'About Us',
              to: '/#about'
            },
            {
              label: 'Careers',
              to: '/#careers'
            }
          ]
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Components',
              to: '/docs/category/components'
            },
            {
              label: 'Doc',
              to: '/#doc'
            }
          ]
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Terms of service',
              to: '/#terms'
            },
            {
              label: 'Privacy Policy',
              to: '/#privacy'
            }
          ]
        },
        {
          title: 'Contact',
          items: [
            {
              label: 'Support',
              to: '/#support'
            },
            {
              label: 'Sales',
              to: '/#sales'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Gelato UI. Built with Docusaurus.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    }
  } satisfies Preset.ThemeConfig
}

export default config
