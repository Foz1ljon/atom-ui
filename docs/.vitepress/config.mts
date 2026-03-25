// .vitepress/config.mts
import { defineConfig } from "vitepress";

export default defineConfig({
  vite: { plugins: [] },

  themeConfig: {
    logo: "/logo.svg",
    siteTitle: "Atom UI", // logo yonida matn ham ko'rinadi
    search: {
      provider: "local",
    },
  },

  locales: {
    root: {
      label: "O'zbek",
      lang: "uz",
      title: "Atom UI",

      description: "Atom UI komponentlar kutubxonasi",
      themeConfig: {
        docFooter: {
          prev: "Oldingi sahifa",
          next: "Keyingi sahifa",
        },
        nav: [
          { text: "Bosh sahifa", link: "/" },
          { text: "Hujjatlar", link: "/guide/introduction" },
        ],
        sidebar: [
          {
            text: "Kirish",
            items: [
              { text: "Nima bu?", link: "/guide/introduction" },
              { text: "O'rnatish", link: "/guide/installation" },
            ],
          },
          {
            text: "Komponentlar",
            items: [
              { text: "BreadCrumbs", link: "/components/breadCrumbs" },
              { text: "Sidebar", link: "/components/sidebar" },

              { text: "Button", link: "/components/button" },
              { text: "Input", link: "/components/input" },
              { text: "Select", link: "/components/select" },
              { text: "DropDownBlock", link: "/components/dropdownblock" },

              { text: "Textarea", link: "/components/textarea" },
              { text: "Tabs", link: "/components/tabs" },
              { text: "Modal", link: "/components/modal" },
              { text: "Editor", link: "/components/editor" },
              { text: "CheckBox", link: "/components/checkbox" },
              { text: "Switch", link: "/components/switch" },
              { text: "Popover", link: "/components/popover" },
              { text: "Toast", link: "/components/toast" },
            ],
          },
        ],
      },
    },

    ru: {
      label: "Русский",
      lang: "ru",
      title: "Atom UI",
      description: "Библиотека компонентов Atom UI",
      themeConfig: {
        docFooter: {
          prev: "Назад",
          next: "Вперёд",
        },
        nav: [
          { text: "Главная", link: "/ru/" },
          { text: "Документация", link: "/ru/guide/introduction" },
        ],
        sidebar: [
          {
            text: "Введение",
            items: [
              { text: "Что это?", link: "/ru/guide/introduction" },
              { text: "Установка", link: "/ru/guide/installation" },
            ],
          },
          {
            text: "Компоненты",
            items: [
              { text: "BreadCrumbs", link: "/components/breadCrumbs" },
              { text: "Sidebar", link: "/components/sidebar" },

              { text: "Button", link: "/components/button" },
              { text: "Input", link: "/components/input" },
              { text: "Select", link: "/components/select" },
              { text: "DropDownBlock", link: "/components/dropdownblock" },

              { text: "Textarea", link: "/components/textarea" },
              { text: "Tabs", link: "/components/tabs" },
              { text: "Modal", link: "/components/modal" },
              { text: "Editor", link: "/components/editor" },
              { text: "CheckBox", link: "/components/checkbox" },
              { text: "Switch", link: "/components/switch" },
              { text: "Popover", link: "/components/popover" },
              { text: "Toast", link: "/components/toast" },
            ],
          },
        ],
      },
    },

    en: {
      label: "English",
      lang: "en",
      title: "Atom UI",
      description: "Atom UI component library",
      themeConfig: {
        docFooter: {
          prev: "Previous page",
          next: "Next page",
        },
        nav: [
          { text: "Home", link: "/en/" },
          { text: "Docs", link: "/en/guide/introduction" },
        ],
        sidebar: [
          {
            text: "Getting Started",
            items: [
              { text: "Introduction", link: "/en/guide/introduction" },
              { text: "Installation", link: "/en/guide/installation" },
            ],
          },
          {
            text: "Components",
            items: [
              { text: "BreadCrumbs", link: "/components/breadCrumbs" },
              { text: "Sidebar", link: "/components/sidebar" },

              { text: "Button", link: "/components/button" },
              { text: "Input", link: "/components/input" },
              { text: "Select", link: "/components/select" },
              { text: "DropDownBlock", link: "/components/dropdownblock" },

              { text: "Textarea", link: "/components/textarea" },
              { text: "Tabs", link: "/components/tabs" },
              { text: "Modal", link: "/components/modal" },
              { text: "Editor", link: "/components/editor" },
              { text: "CheckBox", link: "/components/checkbox" },
              { text: "Switch", link: "/components/switch" },
              { text: "Popover", link: "/components/popover" },
              { text: "Toast", link: "/components/toast" },
            ],
          },
        ],
      },
    },
  },
});
