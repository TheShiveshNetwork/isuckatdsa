---
title: "Core Programming Patterns"
description: "The handful of moves you keep reusing - loops, recursion, and remembering just enough."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["foundations"]
isPinned: false
growthStage: "budding"
chapter: "0.2"
---

### Overview

In the last chapter we talked about visits and pile height. This one is about how you actually visit. You will notice the same few moves showing up everywhere, from [[arrays]] to [[trees]] to [[dp]]. Once you see them, you stop memorizing solutions and start recognizing them.

Let me walk you through the twelve that keep coming back. I will keep each one short.

## Iteration - You Walk the Aisle Like a Tired Shopper

You are in a supermarket aisle. You start at one end and look at every item once, left to right. No skipping, no magic. Just you, the cart, and the shelf.

```js
// you, the cart, one aisle, every item once
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // hello, you
}
```

If the question says you need to see everyone, this is your answer. You cannot beat it. See [[arrays/prefix-sum]] for what you can build after one honest walk.

## Nested Iteration - You Invite Everyone to Shake Everyone Else's Hand

You walk up to person A, then make person A shake hands with every other person. Then you go to person B and do it all over again. It is thorough, it is polite, and it is exhaustingly slow.

```js
// O(n²) - everyone meets everyone else
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] === arr[j]) return true;
  }
}
```

When you spot a loop inside a loop, your brain should whisper "maybe a [[hashing/frequency-map]] can do this in one walk instead?"

## Recursion - The Lazy Boss Story

Imagine you are a boss who hates doing work. Someone asks you to sum a whole array. You look at the first number, write it down, and then you shout "Hey intern, sum the rest for me!" That intern is literally you, just one step later. That intern does the same thing - looks at one number, then shouts to an even newer intern. This keeps going until the last intern gets an empty array, shrugs, and says "zero, boss." Then all the answers bubble back up.

You did almost no work. You just handled one number and trusted the chain. That pile of interns waiting for answers is exactly the pile of sticky notes from [[foundations/complexity]]. Each intern is a sticky note.

You use this when you can say "the answer for the whole thing is just one step plus the answer for the smaller thing."

```py
# you are the boss. you do one tiny piece, delegate the rest to your intern
def sum_arr(arr, i=0):
    if i == len(arr):  # last intern got nothing, says zero and goes home
        return 0
    # you: "I will handle arr[i], you handle the rest"
    return arr[i] + sum_arr(arr, i+1)  # your intern is just you, one step later
```

If you find yourself saying "just do this one thing and let someone else handle the rest," you are thinking recursively. See [[recursion]] and you will meet this boss again in [[trees/trust-the-smaller-subtree]].

## State - What Is In Your Pockets Right Now?

Imagine you are a detective walking a street. State is just what is in your pockets at that moment. Maybe a running total, maybe the best answer you have seen so far, maybe a list of faces you already saw. Your job is to keep your pockets as light as possible. Every extra thing you carry is extra space, and we already know space is a pile of sticky notes from [[foundations/complexity]].

```js
let seen = new Set(); // your pocket says "who have I met so far"
for (let x of arr) {
  if (seen.has(x)) return true; // oh, I have seen you before
  seen.add(x); // add to pocket, keep walking
}
```

The cleverest solutions are not the ones with the biggest pockets. They are the ones that carry the least.

## Invariants - The Promise You Never Break

Think of an invariant as a pinky promise you make to yourself before you start walking, and you keep it the entire time. "Everything to my left is already sorted." "My window never has more than K different flavours." If you can say that promise out loud in plain English, your loop almost writes itself.

Remember [[sorting/simple-sorts]]? After each pass, the promise is "the last i goodies are already in their final spot, do not touch them." That promise lets you make the aisle shorter every time.

## Prefix/Suffix Thinking - Stop Doing the Same Math Twice

You know that friend who adds up the restaurant bill from scratch every time someone asks "how much do we owe from person 3 to 7"? Do not be that friend. Just remember the running total as you go.

```js
// you walk once and write down running totals
// prefix[i] is sum of first i items, so sum from l to r is just prefix[r+1] - prefix[l]
let prefix = [0];
for (let x of arr) prefix.push(prefix[prefix.length - 1] + x);
```

You do one walk to remember, a second walk to answer instantly. This tiny trick is the secret behind [[arrays/prefix-sum]] and [[hashing/prefix-sum-plus-hashmap]].

## Accumulation - The Piggy Bank

You start with an empty piggy bank and you drop coins in as you walk. You do not smash the bank and recount from zero each time. You just update what you have.

```js
let ans = 0;
for (let x of arr) {
  ans += x; // just drop it in, do not recount
}
```

You will do this without even noticing in [[dp/knapsack]] and while merging lists in [[trees]].

## Counting - The Bouncer With a Clicker

Some questions just ask "how many of each?" Be the bouncer with a clicker at the door. Click for every person who walks in.

```js
let count = {};
for (let x of arr) count[x] = (count[x] || 0) + 1; // click
```

If the question says "how many" or "at most K", grab that clicker. See [[strings/group-anagrams]] where you sort people by their clicker counts.

## Frequency Maps - The Bouncer's Notebook

A frequency map is just the bouncer's notebook with names. Key is the name, value is the clicks. It turns a slow "ask everyone about everyone" into a fast "just check the notebook."

```js
// do we have two numbers that add to target? check the notebook
let freq = new Map();
for (let x of arr) {
  if (freq.has(target - x)) return true; // notebook says we saw the partner
  freq.set(x, true); // write this person down
}
```

This notebook is the heart of [[hashing/frequency-map]] and it is also how you ace [[arrays/two-sum]] without the double loop.

## In-Place Modification - Rearrange the Furniture, Do Not Buy a New House

You have a tiny apartment (the array) and you need to tidy up. You could rent a new apartment and move everything, but that costs extra space. Or you just slide the couch, swap the chairs, and overwrite the mess in place. Same apartment, less rent.

```js
// move zeroes to the end, keep order, no new apartment
let p = 0;
for (let x of arr) if (x !== 0) arr[p++] = x; // slide good stuff forward
while (p < arr.length) arr[p++] = 0; // fill the rest with zeroes
```

You will do the same slide-and-swap in [[arrays/dutch-national-flag]] and when you flip arrows in [[linkedlists/in-place-reversal]].

## Sentinel Values - The Traffic Cone You Place For Yourself

Have you ever placed a cone so you do not have to worry about falling off the edge? A sentinel is that cone. You stick a fake node at the very start so you never have to write that awkward "what if we are at the head" if statement.

```js
// dummy head is your traffic cone
let dummy = { next: head };
let cur = dummy;
while (cur.next) {
  // you can always safely do cur.next, no special case for empty head
}
```

You will fall in love with this cone in [[linkedlists/dummy-node-trick]].

## Early Termination - Leave the Party When You Found Your Friend

Why stay till the end if you already found who you were looking for? If you found the answer, leave. If you can prove there is no way to succeed from here, leave.

```js
for (let x of arr) {
  if (x === target) return true; // found them, bye
  if (x > target && isSorted) break; // going further will only get worse, bye
}
```

This is the quiet superpower behind [[binarysearch]] and the pruning in [[backtracking]]. Do not be polite and finish the loop just because you started it.

---

If you remember these twelve, you will start seeing them in every chapter. Iteration is your walk, recursion is your smaller helper, and the rest are just clever things you carry, remember, or tidy up as you walk. Next up, we finally open the toolbox - the STLs.
