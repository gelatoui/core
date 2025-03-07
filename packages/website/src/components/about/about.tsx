import styles from './about.module.css'

import useBaseUrl from '@docusaurus/useBaseUrl'
import { GluButton, GluFlex, GluIcon, GluText } from '@gelato-ui/react'

export const About = () => (
  <div className={styles.container}>
    <GluFlex element="section" className={styles.background} direction="column" gap="var(--spacing-1000)">
      <div className={styles.content}>
        <GluFlex direction="column" align="center" justify="space-between" gap="var(--spacing-900) var(--spacing-1000)">
          <GluFlex direction="column" gap="var(--spacing-800)">
            <GluFlex direction="column" gap="var(--spacing-500)">
              <GluText element="h2" type="display" size="small" weight="bold">
                No more rigid design systems tied to specific tools or frameworks.
              </GluText>
              <GluText element="p" type="body" size="large" weight="regular">
                With a focus on flexibility and collaboration,
                Gelato UI empowers teams to create amazing products without limitations.
              </GluText>
            </GluFlex>
            <div>
              <GluButton size="large" href="#" appearance="outline">
                Learn More
                <GluIcon slot="end" name="arrow-right" size={18} />
              </GluButton>
            </div>
          </GluFlex>
          <div>
            <div style={{ background: `url("${useBaseUrl('/img/home/frameworks.png')}") no-repeat center center` }} />
          </div>
        </GluFlex>
      </div>
    </GluFlex>
  </div>
)
