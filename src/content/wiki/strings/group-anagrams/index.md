---
title: "Group Anagrams"
description: "Sorting words into families that share the same letters."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["strings"]
isPinned: false
growthStage: "budding"
chapter: "2.4"
---

### Overview

You have a pile of words and you need to sort them into families where each family shares the same letters. Listen, night, enlist - same family, just shuffled.

You already know the trick from [[strings/anagram-check]]. An anagram family is just a frequency signature. Two words are in the same family if they have the same count of each letter, or the same sorted letters. Pick one signature and use it as a locker key from [[hashing]].

You walk the list once. For each word, you make its signature, then you toss the word into the locker for that signature.

```c++
// one walk, one hash map of signatures
function groupAnagrams(words) {
  groups = map() // signature -> list of words
  for w in words:
    key = sorted(w) // or frequency string like "1#0#2..."
    // e.g., "listen" -> "eilnst"
    if not groups.has(key) groups.set(key, [])
    groups.get(key).push(w)
  return groups.values()
}
```

It is the same frequency map you used in [[hashing/frequency-map]] and the same notebook from [[arrays/prefix-sum]], just now the key is a sorted word instead of a number. Arrays count numbers, strings count letters, same notebook.
