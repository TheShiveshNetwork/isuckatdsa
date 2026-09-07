---
title: "Two Sum"
description: "Finding two numbers that shake hands to make a target."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["arrays"]
isPinned: false
growthStage: "budding"
chapter: "1.6"
---

### Overview

You are at that party again from [[foundations/complexity]]. Everyone has a number on their chest. You need two people whose numbers add to a target. The naive way is to ask everyone to shake everyone's hand - that is nested loops from [[foundations/core-patterns]] and it is O(n²).

Here is the smarter way. Walk once and carry a notebook from [[hashing/frequency-map]]. For each person, you ask the notebook: have I seen the partner I need? The partner is just `target - current`. If yes, you are done. If not, you write the current person down and keep walking.

One walk, one notebook. O(n) time, O(n) space.

```js
// complement lookup - the hash map trick
function twoSum(arr, target) {
  let seen = new Map(); // notebook: number -> index
  for (let i = 0; i < arr.length; i++) {
    let need = target - arr[i];
    if (seen.has(need)) return [seen.get(need), i]; // found partner
    seen.set(arr[i], i); // write yourself down
  }
  return null;
}
```

If the array were sorted, you would not even need the notebook. You would use the two walkers from [[arrays/two-pointers]] instead. Same handshake, different tool. Pick based on sorted or not.
