---
title: "Daily Temperatures"
description: "How many days until it gets warmer than today."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["stack"]
isPinned: false
growthStage: "sprouting"
chapter: "5.3"
---

### Overview

This is [[stack/monotonic-stack]] wearing a weather costume. Same tower, same movie, just the people now have thermometers.

You are given temperatures for days: `[73,74,75,71,69,72,76,73]`. For each day you have to answer: how many days until a warmer day comes? If no warmer day ever comes, answer 0.

The dumb way is the nested loops handshake from [[foundations/core-patterns]]. For day `i`, go look at `i+1`, `i+2` till you find warmer. That is O(n squared) and you will burn in this heat.

Anna's tidy tower from [[stack/monotonic-stack]] does it in one walk. Instead of values, the tower now holds days that are still waiting for a warmer day. And the tower stays decreasing in temperature, meaning colder days sit on top.

Mental movie, walk the days left to right:

- You meet a new day `i` with temperature `t`.
- Look at the top of the tower. If the day on top is colder than `t`, then `t` is exactly the warmer day that top day was waiting for! Pop it, answer for that old day is `i - oldDay` - the gap in days.
- Keep popping while top is colder. All those days just found their answer and can leave.
- Now push `i` onto the tower. This day also starts waiting for someone warmer in the future.

That is literally the whole code. While top is colder, pop and compute distance. Then push.

Walk `[73,74,75,71,69,72,76,73]`:

- Day 0 (73): tower `[0]`, waiting
- Day 1 (74): 73 < 74, pop 0, answer[0] = 1 - 0 = 1. Push 1 -> `[1]`
- Day 2 (75): 74 < 75, pop 1, answer[1] = 2 - 1 = 1. Push 2 -> `[2]`
- Day 3 (71): 75 > 71, still decreasing, push -> `[2,3]`
- Day 4 (69): push -> `[2,3,4]`
- Day 5 (72): 69 < 72 pop 4 answer[4]=1, 71 < 72 pop 3 answer[3]=2, push 5 -> `[2,5]`
- Day 6 (76): 72 < 76 pop 5 answer[5]=1, 75 < 76 pop 2 answer[2]=4, push 6 -> `[6]`
- Day 7 (73): push -> `[6,7]`. End. Days 6 and 7 never find warmer, stay 0.

```c++
// Anna's heat waiting list - O(n) time, O(n) space
function dailyTemperatures(temps) {
  n = temps.length
  answer = array of 0 size n // 0 means never warmer
  tower = [] // stack of indices, waiting days

  for i in 0 .. n-1:
    while tower.length > 0 and temps[tower.top()] < temps[i]:
      j = tower.pop() // day j was waiting for warmer
      answer[j] = i - j // how many days later?
    tower.push(i) // today starts waiting
  return answer
}
```

Why indices and not temperatures in the tower? Because you need to compute distance `i - j`. If you only store temperatures, you know it got warmer but you do not know when. Always store indices in these waiting problems, you can always look up the value with `temps[index]`.

Two cousins you will instantly recognize now:

- [[stack/valid-parentheses]] used the tower to match lids. Here it matches cold days with future warm days.
- [[stack/largest-rectangle-in-histogram]] also waits, but waits for a shorter building to come so it can finally calculate area.

If the question is next warmer, next taller, next greater, and it asks how many steps or what is the value, do not scan ahead. Push cold days, pop when warm arrives, distance is your answer. One walk, every day pushed once, popped once.
