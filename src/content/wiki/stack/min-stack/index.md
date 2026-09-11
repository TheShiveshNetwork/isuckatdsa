---
title: "Min Stack"
description: "A pile of plates that also remembers its lightest plate at all times."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["stack"]
isPinned: false
growthStage: "sprouting"
chapter: "5.5"
---

### Overview

Anna upgraded. Her plate tower now has a display screen that must always show the lightest plate in the tower. You push a plate, pop a plate, and at any time someone asks `getMin()` and you must answer instantly, O(1). No peeking through the whole tower, no sorting.

The tower itself from [[stack]] still only lets you touch the top, but now every plate has weight written on it. The dumb way is to scan all plates on every `getMin`, O(n). The smart way is to make the tower remember the minimum for you as you build it, so looking it up is as cheap as `peek`.

There are two equally good stories for this, pick whichever you like more. Both are O(1) for push, pop, top, and getMin.

## Story 1 - Two towers side by side

Keep your normal tower for plates. Keep a second tiny tower just for minimums, call it `minTower`. It stores only the best minimum so far, not all plates.

- Push `x`: push `x` onto normal tower. For `minTower`, push `min(x, minTower.top())`. If `minTower` empty, push `x`. So `minTower.top()` is always the minimum of everything below.
- Pop: pop from both towers together. The minimum automatically rewinds to previous best.
- getMin: just peek `minTower.top()`.

Walk `push 5, push 2, push 4`:

- push 5: plates `[5]`, mins `[5]` -> min is 5
- push 2: plates `[5,2]`, mins `[5,2]` -> min is 2
- push 4: plates `[5,2,4]`, mins `[5,2,2]` -> min is still 2
- pop: both pop -> plates `[5,2]`, mins `[5,2]` -> min back to 2
- pop again -> plates `[5]`, mins `[5]` -> min back to 5

You used extra space but it is dead simple and never fails. Your interviewer will accept this happily.

```c++
// two towers - simplest to remember
minStack = []
plates = []

function push(x) {
  plates.push(x)
  if minStack.length == 0: minStack.push(x)
  else minStack.push(min(x, minStack.top()))
}
function pop() {
  minStack.pop()
  return plates.pop()
}
function top() { return plates.top() }
function getMin() { return minStack.top() } // O(1)
```

## Story 2 - One tower with pairs

Instead of two towers, store a pair on each level: `[value, minSoFar]`. Each plate carries a sticky note that says "the lightest plate from bottom till me is this". Same logic, just squeezed into one tower.

```c++
// one tower with sticky notes
tower = [] // each entry is [value, minTillHere]

function push(x) {
  if tower.length == 0: tower.push([x, x])
  else tower.push([x, min(x, tower.top()[1])])
}
function pop() { return tower.pop()[0] }
function top() { return tower.top()[0] }
function getMin() { return tower.top()[1] } // peek sticky note
```

Both do the same work. Two towers is easier to picture, one tower with pairs is slightly tidier in code. Pick one and stick to it.

Why does this matter? Because `getMin` in O(1) shows up everywhere. Next you will see sliding window minimum with deque in [[queue]], and min tracking is the baby version of that. And remember [[stack/monotonic-stack]] also kept a tidy tower but for ordering, here we keep a tiny notebook of minimums. Different notebook, same idea - let the tower remember so you do not scan.

If someone says design a stack with getMin in constant time, do not scan. Keep the second tower or the sticky note. That is the whole answer.
