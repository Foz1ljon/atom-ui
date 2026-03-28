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
            items: [{ text: "Button", link: "/components/button" }],
          },
        ],
      },
    },
  },
});
