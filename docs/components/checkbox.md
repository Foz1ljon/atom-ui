---

<script setup>
import { ref } from 'vue'
import { AtomCheckBox } from 'atomui-vue3'
import "atomui-vue3/style.css"; 

const checked1 = ref(false)
const checked2 = ref(true)
const checked3 = ref(false)
</script>

# Checkbox

`AtomCheckBox` komponenti orqali foydalanuvchi mantiqiy tanlovlarni amalga oshiradi.

## ✨ Oddiy foydalanish (Live Demo)

Bu yerda komponentni real vaqtda bosib ko'rishingiz mumkin:

<div class="demo-card">
  <AtomCheckBox v-model="checked1" label="Eslab qolish" />
  <p class="status">Hozirgi holat: <b>{{ checked1 }}</b></p>
</div>

<template>
  <AtomCheckBox v-model="checked" label="Eslab qolish" />
</template>

<div class="demo-card">
    <AtomCheckBox v-model="checked3">
      <span>
        Men 
        <a href="#" class="custom-link">Foydalanish shartlari</a>
        ga roziman
      </span>
    </AtomCheckBox>
    <p class="status">
      Tasdiqlandi: <b>{{ checked3 }}</b>
    </p>
  </div>

```vue
<template>
  <AtomCheckBox v-model="checked">
    <span> Men <a href="#">Foydalanish shartlari</a>ga roziman </span>
  </AtomCheckBox>
</template>
```

---

## 🚫 Bloklangan holat (Disabled)

Foydalanuvchi qiymatni o'zgartira olmaydi.

\<div class="demo-card"\>
\<AtomCheckBox v-model="checked2" label="Bloklangan checkbox" disabled /\>
\</div\>

```vue
<AtomCheckBox v-model="value" label="Bloklangan" disabled />
```

---

## ⚙️ API Referans (Props)

| Prop         | Turi      | Standart | Tavsif              |
| :----------- | :-------- | :------- | :------------------ |
| **v-model**  | `boolean` | `false`  | Checkboxning holati |
| **label**    | `string`  | —        | Yonidagi matn       |
| **disabled** | `boolean` | `false`  | Bosishni cheklash   |

<style scoped>
.demo-card {
padding: 24px;
border: 1px solid var(--vp-c-divider);
border-radius: 12px;
background-color: var(--vp-c-bg-soft);
margin: 16px 0;
display: flex;
flex-direction: column;
gap: 12px;
}
.status {
margin: 0;
font-size: 13px;
color: var(--vp-c-text-2);
}
.custom-link {
color: var(--vp-c-brand-1);
text-decoration: underline;
font-weight: 500;
}
</style>

```

---


```
