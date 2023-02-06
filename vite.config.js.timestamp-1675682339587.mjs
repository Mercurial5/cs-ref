// vite.config.js
import { URL } from "url";
import { defineConfig, loadEnv } from "file:///C:/Users/User/Desktop/Dias-ref/cs-ref/node_modules/.pnpm/vite@4.0.4/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/User/Desktop/Dias-ref/cs-ref/node_modules/.pnpm/@vitejs+plugin-react@3.0.1_vite@4.0.4/node_modules/@vitejs/plugin-react/dist/index.mjs";
import postcss_tailwindcss from "file:///C:/Users/User/Desktop/Dias-ref/cs-ref/node_modules/.pnpm/tailwindcss@3.2.4_postcss@8.4.21/node_modules/tailwindcss/lib/index.js";
import postcss_autoprefixer from "file:///C:/Users/User/Desktop/Dias-ref/cs-ref/node_modules/.pnpm/autoprefixer@10.4.13_postcss@8.4.21/node_modules/autoprefixer/lib/autoprefixer.js";
var vite_config_default = defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const url = new URL(process.env.VITE_PROXY_URL);
  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [postcss_tailwindcss, postcss_autoprefixer]
      }
    },
    server: {
      host: url.hostname,
      port: url.port,
      proxy: {
        // with options: http://localhost:5173/api -> http://localhost:8000/api
        "/api": {
          target: process.env.VITE_BASE_URL,
          changeOrigin: true
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXERlc2t0b3BcXFxcRGlhcy1yZWZcXFxcY3MtcmVmXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXERlc2t0b3BcXFxcRGlhcy1yZWZcXFxcY3MtcmVmXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9Vc2VyL0Rlc2t0b3AvRGlhcy1yZWYvY3MtcmVmL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgVVJMIH0gZnJvbSBcInVybFwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcbmltcG9ydCBwb3N0Y3NzX3RhaWx3aW5kY3NzIGZyb20gXCJ0YWlsd2luZGNzc1wiO1xyXG5pbXBvcnQgcG9zdGNzc19hdXRvcHJlZml4ZXIgZnJvbSBcImF1dG9wcmVmaXhlclwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIHByb2Nlc3MuZW52ID0geyAuLi5wcm9jZXNzLmVudiwgLi4ubG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKSB9O1xyXG4gIGNvbnN0IHVybCA9IG5ldyBVUkwocHJvY2Vzcy5lbnYuVklURV9QUk9YWV9VUkwpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHBvc3Rjc3M6IHtcclxuICAgICAgICBwbHVnaW5zOiBbcG9zdGNzc190YWlsd2luZGNzcywgcG9zdGNzc19hdXRvcHJlZml4ZXJdLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiB1cmwuaG9zdG5hbWUsXHJcbiAgICAgIHBvcnQ6IHVybC5wb3J0LFxyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgIC8vIHdpdGggb3B0aW9uczogaHR0cDovL2xvY2FsaG9zdDo1MTczL2FwaSAtPiBodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpXHJcbiAgICAgICAgXCIvYXBpXCI6IHtcclxuICAgICAgICAgIHRhcmdldDogcHJvY2Vzcy5lbnYuVklURV9CQVNFX1VSTCxcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UyxTQUFTLFdBQVc7QUFDalUsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8seUJBQXlCO0FBQ2hDLE9BQU8sMEJBQTBCO0FBR2pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFVBQVEsTUFBTSxFQUFFLEdBQUcsUUFBUSxLQUFLLEdBQUcsUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDLEVBQUU7QUFDaEUsUUFBTSxNQUFNLElBQUksSUFBSSxRQUFRLElBQUksY0FBYztBQUU5QyxTQUFPO0FBQUEsSUFDTCxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsSUFDakIsS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLFFBQ1AsU0FBUyxDQUFDLHFCQUFxQixvQkFBb0I7QUFBQSxNQUNyRDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU0sSUFBSTtBQUFBLE1BQ1YsTUFBTSxJQUFJO0FBQUEsTUFDVixPQUFPO0FBQUE7QUFBQSxRQUVMLFFBQVE7QUFBQSxVQUNOLFFBQVEsUUFBUSxJQUFJO0FBQUEsVUFDcEIsY0FBYztBQUFBLFFBQ2hCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
