---
title: "Prefix Sum + HashMap"
description: 'Remembering past running totals to answer "did this happen before?"'
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["hashing"]
isPinned: false
growthStage: "budding"
chapter: "3.4"
---

### Overview

In [[arrays/prefix-sum]] you walked once with a notebook and wrote down the running total at every step. `prefix[i]` meant sum of the first `i` numbers, and any stretch `l` to `r` became `prefix[r+1] - prefix[l]`. Two page flips, no re-adding. Maya and you used it to add up clues quickly at the party, and Maya pretended she understood, but she was impressed anyway.

Now Maya pulls you deeper into her Sherlock-family mission at the same party. The drunk locker guy has left a long trail of numbered chits along the hallway, some are real clues, some are decoys with negative numbers to throw you off. Maya whispers the code she needs to crack is `K`. She asks you, how many continuous stretches of this trail, anywhere in the middle, sum to exactly `K`? Not from the start, any length, any position. Those decoy negatives matter, and Maya missed that detail completely.

You could try to check every start and every end for Maya, that is the double loop from [[foundations/core-patterns]]. It works, but it is O(n²) and you and Maya would be counting stretches while the party moves on. Not a good look when you two are supposed to be the detective duo.

The camera frame from [[arrays/sliding-window]] would be nice here, but it only works when all numbers are positive, so shrinking the frame actually makes the sum smaller. With decoy negatives that trick breaks and you and Maya would miss valid stretches even though you counted so carefully together.

So you and Maya combine two things you already know: the running total notebook and the complement check from [[hashing/complement-lookup]].

You walk once with Maya, keeping a running total `pref` as you step along her trail. At every chit you ask your cubbies: how many times have we seen a past total equal to `pref - K`?

Why that value? If you both once had a running total of `pref - K` and now you have `pref`, the stretch between those two checkpoints sums to `K`. Think of it like tracking the locker numbers you and Maya computed earlier. You were at 10 together at checkpoint A, now you are at 17 at checkpoint B, the numbers you walked between must sum to 7. If Maya's code `K` is 7, you want to count how many times you both previously were at 10.

So your cubbies here do not store the numbers themselves. They store how many times each running total has appeared for you and Maya. That count part is exactly the tally sheet from [[hashing/frequency-map]] that you made when counting wristbands for her.

```js
// one walk with notebook plus tally sheet for you and Maya - O(n) time, O(n) space
function countSubarraysWithSumK(nums, k) {
  tally = new Map() // running_total -> how many times you and Maya saw it
  tally.set(0, 1)   // the empty prefix before you both started
  pref = 0
  ans = 0

  for x in nums:
    pref += x               // update running total like prefix notebook
    need = pref - k         // which past total would form a K stretch ending here?
    if tally.has(need):
      ans += tally.get(need) // every past need is a valid start for you and Maya

    // now save current pref for future stretches
    if tally.has(pref):
      tally.set(pref, tally.get(pref) + 1)
    else:
      tally.set(pref, 1)
  return ans
}
```

That `tally.set(0, 1)` at the top is the little traffic cone from [[foundations/core-patterns]] that you and Maya place before the trail even starts. It handles stretches that begin from the very first chit. Without it you would both miss the case where the prefix itself equals `K`, because you need an empty start to subtract from. Do not skip the cone, even if Maya says it looks unnecessary.

Notice how familiar this is for your duo. The complement idea `need = target - me` from [[hashing/complement-lookup]] became `need = pref - k`. The tally sheet is the same as counting wristbands. The running total is the same notebook from prefix sums. Three old tools, one walk, and Maya thinks you two are doing magic together.

The same walk helps you both with a few cousins:

- Sum equals K when decoys are allowed? Already handled, your notebook does not care about sign.
- Count stretches where sum is divisible by K or xor equals K for Maya's next code? Same walk, you both just store remainder or xor prefix instead of sum.
- Longest stretch with sum K? You both store the first time you saw each running total, then compute distance.

Whenever Maya asks "how many continuous stretches sum to K" and those sneaky negatives might appear, do not try the camera frame together. Keep a running total and ask your tally sheet if `pref - k` has shown up before.

