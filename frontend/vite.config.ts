import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite"; // <-- импортируем плагин
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwind()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000, // dev-порт фронта
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001", // порт бэка
        changeOrigin: true,
      },
    },
  },
  build: { outDir: "build" }, // чтобы как в CRA
});
