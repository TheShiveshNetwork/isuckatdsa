---
title: "Merging Sorted Lists"
description: "Zipping two (or many) sorted lines together into one."
createdAt: 2026-09-07
updatedAt: 2026-09-10
tags: ["linkedlists"]
isPinned: false
growthStage: "budding"
chapter: "4.4"
---

### Overview

The festival from [[linkedlists]] now has two separate trails. Both are already sorted by the number on each lantern, small to big. Trail A: 1 -> 3 -> 5. Trail B: 2 -> 4 -> 6. You need to zip them into one sorted trail, reusing the same lanterns, no new lanterns except the one fake you are going to plant.

You could dump all numbers into an array, sort, rebuild. That is O(n log n) and you just ignored the fact that they are already sorted, which is exactly what [[sorting/efficient-sorts]] told you not to do. Merge should be O(n).

Think of two queues of kids at the candy stall. Both queues are already tallest to shortest. You are the teacher with a new empty queue. You look at the front kid of each queue, pick the smaller one, tell them to join your queue. You repeat. You never go deeper than the front of each queue. Because both queues are sorted, the front is always the smallest remaining.

That is merging. You need two pointers `p` and `q` on the heads of the two trails, a `dummy` from [[linkedlists/dummy-node-trick]] as the start of your answer trail, and a `tail` pointer that always points to the last lantern of your answer.

```js
// merge two sorted trails, O(n) time, O(1) extra space
function mergeTwoTrails(a, b) {
  dummy = { val: 0, next: null }
  tail = dummy
  p = a
  q = b
  while p != null && q != null:
    if p.val < q.val:
      tail.next = p // pick p, it is smaller
      p = p.next
    else:
      tail.next = q // pick q
      q = q.next
    tail = tail.next // move tail to the lantern you just attached
  // one trail may still have leftovers, just attach the rest
  if p != null: tail.next = p
  else: tail.next = q
  return dummy.next // real head is after dummy
}
```

Why `dummy` again? Because your answer trail starts empty. Without a dummy you would need an ugly `if answerHead == null` check for the very first pick. With dummy, the first pick and the hundredth pick look identical: `tail.next = pick; tail = tail.next`. You already learned this cone in [[foundations/core-patterns]] and [[linkedlists/dummy-node-trick]].

Two pitfalls:

- Do not create new lanterns with `new Node(p.val)`. Just rewire `tail.next`. The problem says reuse, and new nodes waste space and break the in-place idea from [[foundations/core-patterns]].
- Do not forget to move `tail` after attaching. If you forget, you keep overwriting `tail.next` and your chain stays length 1.

Now what about k trails? Festival has 8 queues, not 2. Same idea, just greedier. You could merge them one by one: merge A+B, then merge that result with C, and so on. That works but it is slow because the same early lanterns get walked many times.

Better: either merge in pairs like a tournament bracket, or use a heap from [[heap/merge-k-sorted-lists-heap-version]]. Put the head of each trail into a min-heap keyed by `val`. Pop the smallest, attach it to `tail`, push its `next` into the heap. Same zip logic, just the front kid is now the smallest among k fronts. The dummy and tail part does not change.

If you remember one image for this whole page, it is this: two sorted lines, one teacher always taking the smaller front kid. No sorting, just picking. That pick is O(1) per lantern, so the whole zip is O(n). And it is the same merge step hiding inside merge sort from [[sorting/efficient-sorts]], you just finally saw it on lanterns.
