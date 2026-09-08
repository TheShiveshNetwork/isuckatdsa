---
title: "Two Pointers"
description: "Two people walking toward each other (or the same direction) through an array."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["arrays"]
isPinned: false
growthStage: "budding"
chapter: "1.1"
---

### Overview

Put Sherlock on the left end, Watson on the right end. Same hallway you just walked in [[arrays/trapping-rain-water]], but now the job is simpler. The array is sorted, you need two numbers that add to a target.

You could ask everyone to shake everyone else's hand like the nested loops in [[foundations/core-patterns]]. That is O(n²). Do not.

Instead let the sum decide who moves. Put Sherlock at 0, Watson at the end. Look at `arr[Sherlock] + arr[Watson]`. Too big? Watson is too tall, move Watson left. Too small? Sherlock is too short, move Sherlock right. You never need to look at the pairs you skipped, because the array is sorted and you already know they cannot work.

It is the same two detectives, just a different case. No notebook, no extra space.

```c++
// Sherlock and Watson walk toward each other, O(n) time, O(1) space
function twoPointers(arr, target) {
  left = 0              // Sherlock
  right = arr.length - 1  // Watson
  while (left < right) {
    sum = arr[left] + arr[right]
    if (sum == target) return [left, right]  // found them
    if (sum < target) left++   // need bigger, Sherlock moves
    else right--               // need smaller, Watson moves
  }
  return null
}
```

Same idea works when they walk the same direction too, like fast and slow pointers. One runs, one walks. If they meet, you found a cycle. You will see that in [[linkedlists/fast-and-slow-pointers]].

If you see sorted plus pair, put Sherlock and Watson at the ends.
