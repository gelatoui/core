import type { ReactNode } from 'react'

import '@gelato-ui/components/glu.css'

import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { defineCustomElements } from '@gelato-ui/components/loader'
import { GluFlex } from '@gelato-ui/react'
import Layout from '@theme/Layout'

defineCustomElements()

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      title={`Templates | ${siteConfig.title}`}
      description="Web Components UI library Monorepo"
    >
      <main>
        <GluFlex direction="column" gap={1000} isCenter style={{ minHeight: 'calc(100vh - 77px - 209px)' }}>
          <GluFlex direction="column" gap={500}>
            <h1>Templates</h1>
          </GluFlex>
        </GluFlex>
      </main>
    </Layout>
  )
}
