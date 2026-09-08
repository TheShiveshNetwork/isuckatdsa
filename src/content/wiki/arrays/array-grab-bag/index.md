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

You have walked the whole train from [[arrays]] - two walkers, a camera frame, a notebook, the whole crew. Now you reach the last bogie. It is not empty. It is the attic. Someone just shoved all the leftover tricks in there that did not fit neatly into one pattern but show up too often to ignore. This is that attic. Your brain will thank you for peeking inside before an interview instead of meeting these tricks cold.

Put Sherlock and Watson to the side for a second. You will not need both of them here. Each trick in this attic is just one remix of moves you already know from [[foundations/core-patterns]] - one walk, tidy in place, a little math. Let me give you the three that actually matter and a way to picture each so you do not have to memorize them.

**Move Zeroes - The Bouncer Who Hates Empty Spots.** Picture the train again, but some bogies are empty and marked `0`. The conductor says push all real passengers to the front, keep their order, and leave the empty bogies at the back. You do not rent a second train. You walk once with a single pointer `p` that marks where the next real passenger should sit. Every time you see a non-zero, you slide it to `p` and move `p` forward. When you reach the end, you just fill the tail with zeroes.

```c++
// one walker, same train, O(1) extra space
p = 0  // where next real bogie should sit
for x in arr:
  if x != 0:
    arr[p] = x  // slide good bogie forward
    p++
while p < arr.length:
  arr[p] = 0  // fill empty bogies at back
  p++
```

That is in-place modification you already met, just with a single walker.

**Next Permutation - The Next Bigger Ticket Number.** Imagine your train number is `1,2,3` and you need the very next bigger number you can make by shuffling the digits, like `1,3,2`. You walk the train from the back until you find the first dip where `arr[i] < arr[i+1]`. That dip is the hinge where you can make it bigger. You then swap that hinge bogie with the smallest bogie on its right that is bigger than it, and then you reverse the tail after the hinge to make it as small as possible. It is exactly the `next_permutation` you saw in [[foundations/cpp-stl]], but now you know why it works.

**Missing Number - The Piggy Bank With a Hole.** The train should have tickets `0` to `n` but one is missing. You know what the total should be. For `0` to `n`, the expected sum is `n*(n+1)/2`. That is just accumulation from [[foundations/core-patterns]]. Walk once, add up what you actually have, subtract, and the missing ticket pops out. Or xor everything together - same piggy bank idea, you are just cancelling pairs instead of adding them. One walk, a little math, no extra train.

If a problem feels like a weird one-off, check this attic first. Do not memorize each trick as a new rule. Ask yourself: can I do it in one walk, tidy in place, and use a little math? If yes, it lives here.
