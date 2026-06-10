import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  site: "https://astro-sphere-demo.vercel.app",
  // output: 'hybrid' enables server-rendered API routes (e.g. /api/chat).
  // For production you must add a deployment adapter:
  //   npm install @astrojs/vercel  → add vercel() to integrations
  //   npm install @astrojs/node    → add node({ mode:'standalone' }) to integrations
  output: "hybrid",
  integrations: [mdx(), sitemap(), solidJs(), tailwind({ applyBaseStyles: false })],
})