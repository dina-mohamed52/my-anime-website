// vite.config.js
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      "react-router-dom": new URL(
        "./node_modules/react-router-dom",
        import.meta.url
      ).pathname,
    },
  },
});
