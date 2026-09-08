---
title: "Sliding Window on Strings"
description: "Longest substring without repeats and minimum window substring."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["strings"]
isPinned: false
growthStage: "budding"
chapter: "2.3"
---

### Overview

Remember that camera frame on the train from [[arrays/sliding-window]]? Keep it. Just repaint the train. Now each bogie is a letter, not a number. The frame works exactly the same.

You slide the same way: grow the right edge, shrink the left edge. The only thing that changes is what you count inside the frame.

Two classics you will meet here:

**Longest substring without repeats** - your frame must never have a duplicate letter. You grow to the right, and the moment you see a letter you already have in the frame, you shrink from the left until that duplicate is kicked out. You track the widest the frame ever got.

**Minimum window substring** - you grow until you have everything you need, then you try to shrink as much as possible to make it minimal. Grow until valid, shrink until not valid, keep the smallest valid you saw.

It is the same two moves from that hallway. Grow, shrink, remember best.

```c++
// same camera, now letters - longest without repeat, O(n) time
function longestWithoutRepeat(s) {
  seen = set() // what is inside the frame?
  left = 0
  best = 0
  for right in 0 .. n-1:
    while s[right] in seen:
      seen.remove(s[left]) // shrink until duplicate gone
      left++
    seen.add(s[right]) // grow
    best = max(best, right - left + 1)
  return best
}
```

You already walked this train in [[arrays/sliding-window]]. Strings just change the cargo. If you see substring and contiguous, put the camera on. Same walk.
