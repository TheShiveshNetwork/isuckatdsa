---
title: "Queue & Deque"
description: "A ticket counter line - first come, first served."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["queue"]
isPinned: true
growthStage: "sprouting"
chapter: "6"
---

### Overview

You just finished playing with a pile of plates in [[stack]]. Last plate you put on is the first one you take off. Great for undo buttons and brackets, terrible for fairness.

Now walk to your college canteen at 12:59. Lunch rush is about to start. There is a single guy giving out samosas at the counter. If he served the last person who arrived first, the first person who arrived at 12:30 would still be standing there at 3 pm while the cool kids who came late keep cutting ahead. That is a stack. Real life does not work like that. Real life forms a line.

A queue is that line. First come, first served. The person at the front was waiting longest, so they eat first. You join at the back, you leave from the front. That is it. Two ends, two jobs.

```
queue = []
enqueue(x)  // join the back of the line - push at tail
dequeue()   // person at front leaves - pop from head
peek()      // who is at the front without leaving
```

The boring name for this is FIFO, first in first out. Stack was LIFO, this is the opposite twin. If you remember plates vs line, you already remember both.

Why does this boring line matter so much that it gets its own chapter? Because a lot of computer work is about fairness and about level by level spreading.

- Your printer queue is literally this line. Five people hit print, the printer does not pick the fanciest document, it prints who came first.
- The canteen guy giving samosas is your CPU doing round robin. Everyone gets a turn in order.
- And the big one for interviews, BFS in [[graphs/bfs-vs-dfs]] is just this line in disguise. You meet five people at a party. You talk to all five before you meet their friends. That level by level walk is only possible because you remembered the next people in a queue.

Now add one twist. What if the line is allowed to grow from both ends? Like a metro bogie that has doors on the front and the back and people can get in or out from either side. That is a deque, pronounced deck, short for double ended queue.

```
deque.pushBack(x)   // join at back like normal queue
deque.pushFront(x)  // sneak in at front like VIP entry
deque.popBack()     // leave from back
deque.popFront()    // leave from front like normal queue
```

A deque can act like a stack if you only use one end, or like a queue if you use opposite ends. It is the Swiss army knife. Every queue trick in this chapter actually uses a deque, not a plain queue.

So picture this one image and you will never forget:

Stack is a pile of plates in the canteen kitchen. Queue is the student line outside waiting for those plates. One is vertical and unfair, one is horizontal and fair.

Here is your map for the line:

- [[queue/queue-via-two-stacks]] - the classic interview scam where you fake a fair line using two unfair piles. You only have plates but you need to run a fair counter. This one teaches you how pouring one pile into another reverses order.
- [[queue/monotonic-deque]] - the line that bullies itself to stay sorted. Every new person kicks out weaker people behind them so the front is always the strongest. This is the muscle behind the next page.
- [[queue/sliding-window-maximum]] - the camera frame from [[arrays/sliding-window]] is back, but now you want the biggest bogie in every window and you cannot rescan every time. You solve it with that bully line.

If [[stack]] was about remembering what to undo last, this chapter is about remembering who to serve next. One pile, one line. Done.
