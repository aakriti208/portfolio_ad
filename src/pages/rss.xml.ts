import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import type { APIContext } from "astro"

export async function GET(context: APIContext) {
  const notes = await getCollection("notes", ({ data }) => !data.draft)
  const sorted = notes.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())

  return rss({
    title: "Aakriti Dhakal — Notes",
    description: "Writing on AI, ML systems, and software engineering.",
    site: context.site!,
    items: sorted.map((note) => ({
      title: note.data.title,
      description: note.data.summary,
      pubDate: note.data.date,
      link: `/notes/${note.slug}`,
    })),
  })
}
