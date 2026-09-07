---
title: "Array Grab Bag"
description: "Move Zeroes, Next Permutation, Missing Number - quick common patterns."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["arrays"]
isPinned: false
growthStage: "budding"
chapter: "1.10"
---

### Overview

Some array tricks show up so often they deserve their own little shelf, even if they do not fit neatly into one pattern. Think of this as the junk drawer that actually has useful junk.

You have already met the moves that make these work: in-place swapping from [[foundations/core-patterns]], a single walk, and a sprinkle of math.

**Move Zeroes** - slide non-zeroes forward like we did in [[foundations/core-patterns]] in-place modification, then fill the rest with zeroes. One walk, O(1) space.

```js
let p = 0;
for (let x of arr) if (x !== 0) arr[p++] = x;
while (p < arr.length) arr[p++] = 0;
```

**Next Permutation** - find the next bigger ordering. Walk from right, find the first dip, swap with the next bigger on the right, then reverse the tail. It is the same `next_permutation` you saw in [[foundations/cpp-stl]].

**Missing Number** - numbers 0 to n with one missing. Sum the expected `n*(n+1)/2` and subtract what you have, or xor everything. Both are just accumulation from [[foundations/core-patterns]].

If you see an array problem that feels like a one-off trick, it probably lives here. Do not memorize each trick. Remember the move: one walk, in-place, and a little math.
