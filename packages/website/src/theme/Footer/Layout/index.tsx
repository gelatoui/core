/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ReactNode } from 'react'

import styles from './Layout.module.css'

import { GluFlex } from '@gelato-ui/react'
import type { Props } from '@theme/Footer/Layout'
import NavbarLogo from '@theme/Navbar/Logo'

export default function FooterLayout({
  links
}: Props): ReactNode {
  return (
    <footer>
      <GluFlex justify="space-between" align="flex-start" className={styles.container}>
        <GluFlex direction="column" align="flex-start" gap={800} justify="space-between">
          <NavbarLogo />
          {/* TODO: In the future the library should support a way to add more icons to the icon component. */}
          <GluFlex gap={100} align="center">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M22 12.4082C22 6.8882 17.52 2.4082 12 2.4082C6.48 2.4082 2 6.8882 2 12.4082C2 17.2482 5.44 21.2782 10 22.2082V15.4082H8V12.4082H10V9.9082C10 7.9782 11.57 6.4082 13.5 6.4082H16V9.4082H14C13.45 9.4082 13 9.8582 13 10.4082V12.4082H16V15.4082H13V22.3582C18.05 21.8582 22 17.5982 22 12.4082Z" fill="black" />
              </svg>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M13.028 2.4082C14.153 2.4112 14.724 2.4172 15.217 2.4312L15.411 2.4382C15.635 2.4462 15.856 2.4562 16.123 2.4682C17.187 2.5182 17.913 2.6862 18.55 2.9332C19.21 3.1872 19.766 3.5312 20.322 4.0862C20.8307 4.58594 21.2241 5.19068 21.475 5.8582C21.722 6.4952 21.89 7.2212 21.94 8.2862C21.952 8.5522 21.962 8.7732 21.97 8.9982L21.976 9.1922C21.991 9.6842 21.997 10.2552 21.999 11.3802L22 12.1262V13.4362C22.0024 14.1656 21.9947 14.895 21.977 15.6242L21.971 15.8182C21.963 16.0432 21.953 16.2642 21.941 16.5302C21.891 17.5952 21.721 18.3202 21.475 18.9582C21.2241 19.6257 20.8307 20.2305 20.322 20.7302C19.8222 21.2389 19.2175 21.6324 18.55 21.8832C17.913 22.1302 17.187 22.2982 16.123 22.3482L15.411 22.3782L15.217 22.3842C14.724 22.3982 14.153 22.4052 13.028 22.4072L12.282 22.4082H10.973C10.2432 22.4108 9.51348 22.4031 8.78396 22.3852L8.58996 22.3792C8.35257 22.3702 8.11523 22.3599 7.87796 22.3482C6.81396 22.2982 6.08796 22.1302 5.44996 21.8832C4.78279 21.6323 4.1784 21.2388 3.67896 20.7302C3.1699 20.2306 2.77607 19.6258 2.52496 18.9582C2.27796 18.3212 2.10996 17.5952 2.05996 16.5302L2.02996 15.8182L2.02496 15.6242C2.00652 14.895 1.99819 14.1656 1.99996 13.4362V11.3802C1.99719 10.6508 2.00452 9.9214 2.02196 9.1922L2.02896 8.9982C2.03696 8.7732 2.04696 8.5522 2.05896 8.2862C2.10896 7.2212 2.27696 6.4962 2.52396 5.8582C2.77565 5.1904 3.17018 4.58564 3.67996 4.0862C4.17911 3.57775 4.78315 3.18428 5.44996 2.9332C6.08796 2.6862 6.81296 2.5182 7.87796 2.4682C8.14396 2.4562 8.36596 2.4462 8.58996 2.4382L8.78396 2.4322C9.51315 2.41444 10.2426 2.40677 10.972 2.4092L13.028 2.4082ZM12 7.4082C10.6739 7.4082 9.40211 7.93499 8.46442 8.87267C7.52674 9.81035 6.99996 11.0821 6.99996 12.4082C6.99996 13.7343 7.52674 15.0061 8.46442 15.9437C9.40211 16.8814 10.6739 17.4082 12 17.4082C13.326 17.4082 14.5978 16.8814 15.5355 15.9437C16.4732 15.0061 17 13.7343 17 12.4082C17 11.0821 16.4732 9.81035 15.5355 8.87267C14.5978 7.93499 13.326 7.4082 12 7.4082ZM12 9.4082C12.3939 9.40814 12.784 9.48567 13.148 9.63637C13.512 9.78708 13.8428 10.008 14.1214 10.2865C14.4 10.5651 14.6211 10.8957 14.7719 11.2597C14.9227 11.6236 15.0004 12.0137 15.0005 12.4077C15.0005 12.8017 14.923 13.1918 14.7723 13.5558C14.6216 13.9198 14.4007 14.2505 14.1221 14.5292C13.8436 14.8078 13.5129 15.0288 13.149 15.1797C12.785 15.3305 12.3949 15.4081 12.001 15.4082C11.2053 15.4082 10.4422 15.0921 9.87964 14.5295C9.31703 13.9669 9.00096 13.2039 9.00096 12.4082C9.00096 11.6126 9.31703 10.8495 9.87964 10.2869C10.4422 9.72427 11.2053 9.4082 12.001 9.4082M17.251 5.9082C16.9194 5.9082 16.6015 6.0399 16.3671 6.27432C16.1327 6.50874 16.001 6.82668 16.001 7.1582C16.001 7.48972 16.1327 7.80767 16.3671 8.04209C16.6015 8.27651 16.9194 8.4082 17.251 8.4082C17.5825 8.4082 17.9004 8.27651 18.1348 8.04209C18.3693 7.80767 18.501 7.48972 18.501 7.1582C18.501 6.82668 18.3693 6.50874 18.1348 6.27432C17.9004 6.0399 17.5825 5.9082 17.251 5.9082Z" fill="black" />
              </svg>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                <mask id="mask0_103_256" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
                  <path d="M0 0.408203H20V20.4082H0V0.408203Z" fill="white" />
                </mask>
                <g mask="url(#mask0_103_256)">
                  <path d="M15.75 1.34546H18.8171L12.1171 9.0226L20 19.4712H13.8286L8.99143 13.1355L3.46286 19.4712H0.392857L7.55857 11.2569L0 1.34689H6.32857L10.6943 7.13689L15.75 1.34546ZM14.6714 17.6312H16.3714L5.4 3.08974H3.57714L14.6714 17.6312Z" fill="black" />
                </g>
              </svg>
            </div>
          </GluFlex>
        </GluFlex>
        <GluFlex direction="column" align="flex-start" gap={500}>
          {links}
        </GluFlex>
      </GluFlex>
      {/* TODO: this is not used in the current design */}
      {/* <div className="container container-fluid">
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <div className="margin-bottom--sm">{logo}</div>}
            {copyright}
          </div>
        )}
      </div> */}
    </footer>
  )
}
