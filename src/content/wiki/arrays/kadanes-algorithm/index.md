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
 
Remember back in chapter 0.2 when we said "state" is basically just whatever junk is in your pockets as you walk down the street? Cool. Now put on your shiniest fake gold chain, grab a suspiciously good fake ID, and follow me, because we're taking those pockets straight into a Vegas casino.
 
Most people try to solve "find the biggest sum hiding inside this array" by checking every single combination of numbers, one by one, like some kind of maniac. That's the equivalent of playing every single slot machine in the building twice, just to see which one blinked at you the nicest. We are absolutely not doing that.
 
Instead, I'm going to introduce you to two characters living rent-free in your brain who are going to casually solve **Maximum Subarray Sum** and **Maximum Subarray Product** during one relaxed lap around the casino floor. No calculators. No crying. Let's walk in.
 
## The Two Guys In Your Head
 
Picture a long row of gambling tables. Every table has a number taped to it. Some tables hand you a fat stack of cash the second you touch them (positive numbers). Some tables just slap you across the face and take your lunch money (negative numbers).
 
Walking this row with you are two very specific people:
 
1. **The Gambler (`currentSum`)**: This guy has zero memory and even less patience. At every single table, he asks himself the exact same panicked question: *"Do I keep dragging my old winnings and debts into this next table, or do I throw my entire wallet into the dumpster behind me and start completely fresh, right here, right now?"*
2. **The Accountant (`maxSum`)**: She trails a few steps behind the Gambler with a clipboard, completely unbothered by his emotional rollercoaster. She has one job and one job only, write down the highest number he ever touches, even if he blows it all two tables later. She does not care about his feelings. She cares about the peak.
```cpp
// The Gambler and the Accountant clock in for their shift
int currentSum = nums[0]; // The Gambler buys his very first ticket
int maxSum = nums[0];     // The Accountant writes down the opening score
```
 
Quick question before we go further, why do both of them start at `nums[0]` instead of a nice clean `0`? Because the casino has a strict "you must play at least one hand" policy. If literally every table in the building is pure debt, your best move isn't to walk away, it's to pick the table that hurts the least. Starting at `0` invents a fake table that doesn't even exist on the floor, and fake tables lie to you. Go peek at [[foundations/state]] if you want the full breakdown on why fake zero-state ruins your whole night.
 
## The Golden Rule, Ditch The Debt
 
Here's the one sentence that explains the entire algorithm, so tattoo it somewhere safe: **if what you're carrying is negative, drop it.**
 
If the Gambler's running total is in the red, dragging it into the next table only makes things worse than if he'd just shown up empty-handed. So the second his baggage starts pulling him below what the current table offers on its own, he tosses the bag into the nearest flaming dumpster and starts over like nothing happened. No shame in his game.
 
```cpp
// O(n) - one smooth, relaxed lap around the casino floor
for (int i = 1; i < nums.size(); i++) {
    // The Gambler decides: drag the old chain along, or torch it and start fresh right here
    currentSum = max(nums[i], currentSum + nums[i]);
 
    // The Accountant updates her scoreboard, no questions asked
    maxSum = max(maxSum, currentSum);
}
return maxSum;
```
 
Notice the Gambler is comparing `nums[i]` against `currentSum + nums[i]`, and never just quietly keeping `currentSum` the same and skipping ahead. Here's why that matters, you cannot teleport over a bad table. The rules say your subarray has to be one unbroken stretch, no gaps, no shortcuts. If you land on a table, you take what it gives you, good or bad. The only real decision you get is whether you bring your old baggage with you or leave it behind.
 
## The Magic Mirror, Maximum Product Subarray
 
Just when you're feeling pretty smug about ditching debt like a pro, the floor manager walks over and flips a switch. The game isn't addition anymore. It's **multiplication**.
 
And multiplication comes with a nasty little party trick, the negative sign has real dark magic in it now.
 
In regular Kadane's world, a giant negative number is just garbage, straight into the dumpster. But when we're multiplying, a giant negative number is secretly a **Magic Mirror**. If you're hauling around a massive debt (a huge negative product) and you step on ANOTHER negative table, boom, that crushing debt flips instantly into a mountain of gold.
 
If you're only tracking the biggest product like a rookie, you'll toss that huge negative number the second you see it, because it looks scary. Then a second negative number shows up ready to flip it into a jackpot, and you've got nothing left to multiply it with. You missed the whole play.
 
```cpp
// The Magic Mirror trick, track BOTH your top wealth AND your deepest debt
int maxProd = nums[0];
int currMax = nums[0];
int currMin = nums[0];
 
for (int i = 1; i < nums.size(); i++) {
    // 🪞 MIRROR TABLE: negative number spotted! swap wealth and debt before doing any math
    if (nums[i] < 0) {
        swap(currMax, currMin);
    }
 
    currMax = max(nums[i], currMax * nums[i]);
    currMin = min(nums[i], currMin * nums[i]);
 
    maxProd = max(maxProd, currMax);
}
return maxProd;
```
 
Burn this into memory and you'll never fumble it again: **negative flips the sign, so swap before you multiply.**
 
## The Memory Palace Cheat Sheet
 
Next time you're staring at a blank editor about to write Kadane's or one of its cousins, just walk this floor plan in your head:
 
1. **Room 1, The Entrance** → Set your starting variables to `nums[0]`. You have to play one hand, no skipping the game with a fake zero.
2. **Room 2, The Burning Dumpster** → Ask if the old baggage is helping or hurting. If `currentSum` is dragging `nums[i]` down, torch it.
3. **Room 3, The Mirror Table** → Multiplying and you just hit a negative number? Swap `currMax` and `currMin` before you touch the math.
4. **Room 4, The Exit Vault** → Hand back `maxSum` or `maxProd`. The Accountant slides you your final check.
---
 
Once you actually see the casino floor in your head, you stop writing those sad triple-nested loops that collapse into an $O(n^2)$ dumpster fire of their own. Head over to [[dp/kadane-variations]] next to learn how to also track the exact start and end index of your winning streak, because sometimes the casino wants receipts.
