import vue from "@vitejs/plugin-vue";
import { codeInspectorPlugin } from "code-inspector-plugin";
import { fileURLToPath, URL } from "node:url";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import vueImages from "vite-plugin-vue-images";
const host = process.env.TAURI_DEV_HOST;

export default defineConfig(async () => {
  return {
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
        dts: "src/types/auto-imports.d.ts",
        dirs: ["src/composables", "src/utils"],
      }),
      Components({
        dts: "src/types/components.d.ts",
        dirs: ["src/components"],
      }),
      vueImages({
        dirs: ["src/assets/images"],
      }),
      codeInspectorPlugin({
        bundler: "vite",
      }),
    ],

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
        "@router": fileURLToPath(new URL("./src/router", import.meta.url)),
        "@store": fileURLToPath(new URL("./src/store", import.meta.url)),
        "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
        "@composables": fileURLToPath(
          new URL("./src/composables", import.meta.url),
        ),
        "@api": fileURLToPath(new URL("./src/api", import.meta.url)),
        "@types": fileURLToPath(new URL("./src/types", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    clearScreen: false,
    server: {
      port: 1420,
      strictPort: true,
      host: host || false,
      hmr: host
        ? {
            protocol: "ws",
            host,
            port: 1421,
          }
        : undefined,
      watch: {
        ignored: ["**/src-tauri/**"],
      },
    },
  };
});
