import type { ReactNode } from 'react'

import '@gelato-ui/components/glu.css'

import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { defineCustomElements } from '@gelato-ui/components/loader'
import { About } from '@site/src/components/about/about'
import { Cards } from '@site/src/components/cards/cards'
import { Header } from '@site/src/components/header/header'
import Layout from '@theme/Layout'

defineCustomElements()

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      title={`Home | ${siteConfig.title}`}
      description="Web Components UI library Monorepo"
    >
      <Header />
      <main>
        <About />
        <Cards />
      </main>
    </Layout>
  )
}
