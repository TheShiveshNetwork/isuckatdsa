---
title: "Advanced String Matching"
description: "KMP, Rabin-Karp, and rolling hash - finding a needle in a haystack fast."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["strings"]
isPinned: false
growthStage: "budding"
chapter: "2.5"
---

### Overview

You know the naive way. You have a long haystack and a short needle. You put the needle at the start, check, shift by one, check again. That is like re-reading the same letters over and over, same waste you fixed with [[arrays/prefix-sum]].

These two tricks do for strings what the notebook did for arrays. They let you skip what you already know.

**KMP - The Bouncer Who Remembers Where He Failed.** You build a tiny notebook for the needle itself that says if you mismatch at position `i`, where should you try next without going back. That notebook is the prefix function. After that, you walk the haystack once. When you mismatch, you do not restart, you just look up where to continue. Same walk, no re-reading.

**Rabin-Karp + Rolling Hash - The Fingerprint Trick.** You give every substring of the same length a fingerprint (a hash). Instead of comparing letters one by one, you compare fingerprints. And you do not recompute the fingerprint from scratch for the next window. You slide the camera from [[arrays/sliding-window]] one step, subtract the letter that left, add the new letter, update the hash in O(1). That rolling update is exactly prefix thinking.

```c++
// rolling hash - O(1) to slide, not O(k) to re-hash
windowHash = hash(s[0..k-1]) // first frame
for right in k .. n-1:
  // slide frame one bogie: kick left, add right
  windowHash = windowHash - s[right-k] * power + s[right] * power
  if windowHash == needleHash: // fingerprints match, maybe found
    check letters to be sure
```

You do not need to memorize KMP's table building by heart. Just remember: it is the same idea as not re-adding a prefix sum and not rewinding the camera. Do not re-read what you already know. If a problem says find pattern fast in a long string, think rolling hash or KMP and pick based on whether you need one needle or many.
