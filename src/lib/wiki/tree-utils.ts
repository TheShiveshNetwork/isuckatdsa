import type { TreeNode } from "@/components/wiki/WikiNavNode.astro";

function isTreeNodeFolder(node: TreeNode): boolean {
  return Object.keys(node.children).length > 0;
}

function parseChapter(chapter?: string): number[] | null {
  if (!chapter) return null;
  const parts = chapter.split(".").map((p) => Number.parseInt(p, 10));
  if (parts.some((n) => Number.isNaN(n))) return null;
  return parts;
}

export function compareChapters(a?: string, b?: string): number {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  const pa = parseChapter(a);
  const pb = parseChapter(b);
  if (!pa && !pb) return (a ?? "").localeCompare(b ?? "");
  if (!pa) return 1;
  if (!pb) return -1;
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const av = pa[i] ?? 0;
    const bv = pb[i] ?? 0;
    if (av !== bv) return av - bv;
  }
  return 0;
}

function getEffectiveChapter(node: TreeNode): string | undefined {
  if (node.chapter) return node.chapter;
  if (!isTreeNodeFolder(node)) return undefined;
  let min: string | undefined;
  for (const child of Object.values(node.children)) {
    const ch = getEffectiveChapter(child);
    if (!ch) continue;
    if (!min || compareChapters(ch, min) < 0) min = ch;
  }
  return min;
}

export function sortTreeNodes(children: Record<string, TreeNode>): string[] {
  return Object.keys(children).sort((a, b) => {
    const nodeA = children[a];
    const nodeB = children[b];

    const chapterA = getEffectiveChapter(nodeA);
    const chapterB = getEffectiveChapter(nodeB);
    const cmp = compareChapters(chapterA, chapterB);
    if (cmp !== 0) return cmp;

    const aIsFolder = isTreeNodeFolder(nodeA);
    const bIsFolder = isTreeNodeFolder(nodeB);

    if (!aIsFolder && bIsFolder) return -1;
    if (aIsFolder && !bIsFolder) return 1;

    return nodeA.label.localeCompare(nodeB.label);
  });
}
