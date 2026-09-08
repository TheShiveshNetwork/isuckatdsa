---
title: "Palindrome Check"
description: "Reading the same forwards and backwards."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["strings"]
isPinned: false
growthStage: "budding"
chapter: "2.1"
---

### Overview

Picture your string as that same hallway of pillars from [[arrays/trapping-rain-water]], but now each pillar is a letter. Sherlock and Watson are back. Sherlock at the left end, Watson at the right end. You already know this walk from [[arrays/two-pointers]].

Is the hallway reading the same both ways? Sherlock reads his letter, Watson reads his. If they match, both step inward. If at any point they do not match, it is not a palindrome. That is it. You do not need a new notebook, just two walkers.

```c++
// Sherlock and Watson walk inward, O(n) time, O(1) space
function isPalindrome(s) {
  left = 0              // Sherlock
  right = s.length - 1  // Watson
  while (left < right) {
    if (s[left] != s[right]) return false  // mismatch
    left++   // Sherlock steps in
    right--  // Watson steps in
  }
  return true
}
```

It is literally two pointers you already walked on the train in [[arrays/two-pointers]]. Strings just spell, arrays just count. Same walk.
