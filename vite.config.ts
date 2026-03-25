import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { readdirSync, statSync } from "fs";

const componentsDir = resolve(__dirname, "src/components");

const componentEntries = Object.fromEntries(
  readdirSync(componentsDir)
    .filter((name) => statSync(`${componentsDir}/${name}`).isDirectory())
    .map((name) => [`components/${name}/index`, resolve(componentsDir, `${name}/index.ts`)]),
);

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    dts({
      include: ["src"],
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        ...componentEntries,
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
    cssCodeSplit: false,
    minify: "esbuild",
    target: "es2015",
  },
});
