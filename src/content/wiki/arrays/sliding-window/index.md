---
title: "Sliding Window"
description: "A moving camera frame that grows or shrinks over a sequence."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["arrays"]
isPinned: false
growthStage: "budding"
chapter: "1.2"
---

### Overview

Now imagine. You've got a really long train in front of you. So long you can't see the whole thing at once even if you tried. Each bogie has a number painted on it. Since you can't see everything, you take out your camera, and you only look at whatever bogies happen to be inside it right now.

That frame is your window. Yes, we're really doubling down and comparing a sliding window to a camera frame. Everything is fair in love and war and dsa. The left edge is where it starts, the right edge is where it ends. But there is a condition, you never pick the camera up and place it down somewhere new. You just slide it along. That's it. That's the entire idea, and it feels almost too simple once you see it.

Think back to [[arrays/prefix-sum]], where you kept a running total in a notebook so you never had to add the same numbers twice. Sliding window is what happens when you don't even need the notebook anymore. You just move the frame, and the frame keeps track of things for you as it goes.

You only get two moves here, nothing fancier than this:

- **Grow the frame** - push the right edge one bogie further. One new bogie enters the picture. Whatever you're keeping track of, a sum, a count, anything, goes up because of that bogie.
- **Shrink the frame** - push the left edge one bogie forward. One bogie leaves the picture. Your total goes back down.

That's the whole toolkit. And because you only ever move forward, you never go back and look at the same bogie twice. A basic double loop keeps rewatching stuff it already saw, kind of like replaying the same five seconds of a video because you weren't paying attention the first time. This trick skips all of that. You just keep moving forward, and that's exactly how a slow O(n²) approach turns into a much faster O(n) one.

There are two versions of this camera you'll run into:

- **Fixed window** - the frame size never changes. Think of it like a photo booth that only ever fits exactly k bogies, no more, no less. You just slide it forward one step at a time. Use this whenever a question says something like "exactly k in a row."
- **Variable window** - the frame can grow and shrink as needed. You keep letting more bogies in until something breaks a rule, then you start kicking bogies out from the left until things are okay again. Like if you're told the total weight inside the frame can't go past some limit K, so you grow until it's too heavy, then shrink until it's fine again.

```c++
// variable window - longest subarray with sum <= K
// frame is [left, right], both start at left
left = 0
sum = 0
best = 0
for right in 0 .. n-1:
  sum += arr[right] // grow frame - include new bogie on right
  while sum > K:
    sum -= arr[left] // shrink frame - kick out left bogie
    left += 1 // slide left edge
  best = max(best, right - left + 1) // how wide is the frame right now?
return best
```

You'll see this exact same frame again in [[strings/sliding-window-on-strings]], except now the train is made of letters instead of numbers, and again in [[intervals/merge-intervals]], where the train is really just a timeline pretending to be something else. Whenever a problem mentions something staying together in a row, that's your cue. Feel the cameraman or cameragirl inside you.
