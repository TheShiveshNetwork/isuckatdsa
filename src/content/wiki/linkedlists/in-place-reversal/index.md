---
title: "In-Place Reversal"
description: "Flipping the direction of the arrows without extra space."
createdAt: 2026-09-07
updatedAt: 2026-09-10
tags: ["linkedlists"]
isPinned: false
growthStage: "budding"
chapter: "4.3"
---

### Overview

The festival trail from [[linkedlists]] points forward. Gate -> 1 -> 2 -> 3 -> null. Now someone asks you to flip it. Gate -> 3 -> 2 -> 1 -> null. Same lanterns, opposite arrows, no new lanterns allowed. That constraint is from [[foundations/core-patterns]] called in-place modification, rearrange the furniture, do not buy a new house.

It sounds simple until you try it and you realize the moment you flip an arrow, you just lost the trail ahead. If you stand on lantern 1 and you make it point back to where you came from, how do you even get to lantern 2? Its address was stored in the arrow you just erased.

So you bring two helpers. Really three fingers.

Imagine you are walking the trail with two friends. One friend holds the lantern behind you, one friend holds the lantern you are standing on, and you use your free hand to keep pointing at the next lantern before you flip.

Those three pointers are `prev`, `cur`, `nxt`:

- `prev` - the trail you have already flipped, initially `null`
- `cur` - the lantern you are standing on, initially `head`
- `nxt` - the lantern ahead that you have not visited yet, you save it first

One step looks like this:

1. Save `nxt = cur.next` so you do not lose the rest of the trail
2. Flip `cur.next = prev` so cur now points backward
3. Step forward `prev = cur` and `cur = nxt`

That is the whole trick. Three lines inside a loop, repeated until `cur == null`.

```js
// flip the whole trail, O(n) time, O(1) space
function reverseTrail(head) {
  prev = null
  cur = head
  while cur != null:
    nxt = cur.next     // 1. save next before you break it
    cur.next = prev    // 2. flip the arrow
    prev = cur         // 3. step prev forward
    cur = nxt          // 4. step cur forward
  return prev // new head, the old tail
}
```

Walk it mentally for 1 -> 2 -> 3:

- start: prev null, cur 1, nxt 2 | flip 1 to null | prev 1, cur 2
- now: prev 1, cur 2, nxt 3 | flip 2 to 1 | prev 2, cur 3
- now: prev 2, cur 3, nxt null | flip 3 to 2 | prev 3, cur null | done, head is 3

Two mistakes everyone makes: flipping before saving `nxt`, which loses the trail forever, and returning `cur` instead of `prev` at the end. At the end `cur` is `null`, `prev` is the new front. Remember that.

There is a second version you will see when you flip. Sometimes you only need to flip the first `k` lanterns, or flip between positions `left` and `right`. Same three fingers, just stop the loop early and stitch the flipped chunk back to the unflipped ends. You keep a `beforeLeft` pointer and an `afterRight` pointer and reconnect. It is the same move with a little bookkeeping. If you can reverse the whole thing, you can reverse a part.

The reversed trail is also the core of [[linkedlists/palindrome-linked-list]]. You steal the second half, flip it, compare, flip back. It is the same three fingers again.

If you ever blank on the order, replay the festival image: do not flip the arrow until your other hand is already holding the next lantern. Save, flip, step. Save, flip, step. You will never lose the trail.
