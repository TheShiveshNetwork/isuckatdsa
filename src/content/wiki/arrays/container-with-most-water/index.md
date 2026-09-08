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

Before, in [[arrays/trapping-rain-water]], you filled every dip. Now you get to pick only two pillars to be the walls of one big container. You want the biggest container. Amount is width between them times the height of the shorter wall. Same pillars, different question.

Close your eyes again. Sherlock at the left end, Watson at the right end. That is the widest container you can make. Now look at the two pillars they touch. Water is limited by the shorter one, so moving the taller one inward can only make things worse. You would lose width and keep the same short limit. So you move the shorter side, hoping the next pillar is tall enough to make up for the width you lost.

That is it. You keep the best you have seen and keep moving the shorter detective.

```c++
// Sherlock and Watson hunt the biggest bucket, O(n) time, O(1) space
function maxArea(h) {
  left = 0               // Sherlock
  right = h.length - 1   // Watson
  best = 0
  while (left < right) {
    width = right - left
    height = min(h[left], h[right]) // limited by shorter wall
    best = max(best, width * height)
    // move the limiting wall, keep the taller one
    if (h[left] < h[right]) left++
    else right--
  }
  return best
}
```

Walk that hallway once and you will see why it works. That is the whole trick.
