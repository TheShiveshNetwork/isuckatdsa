---
title: "Queue via Two Stacks"
description: "Faking a line using two piles of plates."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["queue"]
isPinned: false
growthStage: "sprouting"
chapter: "6.1"
---

### Overview

The canteen decided to be weird. They removed the line markers on the floor and said you can only use tray piles. You have two piles of trays in the kitchen, and both follow stack rules, last tray on is first tray off. But the students still want a fair line, first come first served. Can you fake a fair line using only unfair piles?

This is literally what the interviewer is asking when they say implement a queue using two stacks. They took away your line and gave you two piles. Can you still be fair?

Think of the two piles with real names. Call them Inbox and Outbox.

- Inbox is where new students put their trays. Anyone who arrives, you push onto Inbox. So Inbox is always the newest people on top.
- Outbox is where students leave from. If someone at the front needs to be served, you pop from Outbox. So Outbox has the oldest people on top, ready to leave.

The trick is that pouring one pile into the other reverses the order. You already saw reversal in [[linkedlists/in-place-reversal]]. This is the same magic.

Walk it with real people. Say A, B, C arrive in order.

```
Inbox:  C <- top
        B
        A  <- bottom

Outbox: empty
```

Now someone needs to be served. Outbox is empty, so you do the grand pour. You pop from Inbox one by one and push onto Outbox.

```
pour: C goes to Outbox, then B, then A

Inbox: empty
Outbox: A <- top (oldest, should leave first)
        B
        C  <- bottom (newest)
```

Look at Outbox now. A is on top, exactly who should leave first. You pop A, done. Next serve? B is now on top of Outbox, just pop. No pour needed.

When D, E arrive later, you just push them onto Inbox again.

```
Inbox: E <- top
       D
Outbox: B <- top
        C
```

So the rule is dead simple:

- Enqueue is always `inbox.push(x)`. No thinking.
- Dequeue is `if outbox is not empty, pop outbox`. Only if outbox is empty, pour everything from inbox to outbox, then pop outbox.
- Peek is the same but you look instead of popping.

```c++
// faking a fair line with two unfair piles
inbox = []   // stack, only push and pop at top
outbox = []  // stack, only push and pop at top

function enqueue(x):
  inbox.push(x)  // new person always goes to inbox pile

function pourIfNeeded():
  if outbox.length == 0:
    while inbox.length > 0:
      outbox.push(inbox.pop())  // pouring reverses order

function dequeue():
  pourIfNeeded()
  if outbox.length == 0: return null  // line empty
  return outbox.pop()  // oldest person leaves

function peek():
  pourIfNeeded()
  if outbox.length == 0: return null
  return outbox[outbox.length - 1]

function isEmpty():
  return inbox.length == 0 and outbox.length == 0
```

Why do we only pour when outbox is empty? This is where people get it wrong and pour every time. If you pour every time, you keep reversing back and forth and you lose the order. You only pour when outbox has run out of old people and you need fresh old people from inbox. Be lazy. Lazy is correct here.

Think of the time cost. Each tray is moved at most twice, once from inbox to outbox, once out of outbox. So even though one dequeue might feel expensive because you poured 100 trays, the next 99 dequeues are free pops. On average it is O(1). We call this amortized O(1) which is just a fancy way of saying the expensive pour pays for many cheap pops later. Same idea you saw in [[arrays]] when an apartment building doubles in size sometimes.

One picture to lock it forever: Inbox is the entrance gate where people enter and stack up. Outbox is the serving counter where people leave. The floor between them is the pour. You only carry trays across the floor when the counter is empty.

Bonus connection, the reverse trick exists too. You can fake a stack using two queues, but that one is just a party trick. This inbox outbox pattern is the one that actually shows up in interviews and in real code when a language only gives you stacks but you need BFS in [[graphs/bfs-vs-dfs]] which needs a queue.

If the question says implement queue with stacks, you do not think. You say inbox for entry, outbox for exit, pour only when outbox is empty.
