import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const isDevelopment = process.env.NODE_ENV === "development";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: isDevelopment ? "http://localhost:5100" : "",
        changeOrigin: true,
        secure: !isDevelopment,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/bankDash.js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "assets/bankDash.css";
          }
          return "assets/[name][extname]";
        },
        manualChunks: undefined,
      },
    },
    cssCodeSplit: false,
  },
});
