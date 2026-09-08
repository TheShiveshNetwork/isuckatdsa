---
title: "Hashing"
description: "Labeled lockers where you can grab your stuff instantly."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["hashing"]
isPinned: true
growthStage: "budding"
chapter: "3"
---

### Overview

An array is great when you know the address. Someone says locker 17 and you walk straight to locker 17. You don't have to wonder to find that number 17 locker because you know it will be in order after 16 and before 18, O(1). You saw this in [[arrays]].

Imagine you're going to a party and you're at the entrance. You see a beautiful girl named Maya around the locker room. She seems a little stressed about something. You go to her and ask about it and figure out that she she's not able to figure out where she left her bag. You see that the person at the lockers got drunk and slept off below the counters. Seems like thee world ws planning just for you to come to meet Maya. May be destiny. So tell me, you do not have a locker number, you have a name. You can go to every locker, open it and see if the bag is Maya's or not. That is O(n) and once n hits 100000, it might sound crazy cute to Maya that you searched over 100000 lockers for her, but for you it's a headache and realistically would she like to wait for so long? But Maya doesn't know that you know of a old trick that a drunk chinese friend of yours once told you.

Hashing is the trick for finding things by an identifier as fast as you find them by number. Here, the name Maya becomes an identifier.

Here is the normal way it works. You run the name through a small calculation that spits out a locker number. Maya becomes 73. Raj becomes 41. That calculation is the hash function. So when Maya comes back, you do not search. You just run Maya through the same calculation again, get 73, and walk straight to that locker. That direct walk is why we say lookup is O(1) on average.

The lockers themselves are the hash table or hash map. In code it is the `Map` and `Set` you already met as the bouncer's notebook in [[foundations/core-patterns]]. Key is the name, value is whatever you stored with it.

There are two little costs. You pay with extra space, each used locker lives in your pocket from [[foundations/complexity]]. And sometimes two names compute to the same locker number, that is a collision, but let the library handle it for now. For our mental model, just picture every name getting its own labeled cubby that you can walk to directly.

If [[arrays]] taught you how to walk the building floor by floor, this section teaches you how to skip the walk entirely. And impress Maya.

- [[hashing/frequency-map]] - counting how many of each thing showed up, your tally sheet
- [[hashing/seen-it-before]] - checking if you have met this thing before, your guest list
- [[hashing/complement-lookup]] - asking who completes me to hit a target, the partner check
- [[hashing/prefix-sum-plus-hashmap]] - remembering past running totals to count stretches that sum to K
- [[hashing/longest-consecutive-sequence]] - longest chain of consecutive numbers without sorting
- [[hashing/lru-cache]] - when your lockers are limited and you have to throw out the least recently used
