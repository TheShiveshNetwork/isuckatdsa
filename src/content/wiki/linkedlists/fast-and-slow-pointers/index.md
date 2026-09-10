---
title: "Fast & Slow Pointers"
description: "One runner and one walker on the same track - useful tricks fall out of the gap."
createdAt: 2026-09-07
updatedAt: 2026-09-10
tags: ["linkedlists"]
isPinned: false
growthStage: "budding"
chapter: "4.2"
---

### Overview

You already met Sherlock and Watson in [[arrays/two-pointers]] walking toward each other from both ends. Now they both start at the gate together, on the same festival trail from [[linkedlists]], but one of them had too much festival coffee.

Give Watson one lantern per step. Give Sherlock two lanterns per step. Same trail, same arrows, different speeds. That gap between them is not a bug, it is the tool.

Why does this trick only make sense on lantern trails? Because you cannot jump. If you could jump like in [[arrays]], you would just compute the middle with math. Here you must walk, so letting two walkers walk at different speeds tells you something clever for free.

There are three parties you will use them at. Same two friends, different invitation:

## 1. Is there a loop? Will they meet?

Some prankster tied the last lantern's arrow back to an earlier lantern, making a circle. You walk and you never reach `null`, you just keep going forever.

Send both. Slow moves `slow = slow.next`, fast moves `fast = fast.next.next`. If there is no loop, fast hits `null` and you know it is a straight trail. If there is a loop, fast is going in circles inside the loop and slow will eventually walk into that loop too, and because fast is faster, fast will lap slow from behind. If they ever point to the same lantern, there is a loop.

```js
// does the trail have a loop? O(n) time, O(1) space
function hasLoop(head) {
  slow = head
  fast = head
  while fast != null && fast.next != null:
    slow = slow.next         // one step
    fast = fast.next.next    // two steps
    if slow == fast:
      return true // met inside the circle
  return false // fast fell off the trail, no circle
}
```

Think of a running track. If one person laps the other, the track must be circular.

## 2. Where is the middle?

You want the middle lantern without counting the length first.

Let fast start at head, slow at head. While fast can still move two steps, move both. When fast reaches the end, slow is in the middle.

Why? Fast covers twice the distance in the same number of steps. When fast has done the whole trail, slow has done half.

```js
// find middle, second middle if even length
function findMiddle(head) {
  slow = head
  fast = head
  while fast != null && fast.next != null:
    slow = slow.next
    fast = fast.next.next
  return slow // middle lantern
}
```

If the trail has 5 lanterns, slow lands on 3. If it has 6, slow lands on 4, the second middle. Start fast at `head.next` if you want the first middle. Same walk, tiny shift.

This is the helper you need for [[linkedlists/palindrome-linked-list]] and for splitting a chain in merge sort.

## 3. Where does the loop start?

They met somewhere inside the loop, but not necessarily at the entrance. Now you want the entrance.

Keep slow where they met. Move fast back to `head`. Now move both one step at a time. Next time they meet, it is the entrance.

It sounds like magic but it is just distance math. Distance from head to entrance plus distance from entrance to meeting point lines up exactly. You do not need to memorize the proof, just remember the dance: meet once fast, reset fast to head, walk together slow.

```js
// if hasLoop found meeting point, find entrance
function findLoopStart(head) {
  slow = head
  fast = head
  // first meeting
  while fast != null && fast.next != null:
    slow = slow.next
    fast = fast.next.next
    if slow == fast: break
  if fast == null || fast.next == null: return null

  // second walk together
  fast = head
  while slow != fast:
    slow = slow.next
    fast = fast.next
  return slow // entrance of loop
}
```

All three tricks share the same code shape: `while fast != null && fast.next != null`. If you forget that check, fast will try to do `null.next` and you will crash into a fallen lantern.

Whenever a problem says "middle", "nth from end", "cycle", "loop", or "do it in O(1) space without counting length", do not count. Send the coffee-fueled runner and the stroller together and watch the gap do the work. It is the same two walkers from [[arrays/two-pointers]], just walking the same direction this time.
