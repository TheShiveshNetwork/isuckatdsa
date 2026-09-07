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

Look out the window at a skyline of buildings with different heights. When it rains, water gets trapped in the valleys between them. How much?

For each position, the water it can hold is decided by the tallest building to its left and the tallest to its right. Water level is the smaller of those two, minus its own height. If that number is positive, it traps water. Simple.

You could precompute the tallest left and right for every spot using the prefix idea from [[arrays/prefix-sum]] - that is O(n) space. Or you can be clever and use the two walkers from [[arrays/two-pointers]]. Keep the taller side as the limiter and move the shorter side inward, tracking max on each side as you go. That way you only carry two numbers, not two arrays.

```js
// two pointers, O(n) time, O(1) space
function trap(heights) {
  let left = 0, right = heights.length -1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (heights[left] < heights[right]) {
      if (heights[left] >= leftMax) leftMax = heights[left];
      else water += leftMax - heights[left]; // valley holds water
      left++;
    } else {
      if (heights[right] >= rightMax) rightMax = heights[right];
      else water += rightMax - heights[right];
      right--;
    }
  }
  return water;
}
```

It is the same two-pointer walk you already know, just with a memory of the tallest you have seen. See also [[arrays/container-with-most-water]] - same skyline, different question.
