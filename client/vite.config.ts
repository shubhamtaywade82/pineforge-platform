import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    proxy: {
      "/api": `http://localhost:${process.env.RAILS_PORT || 3000}`,
      "/health": `http://localhost:${process.env.RAILS_PORT || 3000}`,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/monaco-editor")) {
            return "monaco-editor";
          }
          if (id.includes("node_modules/@monaco-editor")) {
            return "monaco-editor";
          }
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) {
            return "react-vendor";
          }
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    globals: true,
  },
});
