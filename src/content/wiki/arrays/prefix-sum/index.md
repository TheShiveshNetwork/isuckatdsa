---
title: "Prefix Sum"
description: "Keeping a running total so you never have to re-add the same numbers twice."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["arrays"]
isPinned: false
growthStage: "budding"
chapter: "1.3"
---

### Overview

Remember that long train from [[arrays/sliding-window]]? Prefix sum is what you do when you get tired of re-counting the same bogies. Instead of adding 2+4+1 every time someone asks, you walk the train once with a notebook. At each bogie you write down the running total so far.

That notebook is your `prefix`. `prefix[i]` is the total weight of the first `i` bogies before you. You write it once, and after that any question like what is the weight from bogie `l` to `r` is just subtraction. You never walk again. One walk, many answers, same train.

Picture you wrote `0, 2, 6, 7, 12` for `[2,4,1,5]`. Someone asks sum from 1 to 2? You do not re-add 4+1. You just do `prefix[3] - prefix[1]` which is `7 - 2 = 5`. You just flipped two pages in your notebook.

```c++
// one walk to build notebook, O(n) time, O(n) space
arr = [2, 4, 1, 5]
prefix = [0]
for x in arr:
  prefix.push(prefix[prefix.length - 1] + x)
// prefix is now [0, 2, 6, 7, 12] - you wrote it once

// sum from bogie 1 to 2 is just page subtraction
sum_1_2 = prefix[3] - prefix[1] // 7 - 2 = 5, no loop

// with a hash map, your notebook can even answer how many subarrays sum to K
// see [[hashing/prefix-sum-plus-hashmap]] - same notebook, fancier question
```

If a problem keeps asking you for sums over and over, do not be the person re-adding the train every time. Open the notebook. And if the question is contiguous, remember your camera frame from sliding window also lives on this same train - they are family.
