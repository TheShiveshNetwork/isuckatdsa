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

You are still on that same train from [[arrays/sliding-window]], but now every bogie has a number on it. The conductor walks up and says I need two bogies whose numbers add to a target. The slow way is to ask every bogie to shake hands with every other bogie - that is the nested loops walk from [[foundations/core-patterns]] and it is O(n²). You will miss the train doing that.

The faster way is to walk once with the same notebook you used in [[arrays/prefix-sum]], but this time your notebook is a hash map from [[hashing/frequency-map]]. For each bogie, you look at its number and ask the notebook: have I already seen the partner I need? The partner is just `target - current`. If the notebook says yes, you found your pair and you stop. If not, you write this bogie's number down and slide your camera one step forward.

One walk, one notebook. O(n) time, O(n) space, same train.

```c++
// complement lookup - walk once with a notebook
function twoSum(arr, target) {
  seen = new Map() // notebook: number -> where you saw it
  for i in 0 .. n-1:
    need = target - arr[i]
    if seen.has(need) // have I seen the partner before?
      return [seen.get(need), i]  // you two, come here
    seen.set(arr[i], i) // write this bogie down, keep walking
  return null
}
```

And hey, if someone tells you the train is already sorted, you do not even need the notebook. You just put the two walkers from [[arrays/two-pointers]] at both ends and let them walk toward each other. Same handshake, different trick. If it is sorted, use walkers. If not, use the notebook.
