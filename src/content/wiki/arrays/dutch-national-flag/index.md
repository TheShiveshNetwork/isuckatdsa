---
title: "Dutch National Flag"
description: "Sorting three buckets of stuff in one pass without extra space."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["arrays"]
isPinned: false
growthStage: "budding"
chapter: "1.5"
---

### Overview

Imagine you have a pile of red, white, and blue balls all mixed up. Dutch flag style. You need them sorted as red, then white, then blue, in one pass, without a new bucket. This is the problem, and it is also the name.

You do it with three pointers, which you already met in [[arrays/two-pointers]]. Think of three sections forming as you walk:

- Left section is all red (0s)
- Middle section is white (1s) you are still figuring out
- Right section is blue (2s)

You have a walker in the middle. If it sees red, you swap it to the left. If it sees blue, you swap it to the right. If it sees white, you just move forward.

```js
// one pass, O(n) time, O(1) space - no extra array
function dutchFlag(arr) {
  let low = 0, mid = 0, high = arr.length - 1;
  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]]; // red to front
      low++; mid++;
    } else if (arr[mid] === 1) {
      mid++; // white stays middle
    } else {
      [arr[mid], arr[high]] = [arr[high], arr[mid]]; // blue to end
      high--;
    }
  }
}
```

It is the poster child for [[foundations/core-patterns]] in-place modification. You tidy the same apartment, no new apartment. You will use this idea again when you need to partition without extra space.
