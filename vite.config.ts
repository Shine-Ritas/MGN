import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server:{
  //   allowedHosts:["506a55aec323.ngrok-free.app"],
  // }
  // server: {
  //   watch: {
  //     usePolling: false,
  //   },
  //   hmr: true
  // }
});
