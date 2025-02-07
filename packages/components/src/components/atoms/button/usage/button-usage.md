---
title: How to Use `glu-button`
---

The `glu-button` component is a highly customizable button that supports various appearances, sizes, and types. It can be used as a standard button or as a link (anchor tag) when an `href` is provided. Below are some examples of how to use the `glu-button` component in different configurations.

<div style={{
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem'
}}>
  <div>
    <glu-button>Button</glu-button>
    <glu-button appearance="outline">Button</glu-button>
    <glu-button appearance="ghost">Button</glu-button>
    <glu-button disabled>Button</glu-button>
    <glu-button disabled appearance="outline">Button</glu-button>
    <glu-button disabled appearance="ghost">Button</glu-button>
  </div>
  <div>
    <glu-button button-type="secondary">Button</glu-button>
    <glu-button button-type="secondary" appearance="outline">Button</glu-button>
    <glu-button button-type="secondary" appearance="ghost">Button</glu-button>
    <glu-button disabled button-type="secondary">Button</glu-button>
    <glu-button disabled button-type="secondary" appearance="outline">Button</glu-button>
    <glu-button disabled button-type="secondary" appearance="ghost">Button</glu-button>
  </div>
  <div>
    <glu-button button-type="destructive">Button</glu-button>
    <glu-button button-type="destructive" appearance="outline">Button</glu-button>
    <glu-button button-type="destructive" appearance="ghost">Button</glu-button>
    <glu-button disabled button-type="destructive">Button</glu-button>
    <glu-button disabled button-type="destructive" appearance="outline">Button</glu-button>
    <glu-button disabled button-type="destructive" appearance="ghost">Button</glu-button>
  </div>
</div>

```html
<div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
  <div>
    <glu-button>Button</glu-button>
    <glu-button appearance="outline">Button</glu-button>
    <glu-button appearance="ghost">Button</glu-button>
    <glu-button disabled>Button</glu-button>
    <glu-button disabled appearance="outline">Button</glu-button>
    <glu-button disabled appearance="ghost">Button</glu-button>
  </div>
  <div>
    <glu-button button-type="secondary">Button</glu-button>
    <glu-button button-type="secondary" appearance="outline">Button</glu-button>
    <glu-button button-type="secondary" appearance="ghost">Button</glu-button>
    <glu-button disabled button-type="secondary">Button</glu-button>
    <glu-button disabled button-type="secondary" appearance="outline">Button</glu-button>
    <glu-button disabled button-type="secondary" appearance="ghost">Button</glu-button>
  </div>
  <div>
    <glu-button button-type="destructive">Button</glu-button>
    <glu-button button-type="destructive" appearance="outline">Button</glu-button>
    <glu-button button-type="destructive" appearance="ghost">Button</glu-button>
    <glu-button disabled button-type="destructive">Button</glu-button>
    <glu-button disabled button-type="destructive" appearance="outline">Button</glu-button>
    <glu-button disabled button-type="destructive" appearance="ghost">Button</glu-button>
  </div>
</div>
```
