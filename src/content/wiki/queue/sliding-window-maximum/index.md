---
title: "Sliding Window Maximum"
description: "Tracking the biggest value in a moving window efficiently."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["queue"]
isPinned: false
growthStage: "sprouting"
chapter: "6.3"
---

### Overview

You already own two tricks. The camera frame from [[arrays/sliding-window]] that slides over the train, and the rude bodybuilder line from [[queue/monotonic-deque]] that always keeps the strongest at the front. This problem is where they finally meet and it suddenly feels like you invented something clever.

Here is the problem in one sentence. You have a train of numbers, you have a fixed size camera frame of width k, you slide it one bogie at a time, what is the biggest number inside the frame at every position?

```
arr = [1, 3, -1, -3, 5, 3, 6, 7], k = 3

window [1, 3, -1] -> max 3
window [3, -1, -3] -> max 3
window [-1, -3, 5] -> max 5
window [-3, 5, 3] -> max 5
window [5, 3, 6] -> max 6
window [3, 6, 7] -> max 7

answer = [3, 3, 5, 5, 6, 7]
```

You could be naive. For each window scan all k numbers and find the max. That is O(n * k). With n = 100000 and k = 50000 you are dead, same double loop trap from [[foundations/core-patterns]] you have been avoiding since arrays.

You could be slightly clever and use a heap like in [[heap/top-k-elements]]. Push k numbers into a max heap, slide window, remove old numbers lazily. That is O(n log k). Better but still paying log cost and dealing with lazy deletes. Interviewer will say can you do O(n)?

Yes, with the rude line.

Picture the frame as a real window with curtains that moves right one step at a time. Inside that window you maintain that rude decreasing line from last page. The line only holds numbers that are still inside the window, and it only holds useful candidates in decreasing order. The front of the line is always the max for that window, so answering each window is just looking at the front, O(1).

Walk the example so it sticks. We store indexes, not values, so we know who walked out.

```
arr = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
deque holds indexes, values shown in brackets
```

- i = 0, val 1: deque empty, push 0. deque = [0(1)]
- i = 1, val 3: back is 1, 1 < 3 so kick 0. push 1. deque = [1(3)]
- i = 2, val -1: back is 3, 3 > -1 so keep. push 2. deque = [1(3), 2(-1)]. Window [0..2] ready, front is index 1 value 3, answer 3.

Now slide:

- i = 3, val -3: back -1 > -3 keep. push 3. deque = [1(3),2(-1),3(-3)]. Front 1 is still inside window [1..3], answer 3.
- i = 4, val 5: back -3 < 5 kick 3, back -1 < 5 kick 2, back 3 < 5 kick 1. deque empty, push 4. deque = [4(5)]. Window [2..4] max 5. See how 5 kicked everyone? They were all weaker and older, useless while 5 is here.
- i = 5, val 3: back 5 > 3 keep. push 5. deque = [4(5),5(3)]. Check front 4 inside [3..5] yes, answer 5.
- i = 6, val 6: back 3 < 6 kick 5, back 5 < 6 kick 4. push 6. deque = [6(6)]. Window [4..6] max 6.
- i = 7, val 7: back 6 < 7 kick 6, push 7. deque = [7(7)]. Window [5..7] max 7.

Each index entered once and left once. Total O(n). No rescanning.

The code is just those two moves from last page, plus the out-of-window check:

```c++
function slidingWindowMax(arr, k):
  deque = []  // stores indexes, values decreasing
  ans = []

  for i in 0 .. arr.length - 1:
    // 1. kick weaker people from back
    while deque.length > 0 and arr[deque[deque.length - 1]] < arr[i]:
      deque.popBack()

    deque.pushBack(i)

    // 2. kick front if it walked out of window
    // window is [i - k + 1 .. i], so front out if deque[0] < i - k + 1
    // simpler: front is out if it equals i - k
    if deque[0] < i - k + 1:
      deque.popFront()

    // 3. window is full, answer is front
    if i >= k - 1:
      ans.push(arr[deque[0]])

  return ans
```

Some people write the out-of-window check as `if deque[0] == i - k:` then pop. Same thing. The point is you check front before answering, because front might be from 5 steps ago and no longer inside the curtains.

Three mistakes that ruin this beautiful trick and how to avoid them:

- Storing values instead of indexes. Then you cannot tell if front value 5 is the one that left the window or a new 5. Store indexes, compare with `arr[index]` when you need values. This is the number one bug.

- Kicking with wrong sign. For max you kick while back < new. For min you kick while back > new. Flip the sign and you get the opposite answer and you will stare at it for an hour.

- Forgetting to pop out-of-window front. Without this, your deque keeps a ghost max from way behind the window and your answer is suddenly too big.

Notice the family connection. [[arrays/sliding-window]] taught you the frame. [[stack/monotonic-stack]] taught you kicking weaker guys in a pile to find next greater. [[queue/monotonic-deque]] taught you the same kicking but in a line that can leave from both ends. This page just puts the frame around the line. No new idea, just two old friends hugging.

If you close your eyes now, you should see the camera frame sliding over the train, and inside it the rude line where every new strong guy kicks weaker guys at the back, and the guy at the front smiling because he knows he is the max until he walks out. That image is the whole algorithm.

Next time a question says k consecutive or window or subarray of size k and asks for max or min, you do not scan, you do not heap, you bring the rude line and slide the window. Done.
