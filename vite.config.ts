/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Filmhot - AdFree Movie / Anime Watching Website",
        description: "Filmhot, where you can watch ad-free movies and animes!",
        short_name: "Filmhot",
        theme_color: "#191A1F",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
        type: "module",
      },
      srcDir: "src",
      filename: "sw.ts",
      strategies: "injectManifest",
    }),
    eslint({
      cache: true,
      cacheLocation: "./node_modules/.cache/eslint",
    }),
  ],
});
