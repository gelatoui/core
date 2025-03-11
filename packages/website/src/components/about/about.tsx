import styles from './about.module.css'

import useBaseUrl from '@docusaurus/useBaseUrl'
import { GluButton, GluFlex, GluIcon, GluText } from '@gelato-ui/react'

export const About = () => (
  <GluFlex className={styles.background} direction="column" gap={1000}>

    {/* Frameworks section */}
    <section className={styles['container-frameworks']}>
      <GluFlex className={styles.content} align="center" justify="space-between" gap="inherit">
        <GluFlex className={styles.copies} direction="column" gap={800}>
          <GluFlex direction="column" gap={500}>
            <GluText element="h2" type="display" size="small" weight="bold" color="var(--root-base-white)">
              No more rigid design systems tied to specific tools or frameworks.
            </GluText>
            <GluText element="p" type="body" size="large" weight="regular" color="var(--root-base-white)">
              With a focus on flexibility and collaboration,
              Gelato UI empowers teams to create amazing products without limitations.
            </GluText>
          </GluFlex>
          <GluFlex justify="flex-start">
            <GluButton size="large" href="#" appearance="outline" style={{ background: 'var(--root-base-white)' }}>
              Learn More
              <GluIcon slot="end" name="arrow-up-right" size={18} />
            </GluButton>
          </GluFlex>
        </GluFlex>
        <GluFlex className={styles.frameworks} isCenter>
          <img src={useBaseUrl('/img/home/frameworks.png')} alt="react" />
        </GluFlex>
      </GluFlex>
    </section>

    {/* Figma section */}
    <section className={styles['container-figma']}>
      <GluFlex className={styles.content} align="center" justify="space-between" gap="inherit">
        <GluFlex className={styles.figma} isCenter>
          <img src={useBaseUrl('/img/home/figma.png')} alt="react" />
        </GluFlex>
        <GluFlex className={styles.copies} direction="column" gap={800}>
          <GluFlex direction="column" gap={500}>
            <GluText element="h2" type="display" size="small" weight="bold" color="var(--root-base-white)">
              From Figma Designs to Pixel-Perfect Code Components
            </GluText>
            <GluText element="p" type="body" size="large" weight="regular" color="var(--root-base-white)">
              Bridging the gap between design and development with
              a Figma design system that mirrors our web components down to the last pixel.
            </GluText>
          </GluFlex>
          <GluFlex justify="flex-start">
            <GluButton size="large" href="#" appearance="outline" style={{ background: 'var(--root-base-white)' }}>
              Explore Components Library
              <GluIcon slot="end" name="arrow-up-right" size={18} />
            </GluButton>
          </GluFlex>
        </GluFlex>
      </GluFlex>
    </section>
  </GluFlex>
)
