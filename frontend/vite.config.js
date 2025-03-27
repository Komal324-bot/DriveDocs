import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Local Dev Server Port
  },
  build: {
    outDir: "dist",
  },
  base: "/", // Ensures correct asset resolution
});
