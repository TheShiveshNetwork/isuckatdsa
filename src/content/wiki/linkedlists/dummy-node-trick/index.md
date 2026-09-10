---
title: "Dummy Node Trick"
description: "Adding a fake starting point so you never have to special-case the head."
createdAt: 2026-09-07
updatedAt: 2026-09-10
tags: ["linkedlists"]
isPinned: false
growthStage: "budding"
chapter: "4.1"
---

### Overview

The festival trail from [[linkedlists]] has one annoying lantern: the first one.

Every other lantern has someone pointing to it. You can delete it by telling the previous lantern to just point past it. Simple, you just redraw one arrow.

But the first lantern has no previous lantern. It is tied directly to the gate `head`. So every time you write code that might delete or insert at the front, you need an awkward `if head == val` special case. You end up writing the same logic twice, once for head, once for everyone else. That is where bugs love to hide.

You already solved this in [[foundations/core-patterns]] with a traffic cone. You place a cone before the start so you never have to worry about falling off the edge.

Do the same here. Hammer a fake lantern before the real first lantern. Call it `dummy`. It has no real value, maybe 0, but its `next` points to `head`. Now even the first real lantern has a previous lantern, the dummy. There is no special case anymore.

Picture it:

```
before:  head -> [1] -> [2] -> [3]
after:   dummy -> [1] -> [2] -> [3]
           ^ dummy.next == head
```

You now always walk starting from `dummy`, not `head`. When you are done, you return `dummy.next`, which is the real head, possibly changed.

```js
// delete every lantern with value == target, no special case for head
function removeLanterns(head, target) {
  dummy = { val: 0, next: head } // your traffic cone
  cur = dummy
  while cur.next != null:
    if cur.next.val == target:
      cur.next = cur.next.next // skip it, redraw one arrow
    else:
      cur = cur.next // only move when you did not delete
  return dummy.next // new head, whatever it is now
}
```

Why does this feel like magic? Because you turned a head problem into a middle problem. Every operation becomes "look at `cur.next`", you decide to keep it or skip it. You never touch `cur` itself until you are sure.

Three little rules to never forget:

- Create dummy with `dummy.next = head` before anything else.
- Use `cur = dummy` to walk, not `cur = head`.
- Return `dummy.next` at the end, never `head`, because `head` might have been deleted.

It is one extra lantern and it saves you five extra if statements. You will see this cone again in [[linkedlists/merging-sorted-lists]] where you need a starting point for the answer chain, and in [[linkedlists/remove-nth-from-end]] where you need to be able to delete the very first lantern from the back without crying.

If the problem says head might change, delete, insert at front, or you keep checking `if head == ...`, just plant the dummy. It is the cheapest insurance you will ever buy.
