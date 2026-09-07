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

You know how you hate adding the same numbers over and over? Prefix sum is your notebook. You walk the building once from [[arrays]] and you write down the running total at each floor. After that, sum of any range is just subtraction. No more loops.

Think of it as leaving breadcrumbs. `prefix[i]` is the sum of everything before floor `i`. So sum from `l` to `r` is just `prefix[r+1] - prefix[l]`. One walk, many answers.

```js
// one walk to build notebook, O(n) time, O(n) space
let arr = [2, 4, 1, 5];
let prefix = [0];
for (let x of arr) prefix.push(prefix[prefix.length -1] + x);
// prefix is [0,2,6,7,12]

// sum from index 1 to 2 is arr[1]+arr[2] = 4+1 = 5
let sum_1_2 = prefix[3] - prefix[1]; // 7 - 2 = 5, no loop

// with hash map, you can even ask "how many subarrays sum to K?"
// see [[hashing/prefix-sum-plus-hashmap]] for that magic
```

If you see range sum queries or subarray sum equals K, open the notebook. Do not re-add.
