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

You know that train from [[arrays/sliding-window]]? Now imagine each bogie is painted red, white, or blue, all mixed up. You need the train to be all red, then white, then blue, in one walk, without an extra track to park them. That is the Dutch flag.

You do it with three sections forming right in front of you as you walk the same train. Think of the train splitting into three parts while your camera frame moves.

- Left part is already sorted red. You know it is done.
- Right part is already sorted blue.
- Middle part is white you are still figuring out, and the walker `mid` is your camera's center.

Your walker stands at `mid`. If it sees red, you swap that bogie to the left wall and both `low` and `mid` step forward. If it sees white, you just let the camera slide forward. If it sees blue, you swap it to the right wall and the right wall moves in, but you do not move `mid` yet because the new bogie that landed at `mid` is still unknown.

It is the same two-pointer walk you met in [[arrays/two-pointers]], just with three pointers now, and it is the cleanest example of [[foundations/core-patterns]] in-place modification. You tidy the same train, you do not build a second one.

```c++
// one walk on the same train, O(n) time, O(1) extra space
function dutchFlag(arr) {
  low = 0      // left wall - everything before this is red
  mid = 0      // your camera - current bogie
  high = arr.length - 1  // right wall - everything after is blue
  while (mid <= high) {
    if (arr[mid] == 0) {
      swap(arr[low], arr[mid])  // red bogie to left part
      low++
      mid++
    } else if (arr[mid] == 1) {
      mid++  // white stays in middle, just slide
    } else {
      swap(arr[mid], arr[high])  // blue bogie to right part
      high--  // do not move mid yet, new bogie is unknown
    }
  }
}
```

You will use this same three-wall trick whenever you need to partition without extra space.
