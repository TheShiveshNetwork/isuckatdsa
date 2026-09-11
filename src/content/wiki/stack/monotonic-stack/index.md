---
title: "Monotonic Stack"
description: 'Keeping a pile that only ever goes one direction, so you can peek at what''s "next bigger."'
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["stack"]
isPinned: false
growthStage: "sprouting"
chapter: "5.2"
---

### Overview

Remember Anna's tower in [[stack]]? So far we just piled anything. Now Anna gives you a rule. The tower must always stay tidy. Either always increasing from bottom to top, or always decreasing. No zigzag allowed. If you push something that breaks the order, you have to kick plates off the top until order is restored.

That tidy tower is called a monotonic stack. Monotonic is a fancy word for one direction. Increasing means each plate on top is bigger than the one below it. Decreasing means each plate on top is smaller. Pick one and stick to it.

Why be so strict? Because then the top of the tower always tells you something useful instantly.

Imagine a line of people standing in queue by height. The question everyone keeps asking is "who is the next taller person in front of me?" The dumb way is the handshake way from [[foundations/core-patterns]] - every person asks every person ahead of them, O(n squared). Anna's tidy tower does it in one walk, O(n).

Here is the mental movie. You walk the line left to right. Your tower will keep people who are still waiting for a taller person. You keep it decreasing, meaning taller people stay at bottom, shorter on top.

- You meet a new person `x`.
- While the tower top is shorter than `x`, that top person just found their next taller person, and it is `x`! Pop them and write down `x` as their answer. They can leave the tower, they are done waiting.
- After kicking out everyone shorter, push `x` onto the tower. Now `x` is also waiting for someone taller in the future.
- People left in the tower at the end? They never found a taller person ahead of them.

Walk `[2, 1, 5, 3]` with a decreasing tower:

- 2 -> tower `[2]`, waiting
- 1 -> tower `[2, 1]`, still decreasing, 1 waits
- 5 -> oh big guy. Top 1 is shorter than 5, pop 1, answer for 1 is 5. Top 2 is also shorter than 5, pop 2, answer for 2 is 5. Push 5 -> tower `[5]`
- 3 -> tower `[5, 3]`, both still wait. End. 5 and 3 have no taller ahead.

That while loop is the entire secret. You push once, you pop at most once, so every person enters and leaves the tower only once. O(n) even though there is a loop inside a loop.

When to pick which order?

- To find next greater element, keep tower decreasing. You are waiting for something bigger to kick out smaller tops.
- To find next smaller element, keep tower increasing. You are waiting for something smaller to kick out bigger tops.

```c++
// next greater element - tower stays decreasing
// waiting for a taller person to come
function nextGreater(arr) {
  tower = [] // stores indices, not values, so you know positions
  answer = array of -1 size n // -1 means no taller ahead

  for i in 0 .. n-1:
    while tower.length > 0 and arr[tower.top()] < arr[i]:
      j = tower.pop() // j was waiting, i is taller
      answer[j] = arr[i] // or i if you need distance
    tower.push(i) // i also starts waiting
  return answer
}

// flip the sign and you get next smaller
// while tower.top() > arr[i]  -> increasing tower
```

This is not a separate trick. This is THE trick behind [[stack/daily-temperatures]] which is just next greater with days, and [[stack/largest-rectangle-in-histogram]] which uses both next smaller on left and right to find how wide a building can stretch. Learn this one tower walk and you unlock three problems at once.

If you see the words next greater, next smaller, previous greater, previous smaller, or nearest warmer, taller, bigger - do not do nested loops. Bring the tidy tower.
