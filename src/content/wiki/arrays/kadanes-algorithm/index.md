---
title: "Kadane's Algorithm"
description: "Deciding moment by moment whether to keep your streak or start fresh."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["arrays"]
isPinned: false
growthStage: "budding"
chapter: "1.4"
---

### Overview

Remember back in [[foundations/core-patterns]] when we said "state" is basically just whatever is in your pockets as you walk down the street? Now this is getting serious, partner. Put on your shiniest fake gold chain, grab a suspiciously good fake ID, and follow me, because we're going straight into a Vegas casino.

Instead, I'm going to introduce you to two characters who are going to casually solve **Maximum Subarray Sum** and **Maximum Subarray Product** during one relaxed lap around the casino floor. Now that we're partners, keep these two in your tiny little heads all the time because they might be important for our future endeavours together. Okay crybaby, let's walk in.

## The Gambler and His Assistant

Imagine you're walking through a Vegas casino with a gambler. Every round, he either wins some money or loses some. Sometimes he's on a great run, sometimes he's having an absolutely terrible night.

There's an assistant walking behind him too. She's not playing. She's just keeping track of everything that's happening. Every time the gambler wins or loses, she updates his running total in her little black notebook.

The interesting part is what happens when the gambler starts doing badly.

### The Gambler

Let's say he's been winning for a while, but then things go south and his running total becomes negative. Now another round starts.

He has a choice: carry that negative total into the new round, or forget the old streak and pretend this is a fresh start.

Obviously, if you're already in debt, you probably don't want to walk into the next round carrying that debt with you.

That's what the Gambler is doing as he walks through the casino. At every round he's basically asking:

> *Am I better off keeping what I've got, or should I just forget the past and start again here?*

If the old streak is helping, he keeps it. If it's hurting him, he dumps it and starts fresh.

That's `currentSum`.

```c++
// The Gambler decides whether to keep his streak or start fresh
currentSum = max(nums[i], currentSum + nums[i]);
```

### The Assistant

The Assistant has a much less stressful job. She just keeps track of how the gambler is doing. And she's very encouraging and supportive about it.

If he reaches a new high, she writes it down. If he loses money afterwards, she doesn't cross that old number out. It's already happened. In short she just keeps track of the highest win the Gambler has gotten in the casino yet.

Say he gets up to `10`, then loses a few rounds and falls back to `4`. The Gambler is currently sitting at `4`, but the Assistant still has `10` in her notebook.

That's `maxSum`.

```c++
// The Assistant keeps track of the best score so far
maxSum = max(maxSum, currentSum);
```

So while the Gambler is busy worrying about **"Should I keep going?"**, the Assistant is quietly keeping track of **"What's the best he's done so far?"**

And that's really the whole relationship.

---

## The Rules of the Casino

Before we go any further, here's how this casino works:

* The gambler moves through every round in order.
* A streak has to be **continuous**. He can't skip a bad round.
* At any point, he can throw away his old streak and start a new one.

---

## The Golden Rule: Ditch the Debt

There's really only one thing you need to remember here:

> **If what you're carrying behind you is negative, ditch it.**

If the Gambler is already in the red, taking that loss into the next round isn't helping. Starting from the new round gives him a better position.

So he keeps walking through the casino, making that same little decision every time:

```c++
// O(n) - one lap around the casino
for (int i = 1; i < nums.size(); i++) {
    currentSum = max(nums[i], currentSum + nums[i]);
    maxSum = max(maxSum, currentSum);
}

return maxSum;
```

The first line is the Gambler. The second line is the Assistant.

And Dr Watson, that is how Sherlock built his memory palace to remember Kadane's algorithm.

## Well, One Small Rule at the Entrance

When you enter the casino, you always have to start from table 1. The casino doesn't let you walk in, play nothing, and call that your best score. You have to play at least one round.

Starting at `0` would basically mean the Gambler never played at all. Nice try, but the casino isn't falling for it.

So the starting point becomes:

```c++
int currentSum = nums[0];
int maxSum = nums[0];
```

## The Magic Mirror: Maximum Product Subarray

Now the floor manager changes the game. We're not adding anymore. We're multiplying.

And this is where things get a little weird and magical. All this time the Gambler actually had a magic mirror with him. This mirror could flip his biggest loss yet into his biggest win. He couldn't have used this in addition, but now that rules are changed he smiles.

With multiplication, a loss can actually become useful. Imagine the Gambler has a really bad negative result. Normally we'd be happy to throw that away. But if another negative comes along, the two negatives can turn into a big positive.

So the Assistant has to keep track of his **worst** loss yet too, to turn it into his biggest win.

```c++
// The Assistant keeps track of both the best and worst results
int maxProd = nums[0];
int currMax = nums[0];
int currMin = nums[0];

for (int i = 1; i < nums.size(); i++) {
    // 🪞 Negative numbers can flip the two
    if (nums[i] < 0) {
        swap(currMax, currMin);
    }

    currMax = max(nums[i], currMax * nums[i]);
    currMin = min(nums[i], currMin * nums[i]);

    maxProd = max(maxProd, currMax);
}

return maxProd;
```

If you remember the Gambler and his Assistant, you don't really need to memorise Kadane's algorithm. You can just replay the little casino scene in your head.

