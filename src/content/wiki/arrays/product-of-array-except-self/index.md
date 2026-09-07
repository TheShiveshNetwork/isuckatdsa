---
title: "Product of Array Except Self"
description: "Multiplying everything except yourself, without dividing."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["arrays"]
isPinned: false
growthStage: "budding"
chapter: "1.7"
---

### Overview

This one feels like a riddle. For each house in the building from [[arrays]], you need the product of every other house, but you are not allowed to divide and you cannot use a second building.

The trick is to use the prefix idea from [[arrays/prefix-sum]], but for products. You walk left to right and remember the product of everything before you. Then you walk right to left and multiply by the product of everything after you. Two walks, no extra building except the answer.

Think of it like everyone whispers the product to the next person.

```js
// O(n) time, O(1) extra space (answer does not count)
function productExceptSelf(arr) {
  let n = arr.length;
  let ans = Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) {
    ans[i] = left; // product of all before me
    left *= arr[i];
  }
  let right = 1;
  for (let i = n -1; i >=0; i--) {
    ans[i] *= right; // multiply by product of all after me
    right *= arr[i];
  }
  return ans;
}
```

No division, no extra array besides answer. It is just prefix and suffix thinking from [[foundations/core-patterns]] applied to products.
