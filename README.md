# 🧠 isuckatdsa

DSA Mental Models wiki built with Astro.

All content is defined in [isuckatdsa.md](isuckatdsa.md).

## Start

```bash
pnpm install
pnpm run dev
```

## Contributing

1. Edit `isuckatdsa.md` to add or update topics
2. Add new notes under `src/content/wiki/` using Markdown or MDX
3. Each note requires frontmatter:
   ```yaml
   title: "Topic"
   description: "Brief description"
   createdAt: 2026-01-01
   updatedAt: 2026-01-01
   tags: ["arrays"]
   isPinned: false
   growthStage: "seedling"
   chapter: "1"
   ```
4. Run `pnpm run build` to verify
5. Commit and open a PR
