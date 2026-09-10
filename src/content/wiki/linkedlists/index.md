---
title: "Linked Lists"
description: "A treasure hunt where each clue points to the next."
createdAt: 2026-09-07
updatedAt: 2026-09-10
tags: ["linkedlists"]
isPinned: true
growthStage: "budding"
chapter: "4"
---

### Overview

Remember the apartment building from [[arrays]]? You could knock on door 42 directly, no walking needed. That is great, until the manager says you are not allowed to know the door numbers anymore.

Now you are at a night festival. Someone left a trail of paper lanterns for you. Each lantern has two things: a number scribbled on it, and a little arrow drawn at the bottom pointing to where the next lantern is hidden. The first lantern is tied to the entrance gate. That is your `head`. The last lantern points to nothing, just air. That is `null`.

You cannot jump to lantern 5. You have to start at the gate, read 0, follow its arrow to 1, then to 2, and so on. You can only walk forward, one arrow at a time. That is a linked list. A chain, not a building.

A lantern in code looks like this: a little box with `val` and `next`. `val` is the number on it, `next` is the arrow.

```js
// a single lantern
lantern = { val: 7, next: pointer to next lantern }
```

Why would anyone build something so annoying? Because inserting in the middle of an apartment building means shifting everyone one floor down, O(n) shuffling you saw in [[foundations/complexity]]. With lanterns, you just erase one arrow and draw a new one, O(1). You pay for that flexibility with access. No random jump, only a walk.

That tradeoff is the whole chapter. Arrays give you instant jump, painful insert. Lantern trails give you instant insert, painful walk.

Every trick in this chapter is just a clever way to walk that trail without getting lost, without losing arrows, and without writing ugly special cases for the first lantern.

Here is your map for the trail:

- [[linkedlists/dummy-node-trick]] - hammer a fake lantern before the first real one so the first lantern stops being special
- [[linkedlists/fast-and-slow-pointers]] - send two friends on the same trail, one sprints two steps, one strolls one step, useful things fall out of the gap between them
- [[linkedlists/in-place-reversal]] - walk and flip every arrow behind you, but hold the next lantern before you flip or you lose the trail
- [[linkedlists/merging-sorted-lists]] - two sorted lines of kids, zip them together by always picking the smaller head
- [[linkedlists/remove-nth-from-end]] - remove the nth lantern from the end when you do not even know how long the trail is
- [[linkedlists/palindrome-linked-list]] - check if the numbers on the trail read the same forwards and backwards when you are only allowed to walk forward

If you felt good in [[foundations/core-patterns]] about sentinel cones, piggy banks and bouncers, you will see all of them again here. Just on a darker, more fun festival trail.

Carry a small flashlight. Watch your arrows.
