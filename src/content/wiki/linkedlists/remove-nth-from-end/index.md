---
title: "Remove Nth From End"
description: "Counting from the back without knowing the length up front."
createdAt: 2026-09-07
updatedAt: 2026-09-10
tags: ["linkedlists"]
isPinned: false
growthStage: "budding"
chapter: "4.5"
---

### Overview

You are back on the festival trail from [[linkedlists]]. Someone says remove the 2nd lantern from the end. Trail is 1 -> 2 -> 3 -> 4 -> 5, answer should be 1 -> 2 -> 3 -> 5. You removed 4.

Easy if you know the length. Length 5 minus 2 is index 3 from the front, just walk 3 steps and delete. But the puzzle says you can only walk the trail once, and you do not know the length until you hit `null`. You cannot jump to index `length - n` because `length` is still unknown.

You could walk once to count length, walk again to delete. Two passes. It works, but the interviewer will smile and say do it in one pass. And if the head itself is the one to delete, you will need the dummy trick from [[linkedlists/dummy-node-trick]] anyway.

So you cheat with a gap.

Think of two friends starting together at the dummy, not at head. You give the front friend a head start of `n+1` lanterns. Then you send both walking together one step at a time until the front friend falls off the end. At that moment, where is the back friend?

Exactly one before the lantern you want to delete.

Why `n+1` and not `n`? Because you need to land on the lantern before the target, so you can do `cur.next = cur.next.next` to skip it. If you kept only `n` gap, you would land on the target itself and you have no previous arrow to rewire, especially tricky when the target is head.

Walk it with 1 -> 2 -> 3 -> 4 -> 5, remove 2nd from end (4), so n == 2.

```
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
fast starts at dummy, moves 3 steps (n+1) to 2
slow still at dummy
now move both:
fast 2, slow dummy
fast 3, slow 1
fast 4, slow 2
fast 5, slow 3
fast null, slow 3 -> slow.next is 4, delete it
```

Same code shape you saw in [[linkedlists/fast-and-slow-pointers]] where fast runs ahead, but now the distance is fixed on purpose.

```js
// one pass, O(n) time, O(1) space
function removeNthFromEnd(head, n) {
  dummy = { val: 0, next: head } // so head deletion is not special
  fast = dummy
  slow = dummy
  // give fast n+1 head start
  for i in 0 .. n:
    fast = fast.next // n+1 steps ahead

  // walk together until fast falls off
  while fast != null:
    fast = fast.next
    slow = slow.next

  // slow is before target, skip it
  slow.next = slow.next.next
  return dummy.next
}
```

That `for` loop that moves fast `n+1` times is the whole insight. Everything else is walking together which you already know.

Three places people slip:

- Starting at `head` instead of `dummy`. Then deleting the first lantern needs a special `if` and you forget it. Start at dummy.
- Moving fast `n` instead of `n+1`. Then `slow` lands on the target, not before it, and `slow.next = slow.next.next` skips the wrong one.
- Not checking that `fast` might become `null` during the head start when `n` equals length. With dummy it still works, you just delete `dummy.next`. Without dummy you crash.

This gap trick is not just for deletion. Whenever a problem says "kth from the end" and you cannot jump like in [[arrays]], think gap of k between two walkers. Find kth from end, rotate list, whatever, it is the same head start.

If you remember the image of two friends with a fixed rope of length `n+1` between them walking to the end, you will never need two passes again. And you already know why the dummy is there, it is the cone from [[foundations/core-patterns]] that makes the head behave like any other lantern.
