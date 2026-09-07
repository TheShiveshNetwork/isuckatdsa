---
title: "Container With Most Water"
description: "Picking two walls that hold the most water between them."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["arrays"]
isPinned: false
growthStage: "budding"
chapter: "1.9"
---

### Overview

Same skyline as [[arrays/trapping-rain-water]], but now you get to pick only two buildings to be the walls of a container. You want the biggest container. Water amount is width between them times the shorter wall.

You could try every pair like nested loops in [[foundations/core-patterns]]. That is O(n²) and you will time out.

Instead, use the same two walkers from [[arrays/two-pointers]]. Start with the widest container - left at start, right at end. The water is limited by the shorter wall. So you move the shorter wall inward hoping to find a taller one that makes up for the lost width. Keep the best you see.

```js
// two pointers, O(n) time, O(1) space
function maxArea(h) {
  let left = 0, right = h.length -1, best = 0;
  while (left < right) {
    let width = right - left;
    let height = Math.min(h[left], h[right]);
    best = Math.max(best, width * height);
    // move the shorter wall, the taller wall is the limiter
    if (h[left] < h[right]) left++;
    else right--;
  }
  return best;
}
```

It feels almost identical to trapping rain water, but here you maximize, there you sum. Both are just two friends walking inward and making a greedy choice. If you see two walls and area, think two pointers.
