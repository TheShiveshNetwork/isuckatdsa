---
title: "Monotonic Deque"
description: "A line that kicks out anyone weaker than the newest arrival."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["queue"]
isPinned: false
growthStage: "sprouting"
chapter: "6.2"
---

### Overview

Remember the normal queue from [[queue]]? Anyone can join at the back, anyone at the front leaves. It is fair but dumb. It does not care who is taller, stronger or richer. First come first served, that is it.

Now imagine a much more rude line outside the canteen. This line has one strict rule. The line must always stay in decreasing order from front to back. The strongest person is at the front, then slightly weaker, then weaker, and so on. No weak person is allowed to stand behind an even weaker person if a strong person just arrived. Why? Because that weak person will never get to be the strongest while the new strong person is still in line.

This is a monotonic deque. Monotonic just means it only ever goes one direction. If it is decreasing, it never goes up. If it is increasing, it never goes down. The deque part means it can kick people from both ends, which a normal queue cannot.

The picture that never leaves your head is this: a line of bodybuilders waiting for protein shakes. New guy walks in at the back. He looks forward and says I am stronger than the last guy, so that last guy is useless while I am here. That last guy leaves the line, embarrassed. New guy looks again, I am also stronger than the new last guy, that guy leaves too. He keeps doing this until the person in front of him is stronger than him, or the line is empty. Then he stands at the back. The line is again perfectly decreasing.

That kicking out of weaker people at the back is the whole trick. And the front is always the strongest person in the entire line. You can answer who is the maximum in O(1) just by looking at the front.

Why would you ever need such a rude line? Because of the camera frame from [[arrays/sliding-window]]. When that frame slides one step, the old front leaf might leave and a new leaf enters. You need to know the biggest leaf inside the frame instantly, without scanning the whole frame. The rude line does it.

Let us walk a small example. Numbers are strength. We want a decreasing line.

```
arr = [3, 1, 2]
start empty deque = []

new 3 arrives: line empty, just stand. deque = [3]

new 1 arrives: last is 3, 3 > 1 so 1 is weaker but that is fine,
               decreasing allows 3 then 1. deque = [3, 1]

new 2 arrives: last is 1, 2 > 1 so 1 is useless while 2 is here.
               kick 1 from back. deque = [3]
               now last is 3, 3 > 2 so stop. deque = [3, 2]
```

See? 1 got kicked because 2 is bigger and arrived later. 1 would never be the maximum while 2 is still in the window, and 2 stays longer because it came later. So 1 is dead weight.

The same works for increasing line where you kick anyone bigger than the new arrival, then front is always the minimum. You pick direction based on whether you need max or min.

Here is the skeleton you will use everywhere. This is for decreasing, so front is max:

```c++
// rude line that stays decreasing, front is always max
deque = []  // double ended, can pop from both ends

function push(x):
  // kick weaker people from the back
  while deque.length > 0 and deque[deque.length - 1] < x:
    deque.popBack()  // you are useless while I am here
  deque.pushBack(x)  // now stand at back

function popIfFrontIs(x):
  // when window slides, the person leaving might be at front
  if deque.length > 0 and deque[0] == x:
    deque.popFront()

function getMax():
  return deque[0]  // front is strongest, O(1)

function getMin():
  // if you needed min instead, flip the < to > in push
  // while back > x, pop back
```

A few things to burn into memory so you never mess up in an interview:

- This is not a normal queue. It is a deque because you kick from the back but you also remove from the front when the window slides. Normal queue can only leave from front, cannot kick from back. So you need both ends. That is why it is called monotonic deque and not monotonic queue.

- You store indexes in real problems, not just values. Why? Because when the window slides, you need to know if the front guy has walked out of the frame. If you only stored value 5, you would not know if that 5 is the old 5 that left or a new 5 that just arrived. Storing index tells you position. In the next page [[queue/sliding-window-maximum]] you will see we store indexes and also check `deque[0] == left - 1` to know if front is out of window.

- Compare with [[stack/monotonic-stack]]. That pile also kicks people, but it kicks from the top and it is used for next greater element, not for a sliding window. Monotonic stack looks forward to the future. Monotonic deque looks at the current window. Same rude kicking idea, different shape. Stack is vertical, deque is horizontal.

One line to remember: while back is weaker than new guy, kick back. That one loop is the entire monotonic deque. Everything else is just upkeep.

If you can picture that line of bodybuilders where every new strong guy kicks weaker guys ahead of him at the back, you have understood monotonic deque forever. Next page we just put a camera frame around this line and we get sliding window maximum for free.
