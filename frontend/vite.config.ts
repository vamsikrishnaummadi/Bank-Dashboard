import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const isDevelopment = process.env.NODE_ENV === "development";

export default defineConfig({
  plugins: [react()],
  server: {
    ...(isDevelopment && {
      proxy: {
        "/api": {
          target: "http://localhost:5100",
          changeOrigin: true,
          secure: false, // secure is false in development
        },
      },
    }),
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
