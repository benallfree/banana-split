import { pages } from "vike-cloudflare";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";

export default defineConfig({
  plugins: [vike(), react({}), tailwindcss(), pages()],
  build: {
    target: "es2022",
  },
});
