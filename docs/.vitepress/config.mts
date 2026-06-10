// .vitepress/config.mts
import { defineConfig } from "vitepress";

export default defineConfig({
  vite: {
    plugins: [],
    ssr: {
      noExternal: ["atom-ui-vue"],
    },
  },

  title: "Atom UI",
  description: "Lightweight Vue 3 component library",
  lang: "en",

  themeConfig: {
    logo: "/logo.svg",
    siteTitle: "Atom UI",
    search: {
      provider: "local",
    },

    docFooter: {
      prev: "Previous",
      next: "Next",
    },

    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/guide/introduction" },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/guide/introduction" },
          { text: "Installation", link: "/guide/installation" },
        ],
      },
      {
        text: "Form Controls",
        items: [
          { text: "Button",     link: "/components/button" },
          { text: "Input",      link: "/components/input" },
          { text: "Textarea",   link: "/components/textarea" },
          { text: "Select",     link: "/components/select" },
          { text: "Checkbox",   link: "/components/checkbox" },
          { text: "Radio",      link: "/components/radio" },
        ],
      },
      {
        text: "Data Display",
        items: [
          { text: "Badge",      link: "/components/badge" },
          { text: "Tag",        link: "/components/tag" },
          { text: "Avatar",     link: "/components/avatar" },
          { text: "Card",       link: "/components/card" },
          { text: "Table",      link: "/components/table" },
          { text: "Skeleton",   link: "/components/skeleton" },
        ],
      },
      {
        text: "Navigation",
        items: [
          { text: "Pagination", link: "/components/pagination" },
          { text: "Sidebar",    link: "/components/sidebar" },
        ],
      },
      {
        text: "Feedback",
        items: [
          { text: "Alert",      link: "/components/alert" },
          { text: "Spinner",    link: "/components/spinner" },
          { text: "Tooltip",    link: "/components/tooltip" },
          { text: "Message",    link: "/components/message" },
          { text: "Drawer",     link: "/components/drawer" },
          { text: "Editor",     link: "/components/editor" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/Foz1ljon/atom-ui" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 Foziljon",
    },
  },
});
