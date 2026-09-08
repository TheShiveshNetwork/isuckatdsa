---
title: "Anagram Check"
description: "Same letters, shuffled into a different order."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["strings"]
isPinned: false
growthStage: "budding"
chapter: "2.2"
---

### Overview

Anagram is just a fancy word for shuffled. Listen and night, same letters, different order. Are two words anagrams? You are really asking do they have the same count of each letter.

You already have the perfect tool for this from [[arrays]] and [[hashing/frequency-map]] - the bouncer's notebook. In [[foundations/core-patterns]] we counted with a map. Do that here, but for letters.

Walk the first word and tally. Walk the second word and subtract. If everything ends at zero, they are anagrams. Or sort both and check if they look the same, but the notebook is faster.

```c++
// bouncer's notebook, O(n) time, O(1) extra space (26 letters)
function isAnagram(a, b) {
  if (a.length != b.length) return false
  freq = map() // 26 letters
  for ch in a:
    freq[ch] = freq.get(ch, 0) + 1  // click
  for ch in b:
    freq[ch] -= 1                   // unclick
    if (freq[ch] < 0) return false  // too many of this letter
  return true
}
```

It is the same frequency map you used in [[arrays/two-sum]] and [[hashing/frequency-map]]. Strings just let the notebook count letters instead of numbers.
