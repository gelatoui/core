/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ReactNode } from 'react'

import { GluFlex, GluText } from '@gelato-ui/react'
import LinkItem from '@theme/Footer/LinkItem'
import type { Props } from '@theme/Footer/Links/MultiColumn'

type ColumnType = Props['columns'][number]

type ColumnItemType = ColumnType['items'][number]

const ColumnLinkItem = ({ item }: { item: ColumnItemType }) => (
  <GluFlex style={{ padding: 'var(--Spacing-100, 0.5rem) var(--Spacing-200, 1rem)' }} key={item.href ?? item.to}>
    <GluText type="body" size="small" weight="regular">
      <LinkItem item={item} />
    </GluText>
  </GluFlex>
)

const Column = ({ column }: { column: ColumnType }) => (
  <GluFlex direction="column" align="flex-start">
    <GluText type="body" size="large" weight="medium" style={{ padding: 'var(--Spacing-100, 0.5rem) var(--Spacing-200, 1rem)' }}>
      {column.title}
    </GluText>
    <GluFlex direction="column">
      {column.items.map((item, i) => (
        <ColumnLinkItem key={i} item={item} />
      ))}
    </GluFlex>
  </GluFlex>
)

const FooterLinksMultiColumn = ({ columns }: Props): ReactNode => (
  <GluFlex gap={500} align="flex-start">
    {columns.map((column, i) => (
      <Column key={i} column={column} />
    ))}
  </GluFlex>
)

export default FooterLinksMultiColumn
