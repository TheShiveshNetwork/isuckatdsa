---
title: "Arrays"
description: "Why arrays are just an apartment building of numbered slots."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["arrays"]
isPinned: true
growthStage: "budding"
chapter: "1"
---

### Overview

Hey, welcome to the real start. Forget trees and graphs for a second. An array is just an apartment building. Each floor has a number, 0, 1, 2, and behind each door is a value. You can knock on door 5 directly without visiting 0 to 4. That is random access, and it is why arrays are fast.

The catch? The building cannot stretch in the middle. If you want to insert someone in the middle, you have to make everyone from there shuffle one floor down. We talked about this cost in [[foundations/complexity]] - that shuffle is O(n).

Everything in this chapter is about how you walk this building. You will meet the same friends from [[foundations/core-patterns]] again: two friends walking from ends, a camera frame that slides, and a notebook where you write down running totals so you do not re-add.

Here is your map for this building:

- [[arrays/two-pointers]] - two people walking towards each other
- [[arrays/sliding-window]] - a camera frame that grows and shrinks
- [[arrays/prefix-sum]] - your notebook of running totals
- [[arrays/kadanes-algorithm]] - knowing when to keep the streak or start fresh - you already nailed this, I will not touch it
- [[arrays/dutch-national-flag]] - sorting three colors in one pass
- [[arrays/two-sum]] - two numbers shaking hands
- [[arrays/product-of-array-except-self]] - multiply everything except yourself
- [[arrays/trapping-rain-water]] - water between buildings
- [[arrays/container-with-most-water]] - two walls holding the most water
- [[arrays/array-grab-bag]] - the leftover tricks that show up too often to ignore

You do not need a new trick for every problem. You need to see which walk you are already doing.
