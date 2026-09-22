import { getCollection } from "astro:content"
import type { CollectionEntry } from "astro:content"

export async function getRelatedNotesForProject(
  projectSlug: string,
  projectData: CollectionEntry<"projects">["data"]
): Promise<CollectionEntry<"notes">[]> {
  const allNotes = await getCollection("notes", ({ data }) => !data.draft)

  const slugSet = new Set<string>()

  // Notes declared in the project's related_notes
  for (const slug of projectData.related_notes ?? []) {
    slugSet.add(slug)
  }

  // Notes that declare this project in their related_projects
  for (const note of allNotes) {
    if (note.data.related_projects?.includes(projectSlug)) {
      slugSet.add(note.slug)
    }
  }

  return allNotes.filter((n) => slugSet.has(n.slug))
}

export async function getRelatedProjectsForNote(
  noteSlug: string,
  noteData: CollectionEntry<"notes">["data"]
): Promise<CollectionEntry<"projects">[]> {
  const allProjects = await getCollection("projects")

  const slugSet = new Set<string>()

  // Projects declared in the note's related_projects
  for (const slug of noteData.related_projects ?? []) {
    slugSet.add(slug)
  }

  // Projects that declare this note in their related_notes
  for (const project of allProjects) {
    if (project.data.related_notes?.includes(noteSlug)) {
      slugSet.add(project.slug)
    }
  }

  return allProjects.filter((p) => slugSet.has(p.slug))
}

export async function getRelatedNotesForNote(
  noteSlug: string,
  noteData: CollectionEntry<"notes">["data"]
): Promise<CollectionEntry<"notes">[]> {
  const allNotes = await getCollection("notes", ({ data }) => !data.draft)

  const slugSet = new Set<string>()
  for (const slug of noteData.related_notes ?? []) {
    if (slug !== noteSlug) slugSet.add(slug)
  }

  // Notes that list this note in their related_notes
  for (const note of allNotes) {
    if (note.slug !== noteSlug && note.data.related_notes?.includes(noteSlug)) {
      slugSet.add(note.slug)
    }
  }

  return allNotes.filter((n) => slugSet.has(n.slug))
}
