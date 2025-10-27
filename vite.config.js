import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // Base public path when served in development or production
  base: "/",
  
  // Development server configuration
  server: {
    host: "0.0.0.0",
    port: 3000, // Will be overridden if not available
    strictPort: false, // Allow port to be changed if in use
    open: true,
  },

  // Build configuration
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },

  // Plugins
  plugins: [react()],

  // Resolve configuration
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src-js"),
    },
  },

  // CSS configuration
  css: {
    postcss: "./postcss.config.js",
    modules: {
      localsConvention: "camelCase",
    },
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
