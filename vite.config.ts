import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./src/components/shared"),
      "@store": path.resolve(__dirname, "./src/store"),
    },
  },
});
