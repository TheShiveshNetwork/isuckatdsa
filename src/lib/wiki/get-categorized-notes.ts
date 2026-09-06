import { getCollection } from "astro:content";
import { compareChapters } from "@/lib/wiki/tree-utils";

export interface CategorizedNote {
  name: string;
  notes: Array<{
    id: string;
    title: string;
    description: string;
    growthStage: string;
    updatedAt: Date;
    chapter?: string;
  }>;
}

function getCategory(noteId: string): string {
  return noteId === "index" ? "overview" : noteId.split("/")[0];
}

function byChapterAsc(
  a: { chapter?: string; title: string },
  b: { chapter?: string; title: string },
): number {
  const cmp = compareChapters(a.chapter, b.chapter);
  if (cmp !== 0) return cmp;
  return a.title.localeCompare(b.title);
}

function byCategoryChapterAsc(
  a: { name: string; notes: CategorizedNote["notes"] },
  b: { name: string; notes: CategorizedNote["notes"] },
): number {
  // overview should always be first even if its chapter ties with foundations
  if (a.name === "overview" && b.name !== "overview") return -1;
  if (b.name === "overview" && a.name !== "overview") return 1;

  const aChapter = [...a.notes].sort(byChapterAsc)[0]?.chapter;
  const bChapter = [...b.notes].sort(byChapterAsc)[0]?.chapter;
  const cmp = compareChapters(aChapter, bChapter);
  if (cmp !== 0) return cmp;
  return a.name.localeCompare(b.name);
}

export async function getCategorizedNotes(): Promise<CategorizedNote[]> {
  const allNotes = await getCollection("wiki");

  const grouped = allNotes.reduce(
    (acc, note) => {
      const category = getCategory(note.id);
      if (!acc[category]) acc[category] = [];
      acc[category].push({
        id: note.id,
        title: note.data.title,
        description: note.data.description || "",
        growthStage: note.data.growthStage || "",
        updatedAt: note.data.updatedAt,
        chapter: note.data.chapter,
      });
      return acc;
    },
    {} as Record<string, CategorizedNote["notes"]>,
  );

  return Object.entries(grouped)
    .map(([name, notes]) => ({
      name,
      notes: notes.sort(byChapterAsc),
    }))
    .sort(byCategoryChapterAsc);
}
