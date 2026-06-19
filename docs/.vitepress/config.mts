// .vitepress/config.mts
import { defineConfig } from "vitepress";

// ⚠️ Replace with your real deployed URL (no trailing slash).
// Used for the sitemap, canonical links and Open Graph tags.
const hostname = "https://atom-ui.netlify.app";

const description =
  "Atom UI — lightweight, accessible Vue 3 component library with 25+ TypeScript components, SCSS theming, dark mode and mobile-first design.";

export default defineConfig({
  vite: {
    plugins: [],
    ssr: {
      noExternal: ["atom-ui-vue"],
    },
  },

  title: "Atom UI",
  description,
  lang: "en",

  // Pretty, indexable URLs without ".html"
  cleanUrls: true,
  lastUpdated: true,

  // Generates /sitemap.xml at build time for search engines
  sitemap: {
    hostname,
  },

  // Site-wide <head> tags (SEO + social sharing)
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    ["meta", { name: "author", content: "Foziljon" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "Vue 3, Vue component library, UI kit, Atom UI, TypeScript components, SCSS, dark mode, frontend",
      },
    ],
    ["meta", { name: "theme-color", content: "#2563eb" }],
    ["meta", { name: "robots", content: "index, follow" }],

    // Open Graph (Facebook, LinkedIn, Telegram…)
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "Atom UI" }],
    ["meta", { property: "og:title", content: "Atom UI — Vue 3 Component Library" }],
    ["meta", { property: "og:description", content: description }],
    ["meta", { property: "og:image", content: `${hostname}/logo.svg` }],
    ["meta", { property: "og:locale", content: "en_US" }],

    // Twitter / X card
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: "Atom UI — Vue 3 Component Library" }],
    ["meta", { name: "twitter:description", content: description }],
    ["meta", { name: "twitter:image", content: `${hostname}/logo.svg` }],

    // 🔑 Google Search Console verification — replace the token after you
    // add the site at https://search.google.com/search-console
    ["meta", { name: "google-site-verification", content: "REPLACE_WITH_YOUR_TOKEN" }],
  ],

  // Per-page canonical + Open Graph URL/title/description for better indexing
  transformPageData(pageData) {
    const canonical = `${hostname}/${pageData.relativePath}`
      .replace(/index\.md$/, "")
      .replace(/\.md$/, "");

    const pageTitle = pageData.frontmatter.title || pageData.title;
    const pageDesc =
      pageData.frontmatter.description || pageData.description || description;

    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push(
      ["link", { rel: "canonical", href: canonical }],
      ["meta", { property: "og:url", content: canonical }],
      [
        "meta",
        {
          property: "og:title",
          content: pageTitle ? `${pageTitle} | Atom UI` : "Atom UI",
        },
      ],
      ["meta", { property: "og:description", content: pageDesc }],
      ["meta", { name: "twitter:description", content: pageDesc }],
    );
  },

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
          { text: "Number Input", link: "/components/number-input" },
          { text: "Select",     link: "/components/select" },
          { text: "Checkbox",   link: "/components/checkbox" },
          { text: "Radio",      link: "/components/radio" },
          { text: "File Upload", link: "/components/file-upload" },
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
          { text: "Virtual List", link: "/components/virtual-list" },
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
          { text: "Modal",      link: "/components/modal" },
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
