import styles from './cards.module.css'

import { GluFlex, GluIcon, GluText } from '@gelato-ui/react'

export const Cards = () => (
  <section>
    <GluFlex isCenter className={styles.container} gap={500}>
      {/* TODO: Probably should be refactor to a card component */}
      <GluFlex direction="column" gap={250} className={styles['card-container']}>
        <GluFlex direction="column" isCenter gap={150}>
          <GluIcon name="archive-box-arrow-down" size="2rem" />
          <GluText type="heading" size="small" weight="medium">
            Speedy Handoff
          </GluText>
        </GluFlex>
        <GluText type="body" size="medium" weight="regular">
          Turn designs into production-ready components without the usual headaches.
        </GluText>
      </GluFlex>

      <GluFlex direction="column" gap={250} className={styles['card-container']}>
        <GluFlex direction="column" isCenter gap={150}>
          <GluIcon name="archive-box-arrow-down" size="2rem" />
          <GluText type="heading" size="small" weight="medium">
            Good documentation
          </GluText>
        </GluFlex>
        <GluText type="body" size="medium" weight="regular">
          Explore and test components interactively in our live documentation.
        </GluText>
      </GluFlex>

      <GluFlex direction="column" gap={250} className={styles['card-container']}>
        <GluFlex direction="column" isCenter gap={150}>
          <GluIcon name="archive-box-arrow-down" size="2rem" />
          <GluText type="heading" size="small" weight="medium">
            Modular Design, Maximum Creativity
          </GluText>
        </GluFlex>
        <GluText type="body" size="medium" weight="regular">
          Build consistent, reusable designs using our Atomic Design-powered Figma components.
        </GluText>
      </GluFlex>

      <GluFlex direction="column" gap={250} className={styles['card-container']}>
        <GluFlex direction="column" isCenter gap={150}>
          <GluIcon name="archive-box-arrow-down" size="2rem" />
          <GluText type="heading" size="small" weight="medium">
            Framework-Agnostic Components
          </GluText>
        </GluFlex>
        <GluText type="body" size="medium" weight="regular">
          Use our web components with any tech stack, no rewrites needed.
        </GluText>
      </GluFlex>
    </GluFlex>
  </section>
)
