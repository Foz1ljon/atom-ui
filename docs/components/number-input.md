<script setup>
import { ref } from 'vue'

const qty = ref(1)
const price = ref(9.99)
const temp = ref(0)
</script>

# Number Input

A numeric field with stepper buttons, min/max clamping, keyboard arrows, and
configurable decimal precision — integer-only or decimal.

## Integer (default)

<DemoBlock>
  <AtomNumberInput v-model="qty" :min="0" :max="10" :precision="0" />
  <template #code>

```vue
<script setup>
import { ref } from 'vue'
const qty = ref(1)
</script>

<template>
  <!-- precision 0 = integers only -->
  <AtomNumberInput v-model="qty" :min="0" :max="10" :precision="0" />
</template>
```

  </template>
</DemoBlock>

## Decimal

<DemoBlock>
  <AtomNumberInput v-model="price" :step="0.5" :precision="2" prefix="$" />
  <template #code>

```vue
<!-- two decimal places, step 0.5 -->
<AtomNumberInput v-model="price" :step="0.5" :precision="2" prefix="$" />
```

  </template>
</DemoBlock>

## Negative range & suffix

<DemoBlock>
  <AtomNumberInput v-model="temp" :min="-20" :max="40" suffix="°C" />
  <template #code>

```vue
<AtomNumberInput v-model="temp" :min="-20" :max="40" suffix="°C" />
```

  </template>
</DemoBlock>

## Without controls

<DemoBlock>
  <AtomNumberInput v-model="qty" :controls="false" placeholder="0" />
</DemoBlock>

## Props

| Prop         | Type                     | Default | Description                                            |
| ------------ | ------------------------ | ------- | ------------------------------------------------------ |
| `modelValue` | `number \| null`         | `null`  | Current value (v-model)                                |
| `min`        | `number`                 | —       | Minimum allowed value                                  |
| `max`        | `number`                 | —       | Maximum allowed value                                  |
| `step`       | `number`                 | `1`     | Increment for steppers / arrow keys                    |
| `precision`  | `number`                 | —       | Decimal places. `0` = integers, omit = unrestricted    |
| `disabled`   | `boolean`                | `false` | Disable the field                                      |
| `readonly`   | `boolean`                | `false` | Read-only (steppers disabled)                          |
| `size`       | `'sm' \| 'md' \| 'lg'`   | `'md'`  | Control height                                         |
| `controls`   | `boolean`                | `true`  | Show +/- stepper buttons                               |
| `error`      | `boolean`                | `false` | Error styling                                          |
| `label`      | `string`                 | —       | Field label                                            |
| `prefix`     | `string`                 | —       | Text before the value (e.g. `$`)                       |
| `suffix`     | `string`                 | —       | Text after the value (e.g. `°C`)                       |

## Emits

| Event               | Payload          | Description        |
| ------------------- | ---------------- | ------------------ |
| `update:modelValue` | `number \| null` | Value changed      |
| `change`            | `number \| null` | Committed on blur/step |
| `focus` / `blur`    | —                | Focus events       |
