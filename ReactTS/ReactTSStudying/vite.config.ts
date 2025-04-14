import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    watch: {
      ignored: ["**/db.json"], // Ignore changes to db.json
    }, // Will fail instead of switching to another port
  },
  plugins: [react(), tailwindcss()],
  // optimizeDeps: {
  //   include: ["@emotion/memoize"],
  // },
});
