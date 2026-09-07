---
title: "Python STL"
description: "Your Python toolbox - batteries included, no extra installs needed."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["foundations"]
isPinned: false
growthStage: "budding"
chapter: "0.5"
---

### Overview

If you are still reading, you picked Python. Good for you. Well, hey fellow semi-collon hater.

Quick thing to clear up. People say Python has an STL like C++. Not really. C++ STL is mostly a tidy set of template containers and algorithms. Python's standard library is different. It is a massive, diverse collection of built-in modules, packages and functions that come pre-installed with every Python distribution. It follows the idea of batteries included. You do not need to pip install anything to handle everyday tasks. The batteries are already in the box.

That is why this page feels bigger than the C++ one. You already have most of what you need.

The lovely comparison in [Python, C++'s STL and their equivalents](https://vibhu4agarwal.hashnode.dev/python-cs-stl-data-structures-and-their-equivalents) nails what maps where, and what is missing.

## What You Already Have - And Will Actually Use

### List, Dict, Set, Tuple - Your Four Friends

- `list` is your stretchy array. `[]`, `append`, `pop`, `sort`. See [[arrays]].
- `dict` is your hash map. `{}`, average O(1) get and set. This is your counter. See [[hashing/frequency-map]].
- `set` is your hash set. Unordered, O(1) average. For have I seen this before? See [[hashing/seen-it-before]].
- `tuple` is your immutable, hashable list. You can use it as a dict key when a list would not work.

```py
a = []           # list - your vector
a.append(42); a[0]

freq = {}        # dict - your unordered_map
freq["alice"] = freq.get("alice", 0) + 1

seen = set()     # set - your unordered_set
seen.add(5)

t = (1, "hi")    # tuple - hashable, good for keys
```

### Collections - The Extra Drawer

`collections` is where Python hides the good stuff.

```py
from collections import Counter, defaultdict, deque

Counter([1,2,2,3])  # {2:2, 1:1, 3:1} - instant frequency map
defaultdict(list)   # never check if key exists, it just works
deque()             # double-ended line, O(1) both ends - use this for queue and stack
```

Use `deque` for both [[stack/valid-parentheses]] and [[queue]] - do not use `list` as a queue, it is slow.

### Heapq - Your Priority Queue, But Smallest First

Python only gives you a min-heap. It lives in `heapq`.

```py
import heapq
h = []
heapq.heappush(h, 5); heapq.heappush(h, 10)
heapq.heappop(h) # 5, the smallest
```

For max heap, push negative numbers. This is your friend for [[heap/top-k-elements]] and [[heap/merge-k-sorted-lists-heap-version]].

### Bisect - Binary Search Without Writing It

`bisect` finds where to insert in a sorted list.

```py
import bisect
a = [1,3,5]
bisect.bisect_left(a, 4)  # 2, where 4 would go
bisect.insort(a, 4)       # insert keeping sorted
```

You will use this in [[binarysearch]] when you maintain a sorted list.

### Itertools and Functools - Your Cheat Codes

You do not need to write permutations from scratch.

```py
import itertools
list(itertools.product([1,2], repeat=2)) # cartesian product
list(itertools.permutations([1,2,3]))    # all orders
itertools.accumulate([1,2,3])            # running totals - hello [[arrays/prefix-sum]]

from functools import lru_cache
@lru_cache(None)
def fib(n): ... # instant memoization for [[dp]]
```

`operator` gives you `itemgetter` for sorting, `functools.reduce` is your accumulator.

### String, Array, Enum, Typing - Small Helpers

```py
"hello".find("ll")      # find
", ".join(["a","b"])     # join
str.strip, str.split

import array # typed array if you really need it
from enum import Enum

from typing import List, Dict # just hints, no runtime cost
```

See [[strings/palindrome-check]] for string tricks.

## What You Do NOT Have - And What To Do

Here is the honest part from that blog. C++ has `set`, `multiset`, `map`, `multimap` that stay sorted as you insert, O(log n). Python's standard library does not have a sorted container. `set` is unordered. `OrderedDict` only remembers insertion order, not sorted order.

So what do you do?

- **If you can pip install,** use [sortedcontainers](http://www.grantjenks.com/docs/sortedcontainers/) - `SortedList`, `SortedDict`, `SortedSet`. It is pure Python, fast enough, and even available on LeetCode.
- **If you cannot install,** like in an interview or on Codeforces, fake it for a minute:

```py
from bisect import bisect_left
class SortedList:
    def __init__(self): self.a = []
    def add(self, x):
        i = bisect_left(self.a, x) # O(log n) to find spot
        self.a.insert(i, x)         # O(n) to insert, mention the trade-off
```

Then tell your interviewer: with an AVL tree this would be O(log n), and in real code you would use `sortedcontainers`. They will love that you know the trade-off.

That maps like this:

- `std::set` -> `sortedcontainers.SortedSet`
- `std::multiset` -> `sortedcontainers.SortedList`
- `std::map` -> `sortedcontainers.SortedDict`

For the full mapping table, read the blog: [Python, C++'s STL and their equivalents](https://vibhu4agarwal.hashnode.dev/python-cs-stl-data-structures-and-their-equivalents) - short, clear, and it will save you an afternoon of googling.

## The Batteries Are Already In - Stop Building Your Own

Idk why I called it that. But yeah, Python is hated because people say it is slow and it screams at you for one missing space, yet it is loved because it comes with batteries included. You do not need to build your own flashlight. The flashlight is already in the box.

So when I say do not use this, I mean do not touch the four batteries below. Not yet. First we are going to hit our heads for 20 chapters and build sorting, searching, min, max and all that from scratch with our own loops. You will feel clever. And then I will tell you your code is shit. Not to be rude, but because some fucker already wrote the most optimized version in C, tested every edge case, and Python ships it as a one-liner. So after you get it, do not waste your time writing the same toxic code again and again in every program when you do not need to. Just use the battery.

The only batteries you need:

- `sorted` / `sort` - sort it.
- `min` / `max` - smallest or biggest.
- `sum` / `any` / `all` - add up, any true, all true.
- `bisect_left` - where would it go?

```py
a = [3,1,2,2,5]
sorted(a)                # [1,2,2,3,5]
min(a)                   # 1
max(a)                   # 5
sum(a)                   # 13
import bisect
bisect.bisect_left(a, 2) # where to insert
```

You learn _how_ in [[sorting]] and [[binarysearch]]. You _use_ this so you do not write the same toxic loop forever. That is why Python is called batteries included.

---

That is it. `list`, `dict`, `set`, `Counter`, `deque`, `heapq`, `bisect`, plus `itertools` and `lru_cache`. With those you can handle 90 percent of [[hashing]], [[graphs]] and [[dp]] without ever leaving Python's batteries-included box.
