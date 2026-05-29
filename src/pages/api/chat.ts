/**
 * /api/chat — Claude-powered portfolio assistant
 *
 * SETUP REQUIRED:
 * 1. Install the SDK:          npm install @anthropic-ai/sdk
 * 2. Add your API key:         ANTHROPIC_API_KEY=sk-ant-... in .env (never commit this)
 * 3. Enable server rendering:  astro.config.mjs already has output: 'hybrid'
 * 4. Add a deployment adapter: @astrojs/vercel, @astrojs/node, etc.
 *
 * Accepts:  POST { message: string, history: { role: 'user'|'assistant', content: string }[] }
 * Returns:  { response: string } or { error: string }
 */

import type { APIRoute } from "astro"
import Anthropic from "@anthropic-ai/sdk"

// TODO: paste your real knowledge base here — resume, projects, blog excerpts, etc.
const KNOWLEDGE_BASE = `
=== ABOUT ===
Name: Aakriti Dhakal
Title: Software Engineer & Graduate Researcher
Location: San Marcos, TX
Email: aakritidh208@gmail.com
GitHub: github.com/aakriti208
LinkedIn: linkedin.com/in/aakriti-dhakal

[PASTE RESUME CONTENT HERE]

=== WORK EXPERIENCE ===
[PASTE WORK EXPERIENCE HERE — company, role, dates, key accomplishments]

=== PROJECTS ===
[PASTE PROJECT SUMMARIES HERE — title, description, tech stack, key outcomes]

=== EDUCATION ===
[PASTE EDUCATION DETAILS HERE]

=== SKILLS ===
[PASTE SKILLS LIST HERE]

=== ADDITIONAL CONTEXT ===
[PASTE ANY OTHER RELEVANT CONTEXT — research interests, goals, fun facts, etc.]
`.trim()

const SYSTEM_PROMPT = `You are an AI assistant for Aakriti Dhakal's portfolio website.
Your job is to answer questions about Aakriti's work, projects, skills, research, and background.
Be concise, accurate, and professional. Use first person when speaking on her behalf.
If you don't know something, say so — don't make up details.
Keep responses to 2-4 sentences unless the question clearly requires more depth.

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}`

export const POST: APIRoute = async ({ request }) => {
  // Validate API key
  const apiKey = import.meta.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_API_KEY not configured. Add it to your .env file." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }

  // Parse request body
  let body: { message?: string; history?: { role: string; content: string }[] }
  try {
    body = await request.json()
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  const { message, history = [] } = body
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return new Response(
      JSON.stringify({ error: "message is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    )
  }

  // Build message history (max last 10 turns to control token cost)
  const recentHistory = history.slice(-10)
  const messages: Anthropic.MessageParam[] = [
    ...recentHistory
      .filter(m => m.role === "user" || m.role === "assistant")
      .map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
    { role: "user", content: message.trim() },
  ]

  try {
    const client = new Anthropic({ apiKey })

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    })

    const text =
      response.content[0]?.type === "text" ? response.content[0].text : ""

    return new Response(JSON.stringify({ response: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return new Response(
      JSON.stringify({ error: `Claude API error: ${message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}

// Disable prerendering — this is a live API route
export const prerender = false
