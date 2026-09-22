import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel/static"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

export default defineConfig({
  devToolbar: { enabled: false },
  site: "https://aakritidhakal.vercel.app",
  output: "static",
  adapter: vercel(),
  integrations: [mdx(), sitemap(), tailwind({ applyBaseStyles: false })],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
})
