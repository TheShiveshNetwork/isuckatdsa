---
title: "Longest Consecutive Sequence"
description: "Finding the longest unbroken chain of numbers without sorting."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["hashing"]
isPinned: false
growthStage: "budding"
chapter: "3.5"
---

### Overview

You and Maya have handled wristbands, guest lists and that decoded trail together at the party and she is finally starting to treat you like a real partner. The drunk locker guy is still asleep, the music is still on, and Maya, the Sherlock cousin on her secret mission, pulls you to a corner and dumps a bag of numbered evidence tags she found in the locker room. `100, 4, 200, 1, 3, 2`. All jumbled, maybe a duplicate or two, order means nothing. She whispers, you two need the longest run where each number is exactly one more than the previous to figure out which lockers were tampered with. Here it is `1, 2, 3, 4`, length 4. She says it casually like it should be easy, classic Maya testing you both.

You could sort the tags together, then walk them in order and count the run. That works, but sorting is O(n log n). The mission brief says do it in O(n). You know from [[foundations/complexity]] that sorting is the expensive messy room that costs `n log n`, and Maya will lose patience while you sort, not a great moment for your duo.

So you two do something lazily clever together. First, pour every tag into the guest list from [[hashing/seen-it-before]]. One cubby per distinct number, no counts needed. That is one pass for both of you, O(n). Now you can answer does `x` exist in O(1) together. Just compute its cubby and check.

Then walk the original tags again with Maya, but only start counting when you know you are at the beginning of a run. How do you know? Check if `x - 1` is in that guest list. If it is, then `x` is not the start, some smaller neighbor will count this same run, so you both skip it. You only bother when `x - 1` is missing. That means `x` is the left edge and you two should pay attention.

From that left edge you both walk forward by value, not by position. Is `x + 1` there? Is `x + 2` there? Keep computing those cubbies until one is missing. That gives you the whole run starting at `x`. Track the longest you and Maya have seen.

```js
// O(n) time, O(n) space - you and Maya find starts, then expand by value
function longestConsecutive(cards) {
  guests = new Set() // guest list you built together for Maya's mission
  for x in cards:
    guests.add(x)

  best = 0
  for x in cards:
    if guests.has(x - 1):
      continue // not the start, smaller neighbor owns this run, you both skip it

    // x is the left edge, you and Maya count forward
    length = 1
    cur = x
    while guests.has(cur + 1):
      cur += 1
      length += 1

    if length > best:
      best = length
  return best
}
```

It looks like a loop inside a loop, so why is it still O(n) for you two? Because each number is part of exactly one run and gets skipped or counted at most once across all starts. You and Maya never recount the same chain from two different starting points. That is the same no-rewatch logic you both liked in [[arrays/sliding-window]] where the camera only moves forward.

A few details worth holding onto while you solve this with Maya:

- The `has(x - 1)` start check is the invariant from [[foundations/core-patterns]] restated as you both only start when you are the smallest in your neighborhood. That one line is what turns O(n²) into O(n) and makes Maya raise her eyebrows at you.
- Using a Set and not a frequency map is deliberate, same choice as [[hashing/seen-it-before]]. You do not care how many times `1` appears for the mission, one checkmark is enough.
- You and Maya do not need a separate visited set. The start check already guarantees you only expand once per run. Fewer pockets, as [[foundations/core-patterns]] keeps reminding you both, is better. Maya will be more impressed by less code, not more.

If the question says "consecutive without sorting" or "longest run where each step is plus one," you and Maya do not sort. You build the guest list together, find only the left edges, and walk forward by value.

