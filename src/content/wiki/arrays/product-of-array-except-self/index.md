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

This one is the same train, but now it is a riddle. For each bogie, you need the product of every other bogie, but the conductor says no dividing and you cannot borrow a second train.

So you do what you did with the notebook in [[arrays/prefix-sum]], just with multiplication. First walk: you go left to right and you remember the product of everything before you. You write that down. Second walk: you go right to left and you remember the product of everything after you, and you multiply.

Picture the train again. Each bogie whispers to the next: hey, the product before me was this, pass it on. Then on the way back, they whisper the product after me.

Two walks on the same train, no extra train except the answer you must return.

```c++
// two walks, O(n) time, O(1) extra space - answer does not count
function productExceptSelf(arr) {
  n = arr.length
  ans = array(n, 1)
  left = 1
  for i in 0 .. n-1:
    ans[i] = left  // product of all bogies before me
    left *= arr[i] // update for next bogie
  right = 1
  for i in n-1 .. 0:
    ans[i] *= right  // multiply by product of all bogies after me
    right *= arr[i]
  return ans
}
```

No division, no extra train. It is just prefix and suffix thinking from [[foundations/core-patterns]] and the same notebook idea from [[arrays/prefix-sum]], just with a different operation.
