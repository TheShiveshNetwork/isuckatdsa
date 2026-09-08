---
title: "Trapping Rain Water"
description: "How much water sits between buildings of different heights."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["arrays"]
isPinned: false
growthStage: "budding"
chapter: "1.8"
---

### Overview

Close your eyes for five seconds. Picture a hallway in your house. Now line up 12 pillars on the floor from the door to the kitchen. Their heights are `0,1,0,2,1,0,1,3,2,1,2,1`. Some are ankle-high. One in the middle is taller than you.

It starts raining inside the hallway. Don't ask questions, it's your problem your roof was broken. Where does water stay?

Put Sherlock on the left end and Watson on the right end. That is your setup. Sherlock keeps one number in his head, the tallest pillar he has seen so far on the left. Call it `leftMax`. Watson keeps the same for the right, `rightMax`. You hold the bucket `water`.

Now look at the two pillars they are standing on. The shorter one decides. Water cannot rise higher than the shorter of the two tallest walls that cage it, so you always move the shorter side.

This one rule is the whole trick, and it is why you do not need two notebooks like the naive prefix way in [[arrays/prefix-sum]].

Walk the same hallway `0,1,0,2,1,0,1,3,2,1,2,1` with them:

- Sherlock at 0, Watson at 1. Sherlock is shorter, so Sherlock moves. He sees 0, his `leftMax` is 0, no water. He steps in.
- Now Sherlock at 1, Watson at 1. Watson moves. He sees 1, his `rightMax` becomes 1. He steps in.
- Sherlock at 0, Watson at 2. Sherlock is shorter. He sees 0, his `leftMax` is still 1, so this dip holds `1-0 = 1`. You pour it in the bucket. Sherlock steps in.

You just keep doing that until they meet in the middle. You never wrote two arrays. You just let Sherlock and Watson each remember one number.

```c++
// Sherlock and Watson walk the hallway, O(n) time, O(1) extra space
function trap(heights) {
  left = 0              // Sherlock
  right = heights.length - 1  // Watson
  leftMax = 0
  rightMax = 0
  water = 0

  while (left < right) {
    // shorter pillar is the boss, that detective moves
    if (heights[left] < heights[right]) {
      if (heights[left] >= leftMax) leftMax = heights[left]
      else water += leftMax - heights[left]
      left++
    } else {
      if (heights[right] >= rightMax) rightMax = heights[right]
      else water += rightMax - heights[right]
      right--
    }
  }
  return water
}
```

Walk that hallway once in your head and you will see why it works. That is the whole trick.
