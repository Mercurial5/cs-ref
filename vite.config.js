import { URL } from "url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import postcss_tailwindcss from "tailwindcss";
import postcss_autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const url = new URL(process.env.VITE_PROXY_URL);

  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [postcss_tailwindcss, postcss_autoprefixer],
      },
    },
    server: {
      host: url.hostname,
      port: url.port,
      proxy: {
        // with options: http://localhost:5173/api -> http://localhost:8000/api
        "/api": {
          target: process.env.VITE_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
