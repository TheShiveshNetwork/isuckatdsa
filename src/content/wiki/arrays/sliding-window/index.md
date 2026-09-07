---
title: "Sliding Window"
description: "A moving camera frame that grows or shrinks over a sequence."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["arrays"]
isPinned: false
growthStage: "budding"
chapter: "1.2"
---

### Overview

Remember prefix sums from [[foundations/core-patterns]] where you wrote down running totals? Sliding window is its cooler cousin. Imagine a camera frame over the building. You slide it right, you grow it when you need more, you shrink it when you have too much.

You do not restart the video from the beginning every time. You just move the left and right edges. That is how you go from O(n²) to O(n).

There are two flavors you will use:

- **Fixed window** - frame size never changes. You just slide it. Like finding the best consecutive k days.
- **Variable window** - you grow until you break a rule, then shrink until you are valid again.

```js
// variable window - longest subarray with sum <= K
function longest(arr, K) {
  let left = 0, sum = 0, best = 0;
  for (let right = 0; right < arr.length; right++) {
    sum += arr[right]; // grow frame to the right
    while (sum > K) {
      sum -= arr[left]; // shrink from left until valid
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

You will see this frame again in [[strings/sliding-window-on-strings]] and [[intervals/merge-intervals]]. If the problem says contiguous subarray or substring, put the camera on.
