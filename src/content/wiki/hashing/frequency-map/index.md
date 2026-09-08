---
title: "Frequency Map"
description: "Counting how many times each thing shows up."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["hashing"]
isPinned: false
growthStage: "budding"
chapter: "3.1"
---

### Overview

You found Maya's bag in [[hashing]] by computing her locker number instead of opening every locker. Now Maya is crazy impressed now and she asks you for one more favour. She asks you to open that bag of hers. You open it, and find a lot of wristbands - red, blue, red, red, blue, green, red ...and a lot more. Maya wants to know how many of each color she actually has. Well Maya seems to be dumb, but never mind until she helps us remember these magic tricks.

You could do it the painful way. Pick red, then go through the whole pile to count reds. Then pick blue and scan everything again. That is the nested handshake from [[foundations/core-patterns]]. It works, but the pile is too large, Maya will think you are just being dramatic while you are actually doing O(n²) work.

So, let's try to think it better. Just grab a tally sheet. First time you see red, write red as a heading. Next time you see red, just make a tick under that heading. One pass over the pile, one tick per wristband.

That tally sheet is a frequency map. In code it is a `Map` where the key is what you saw and the value is the tick count. And because it is backed by the same locker trick from [[hashing]], finding the right heading is O(1).

```js
// one pass, one tick per item - O(n) time, O(k) space for k distinct colors
function countBands(bands) {
  tally = new Map() // color -> count in your tally sheet
  for band in bands:
    if tally.has(band):
      tally.set(band, tally.get(band) + 1) // another tick
    else:
      tally.set(band, 1) // new heading
  return tally
}
```

Once the tally sheet is ready, you are now ready for all sort of follow up questions from Maya.

- Which color showed up the most? [[heap/top-k-elements]].
- Are two words anagrams? [[strings/anagram-check]].
- What is the first color that appears only once?

Whenever the question says "how many of each" or "most frequent," do not rescan the pile. Make a tally sheet like Maya did.

