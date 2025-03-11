import styles from './header.module.css'

import useBaseUrl from '@docusaurus/useBaseUrl'
import { GluButton, GluFlex, GluIcon, GluText } from '@gelato-ui/react'

export const Header = () => (
  <header>
    <GluFlex className={styles.header} direction="column" isCenter gap={1000}>
      <GluFlex direction="column" isCenter gap={700}>
        <GluFlex direction="column" gap={400} isCenter>
          <GluFlex direction="column" gap={100} isCenter>
            <GluText element="h3" className={styles.subtitle} type="heading" size="large" weight="medium">
              Framework-agnostic
            </GluText>

            <GluText element="h1" type="display" size="medium" weight="bold" className={styles.title} align="center">
              Design System
              <GluFlex element="span">
                that
                {' '}
                <span className={styles['title-highline']}>fits every tech stack</span>
              </GluFlex>
            </GluText>
          </GluFlex>

          <GluText element="p" type="body" size="large" weight="regular" className={styles.description} align="center">
            Brings design and development together with Framework-agnostic web components
            and Figma components that work anywhere.
          </GluText>
        </GluFlex>
        <GluFlex isCenter>
          <GluButton size="large">
            Explore Components
            <GluIcon slot="end" name="bookmark-square" size={18} />
          </GluButton>
        </GluFlex>
      </GluFlex>
      <div>
        <img className={styles.img} src={useBaseUrl('/img/home/screen.jpg')} alt="screen" />
      </div>
    </GluFlex>
  </header>
)
