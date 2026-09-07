import type { CollectionEntry } from "astro:content";
import type { TreeNode } from "@/components/wiki/WikiNavNode.astro";

export interface WikiNavPage {
  href: string;
  title: string;
  chapter?: string;
}

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

function humanize(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function makeTreeNode(
  segment: string,
  isFile: boolean,
  note: CollectionEntry<"wiki">,
): TreeNode {
  return {
    label: isFile ? note.data.title : humanize(segment),
    href: isFile
      ? note.id === "index"
        ? "/wiki"
        : `/wiki/${note.id}`
      : undefined,
    chapter: note.data.chapter,
    children: {},
  };
}

function updateFileNode(node: TreeNode, note: CollectionEntry<"wiki">): void {
  node.href = note.id === "index" ? "/wiki" : `/wiki/${note.id}`;
  node.label = note.data.title;
  node.chapter = note.data.chapter;
}

export function buildWikiTree(
  notes: CollectionEntry<"wiki">[],
): Record<string, TreeNode> {
  const root: Record<string, TreeNode> = {};

  for (const note of notes) {
    const segments = note.id.split("/");
    let currentLevel = root;
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const isFile = i === segments.length - 1;

      if (!currentLevel[segment]) {
        currentLevel[segment] = makeTreeNode(segment, isFile, note);
      } else if (isFile) {
        updateFileNode(currentLevel[segment], note);
      }
      currentLevel = currentLevel[segment].children;
    }
  }

  return root;
}

export function flattenWikiTree(root: Record<string, TreeNode>): WikiNavPage[] {
  const pages: WikiNavPage[] = [];

  for (const key of sortTreeNodes(root)) {
    const node = root[key];
    if (node.href) {
      pages.push({
        href: node.href,
        title: node.label,
        chapter: node.chapter,
      });
    }
    pages.push(...flattenWikiTree(node.children));
  }

  return pages;
}

export function getSidebarNavigation(
  pages: WikiNavPage[],
  currentHref: string,
): { prev?: WikiNavPage; next?: WikiNavPage } {
  const normalized = currentHref.replace(/\/$/, "");
  const index = pages.findIndex((page) => page.href === normalized);
  if (index === -1) return {};

  return {
    prev: index > 0 ? pages[index - 1] : undefined,
    next: index < pages.length - 1 ? pages[index + 1] : undefined,
  };
}
