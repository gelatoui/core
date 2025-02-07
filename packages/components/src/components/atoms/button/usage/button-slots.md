import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { GluButton } from '@gelato-ui/react';

This example demonstrates how to use the start, end, and icon-only slots to customize the button's content.

<Tabs>
<TabItem value="html" label="Html">

```html live
  <glu-button>
    <span slot="start">👈</span>
    Click Me
    <span slot="end">👉</span>
    <span slot="icon-only">⭐</span>
  </glu-button>
```

</TabItem>
<TabItem value="jsx" label="React">

```jsx live
  import { GluButton } from '@gelato-ui/react';

  const Button = () => (
    <GluButton>
      {/* <span slot="start">👈</span> */}
      Click Me
      {/* <span slot="end">👉</span>
      <span slot="icon-only">⭐</span> */}
    </GluButton>
  )
```

</TabItem>
</Tabs>