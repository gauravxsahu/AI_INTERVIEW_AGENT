import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Tailwind v4 plugs directly into Vite — no postcss.config.js needed.
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
});
