# Tooltip

Floating label near a trigger element. 12 placements, hover/click/focus triggers, dark/light themes.

## Basic

<DemoBlock>
  <AtomTooltip content="This is a tooltip">
    <AtomButton>Hover me</AtomButton>
  </AtomTooltip>
  <template #code>

```vue
<AtomTooltip content="This is a tooltip">
  <AtomButton>Hover me</AtomButton>
</AtomTooltip>
```

  </template>
</DemoBlock>

## Placements

<DemoBlock>
  <div style="display:flex;flex-wrap:wrap;gap:10px">
    <AtomTooltip content="top"          placement="top">          <AtomButton size="sm" variant="secondary">top</AtomButton></AtomTooltip>
    <AtomTooltip content="top-start"    placement="top-start">    <AtomButton size="sm" variant="secondary">top-start</AtomButton></AtomTooltip>
    <AtomTooltip content="top-end"      placement="top-end">      <AtomButton size="sm" variant="secondary">top-end</AtomButton></AtomTooltip>
    <AtomTooltip content="bottom"       placement="bottom">       <AtomButton size="sm" variant="secondary">bottom</AtomButton></AtomTooltip>
    <AtomTooltip content="bottom-start" placement="bottom-start"> <AtomButton size="sm" variant="secondary">bottom-start</AtomButton></AtomTooltip>
    <AtomTooltip content="bottom-end"   placement="bottom-end">   <AtomButton size="sm" variant="secondary">bottom-end</AtomButton></AtomTooltip>
    <AtomTooltip content="left"         placement="left">         <AtomButton size="sm" variant="secondary">left</AtomButton></AtomTooltip>
    <AtomTooltip content="right"        placement="right">        <AtomButton size="sm" variant="secondary">right</AtomButton></AtomTooltip>
  </div>
</DemoBlock>

## Themes

<DemoBlock>
  <div style="display:flex;gap:12px">
    <AtomTooltip content="Dark theme (default)" theme="dark">
      <AtomButton variant="secondary">Dark</AtomButton>
    </AtomTooltip>
    <AtomTooltip content="Light theme" theme="light">
      <AtomButton variant="secondary">Light</AtomButton>
    </AtomTooltip>
  </div>
</DemoBlock>

## Click Trigger

<DemoBlock>
  <AtomTooltip content="Click triggered tooltip" trigger="click">
    <AtomButton variant="secondary">Click me</AtomButton>
  </AtomTooltip>
  <template #code>

```vue
<AtomTooltip content="Click triggered" trigger="click">
  <AtomButton>Click me</AtomButton>
</AtomTooltip>
```

  </template>
</DemoBlock>

## Rich Content Slot

<DemoBlock>
  <AtomTooltip theme="light" placement="bottom">
    <AtomButton>Info</AtomButton>
    <template #content>
      <div style="font-weight:600;margin-bottom:4px">Details</div>
      <div style="color:#6b7280;font-size:12px">Version 0.1.0<br>Build: stable</div>
    </template>
  </AtomTooltip>
  <template #code>

```vue
<AtomTooltip theme="light" placement="bottom">
  <AtomButton>Info</AtomButton>
  <template #content>
    <div style="font-weight:600">Details</div>
    <div>Version 0.1.0</div>
  </template>
</AtomTooltip>
```

  </template>
</DemoBlock>

## With Delay

<DemoBlock>
  <AtomTooltip content="Appears after 600ms" :delay="600">
    <AtomButton variant="secondary">Delayed</AtomButton>
  </AtomTooltip>
</DemoBlock>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | — | Tooltip text |
| `placement` | `AtomTooltipPlacement` | `'top'` | Position relative to trigger |
| `trigger` | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | Trigger mode |
| `disabled` | `boolean` | `false` | Disable tooltip |
| `delay` | `number` | `0` | Show delay in ms |
| `maxWidth` | `string` | `'260px'` | Max width |
| `theme` | `'dark' \| 'light'` | `'dark'` | Color theme |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Trigger element |
| `content` | Custom tooltip content |

## Placement Values

`top` · `top-start` · `top-end` · `bottom` · `bottom-start` · `bottom-end` · `left` · `left-start` · `left-end` · `right` · `right-start` · `right-end`
