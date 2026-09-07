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

Imagine the sliding window to be a camera frame. Yes we are gonna call it a camera frame and you have a long train in front of you. Each bogie has a number painted on it. The train is so long you cannot see it all at once, so you hold up a rectangular camera frame and you only see the bogies inside the frame.

That frame is your window. The left edge is where your frame starts, the right edge is where it ends. And you do not lift the camera and put it down again for every new view. You just slide it. That is the whole trick.

Think back to [[arrays/prefix-sum]] where you wrote the running total in a notebook so you never re-add. Sliding window is what you do when you do not even need the notebook. You just keep the frame moving.

You will use two moves, and that is it:

- **Grow the frame** - slide the right edge one bogie to the right. You let one more bogie into the picture. Your sum, your count, whatever you track, goes up by that bogie.
- **Shrink the frame** - slide the left edge one bogie to the right. You kick one bogie out of the picture. Your sum goes down.

With just those two moves you never restart. A naive double loop would re-watch the same bogies again and again like rewinding a video. You just keep the camera rolling. That is how O(n²) becomes O(n).

There are two ways you will use this camera:

- **Fixed window** - your frame size never changes, like a photo booth that always fits exactly k bogies. You slide it one step at a time. Use it when the question says exactly k consecutive.
- **Variable window** - your frame breathes. You keep growing to the right until you break a rule, then you shrink from the left until you are valid again. Like you are told the total weight in the frame must stay under K.

```
# variable window - longest subarray with sum <= K
# frame is [left, right], both start at left
left = 0
sum = 0
best = 0
for right in 0 .. n-1:
  sum += arr[right]        # grow frame - include new bogie on right
  while sum > K:
    sum -= arr[left]       # shrink frame - kick out left bogie
    left += 1              # slide left edge
  best = max(best, right - left + 1)  # how wide is the frame right now?
return best
```

This is the same frame you will pick up again in [[strings/sliding-window-on-strings]] when the train is made of letters, and in [[intervals/merge-intervals]] when the train is a timeline. Whenever the problem says contiguous, put the camera on. Do not rewind.
