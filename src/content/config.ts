import { defineCollection, z } from "astro:content"

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["In progress", "Completed", "Paused"]),
    stack: z.array(z.string()),
    start_date: z.coerce.date(),
    end_date: z.coerce.date().optional(),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    cover: z.string().optional(),
    related_notes: z.array(z.string()).optional(),
  }),
})

const notes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    summary: z.string(),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    related_projects: z.array(z.string()).optional(),
    related_notes: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
})

const tools = defineCollection({
  type: "data",
  schema: z.object({
    category: z.string(),
    tools: z.array(z.string()),
    why: z.string().optional(),
  }),
})

export const collections = { projects, notes, tools }
