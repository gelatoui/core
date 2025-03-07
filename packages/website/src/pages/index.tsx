import type { ReactNode } from 'react'

import { About } from '../components/about/about'

import '@gelato-ui/components/glu.css'

import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { defineCustomElements } from '@gelato-ui/components/loader'
import { Header } from '@site/src/components/header/header'
import Layout from '@theme/Layout'

defineCustomElements()

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Header />
      <main>
        <About />
      </main>
    </Layout>
  )
}
