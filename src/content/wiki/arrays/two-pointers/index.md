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

Picture this. Two friends are in the same apartment building from [[arrays]], but one starts at the top floor and the other at the bottom. They walk toward each other until they meet. That is it. That is two pointers.

You use this when the array is sorted and you need a pair. Instead of checking everyone with everyone like in [[foundations/core-patterns]] nested loops, you let the sum tell you where to move. Too big? Move the right person down. Too small? Move the left person up.

It is the opposite of brute force. You do not look at everything. You let the array guide you.

```
// sorted array, find pair that sums to target - O(n), O(1) space
function twoPointers(arr, target) {
  left = 0
  right = arr.length - 1  // two friends at ends
  while (left < right) {
    sum = arr[left] + arr[right]
    if (sum == target) return [left, right]  // found them
    if (sum < target) left++  // need bigger, move left forward
    else right--              // need smaller, move right back
  }
  return null
}
```

Same idea works walking the same direction too, like fast and slow pointers. One runs, one walks. If they meet, you found a cycle. You will see that again in [[linkedlists/fast-and-slow-pointers]].

If you see sorted + pair, think two walkers.
