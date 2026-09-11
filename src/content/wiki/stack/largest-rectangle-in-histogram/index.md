---
title: "Largest Rectangle in Histogram"
description: "Finding the biggest box that fits under a skyline."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["stack"]
isPinned: false
growthStage: "sprouting"
chapter: "5.4"
---

### Overview

Picture Anna's canteen again. She lined up steel walls along the counter with heights `[2,1,5,6,2,3]`. Between every two walls you could slide a tablecloth under. How big is the biggest rectangular tablecloth that can sit flush under this skyline without poking out?

A rectangle is just picking one wall as the shortest wall, then stretching left and right as far as shorter walls let you. Pick the wall of height 5 at index 2. To its left, wall 1 is shorter so you stop. To its right, wall 2 is shorter so you stop. So with 5 as minimum, width is 1, area is 5. Not huge. The best one here uses height 2 stretched wide, area 10.

Brute force tries every wall as minimum and scans left and right each time, O(n squared). Anna's tidy tower from [[stack/monotonic-stack]] does it in one walk, O(n).

The key idea: a wall's rectangle ends exactly where a shorter wall appears on left and right. So for each wall, you want previous smaller and next smaller. Those two boundaries tell you the stretch. Monotonic stack finds both in one go.

Keep a tower that stays increasing from bottom to top. Meaning heights go `1,2,3`. Why increasing? Because you are waiting for a shorter wall to come and end the stretch.

Walk the walls left to right, with a fake wall of height 0 at the end so everyone gets popped:

- You meet new wall `i` with height `h`.
- While top of tower is taller than `h`, that top wall just found its next smaller wall and it is `i`! Time to calculate its rectangle before it leaves. Pop it, call it `mid`  height `heights[mid]`.
- Its left boundary is the new top after popping. If tower empty, it can stretch to start 0. If not empty, it stretches just after `tower.top()`.
- Its right boundary is `i`, the current shorter wall, not inclusive.
- Width = `i - left - 1`, Area = `height[mid] * width`, keep best.
- After kicking out all taller tops, push `i` onto tower. Now `i` waits for someone shorter.
- Keep walking.

It feels like magic until you replay it.

Walk `[2,1,5,6,2,3]` plus fake `0` at end:

- Tower `[]`, i0 height 2 -> push 0 -> `[0]`
- i1 height 1 -> top 2 > 1, pop 0. Mid height 2. Left empty so left = -1. Right = 1. Width = 1 - (-1) -1 =1. Area 2*1=2 best 2. Push1 -> `[1]`
- i2 height5 -> push -> `[1,2]`
- i3 height6 -> push -> `[1,2,3]`
- i4 height2 -> top 6 >2 pop3 height6 left2 width 1 area6 best6. Top5 >2 pop2 height5 left1 width2 area10 best10. Push4 -> `[1,4]`
- i5 height3 -> push -> `[1,4,5]`
- i6 fake0 -> pop5 height3 area3, pop4 height2 width4 area8, pop1 height1 width6 area6. Best stays 10.

```c++
// biggest tablecloth under skyline - O(n) time, O(n) space
function largestRectangle(heights) {
  heights.push(0) // fake short wall to flush everyone out
  tower = [] // increasing stack of indices
  best = 0

  for i in 0 .. heights.length -1:
    while tower.length > 0 and heights[tower.top()] > heights[i]:
      mid = tower.pop() // this wall's right boundary is i
      h = heights[mid]
      left = tower.length == 0 ? -1 : tower.top()
      width = i - left - 1 // stretch between smaller walls
      best = max(best, h * width)
    tower.push(i) // i waits for shorter wall
  return best
}
```

Three things to remember so you never forget:

1. Increasing tower -> waiting for shorter. Decreasing tower -> waiting for taller. Here we want next smaller, so increasing. Flip from [[stack/daily-temperatures]] which wanted next greater.
2. Store indices not heights, because you need left and right positions to compute width.
3. Add that fake 0 at the end. Without it, walls like `[1,2,3]` that never meet a shorter wall would stay stuck in the tower and never get their area calculated.

This same waiting logic solves trapping rain water in a different way and also the maximal rectangle in a matrix. If you can find previous smaller and next smaller in one walk, you can find biggest rectangle. That is the whole story.
