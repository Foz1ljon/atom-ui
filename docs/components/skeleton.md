# Skeleton

Placeholder loading state that mimics content shape before data loads.

## Text Lines

<DemoBlock>
  <div style="max-width:360px">
    <AtomSkeleton variant="text" :lines="3" />
  </div>
  <template #code>

```vue
<AtomSkeleton variant="text" :lines="3" />
```

  </template>
</DemoBlock>

## Rectangle

<DemoBlock>
  <div style="max-width:360px">
    <AtomSkeleton variant="rect" height="120px" />
  </div>
  <template #code>

```vue
<AtomSkeleton variant="rect" height="120px" />
```

  </template>
</DemoBlock>

## Circle (avatar placeholder)

<DemoBlock>
  <AtomSkeleton variant="circle" width="56px" />
  <template #code>

```vue
<AtomSkeleton variant="circle" width="56px" />
```

  </template>
</DemoBlock>

## Card Skeleton Composition

<DemoBlock>
  <div style="display:flex;gap:14px;align-items:flex-start;max-width:400px">
    <div style="flex-shrink:0">
      <AtomSkeleton variant="circle" width="44px" />
    </div>
    <div style="flex:1">
      <AtomSkeleton variant="rect" height="14px" width="55%" style="margin-bottom:10px" />
      <AtomSkeleton variant="text" :lines="2" />
    </div>
  </div>
  <template #code>

```vue
<div style="display:flex;gap:14px">
  <AtomSkeleton variant="circle" width="44px" style="flex-shrink:0" />
  <div style="flex:1">
    <AtomSkeleton variant="rect" height="14px" width="55%" />
    <AtomSkeleton variant="text" :lines="2" style="margin-top:10px" />
  </div>
</div>
```

  </template>
</DemoBlock>

## Without Animation

<DemoBlock>
  <div style="max-width:360px">
    <AtomSkeleton variant="text" :lines="4" :animated="false" />
  </div>
  <template #code>

```vue
<AtomSkeleton variant="text" :lines="4" :animated="false" />
```

  </template>
</DemoBlock>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'rect' \| 'circle'` | `'rect'` | Shape variant |
| `width` | `string` | `'100%'` | Width (CSS value) |
| `height` | `string` | auto | Height (CSS value) |
| `lines` | `number` | `3` | Number of text lines |
| `animated` | `boolean` | `true` | Enable shimmer animation |
| `rounded` | `boolean` | `false` | Full border-radius on rect |
