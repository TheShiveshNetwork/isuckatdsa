---
title: "C++ STL"
description: "Your C++ toolbox - the few containers and tricks you actually need for interviews."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["foundations"]
isPinned: false
growthStage: "budding"
chapter: "0.3"
---

### Overview

Quick heads up before we start. You only need one language for DSA. Just one. Pick the one you already like. Unless you are trying to collect programming languages like Pokemon cards, or you enjoy suffering, you do not need all three.

If you chose C++, you are in the right place. Read this and skip [[foundations/java-stl]] and [[foundations/python-stl]]. If you chose Java, close this tab and go there. If you chose Python, same. No hard feelings.

Still here? Good. Let me show you the only C++ toys you will actually reach for in an interview. Think of the STL as a small toolbox, not a warehouse.

## Vector - Your Stretchy Array

Vector is just an array that stretches. You push to the back and it handles the resizing. Random access is instant, inserting in the middle is slow because you have to shift everything.

```cpp
vector<int> a;
a.push_back(42);      // add to end, usually O(1)
a[0];                 // random access, O(1)
a.insert(a.begin()+1, 99); // slow, has to shift
```

You will use this for everything in [[arrays]] and [[dp]].

## Pair and Tuple - Tape Two Things Together

Pair is two things taped together. Tuple is more things taped together. That is it.

```cpp
pair<int,int> p = {3, 4};
tuple<int,string,int> t = {1, "hi", 9};
auto [x, y] = p; // unpack like a gift
```

You use pairs all the time in [[hashing]] and [[graphs]] when you need to store coordinates.

## Map vs Unordered Map - The Ordered Shelf vs The Magic Locker

`map` keeps keys sorted like books on a shelf. It is a tree inside, so looking up is a bit slower. `unordered_map` is a magic locker - you give a key, it hashes to a spot, average O(1). No sorting.

```cpp
map<string,int> ordered; // sorted, O(log n) lookup
unordered_map<string,int> fast; // hash, O(1) average

fast["alice"]++; // counting? reach for this
```

If you need frequency, you want `unordered_map`. See [[hashing/frequency-map]] and [[strings/group-anagrams]].

## Set vs Unordered Set - Same Idea, Just Keys

`set` is sorted unique keys. `unordered_set` is hashed unique keys, average O(1). Use them when you need to know "have I seen this before?" See [[hashing/seen-it-before]].

```cpp
unordered_set<int> seen;
if (seen.count(x)) return true; // seen before
seen.insert(x);
```

## Stack, Queue, Deque - Plates, Lines, and Both Ends

- `stack` is plates. Last in, first out. `push`, `pop`, `top`.
- `queue` is a ticket line. First in, first out. `push`, `pop`, `front`.
- `deque` is a line where you can cut in from both ends. `push_front`, `push_back`.

```cpp
stack<int> st; st.push(1); st.top(); st.pop();
queue<int> q; q.push(1); q.front(); q.pop();
deque<int> d; d.push_front(1); d.push_back(2);
```

You will meet `stack` in [[stack/valid-parentheses]] and `deque` in [[queue/monotonic-deque]].

## Priority Queue - The Emergency Room

`priority_queue` always gives you the most urgent person first. By default, biggest first. It is a heap inside, so push and pop are O(log n).

```cpp
priority_queue<int> pq; // max heap
pq.push(5); pq.push(10);
pq.top(); // 10, the biggest
// want min heap? flip it
priority_queue<int, vector<int>, greater<int>> minpq;
```

This is the star of [[heap/top-k-elements]] and [[heap/merge-k-sorted-lists-heap-version]].

## The Grandma's Sewing Kit Fallacy

Idk why I called it that. But yeah, C++ is that friend who brings a whole workshop to fix a loose button. It is hated because it makes you write `std::vector<std::pair<int, std::string>>` just to store a shopping list, and a missing `>` gives you an error novel longer than your code. But that workshop has pre-sharpened tools, so you do not need to forge your own.

So when I say do not use this, I mean do not touch the four algorithms below. Not yet. First we are going to hit our heads for 20 chapters and build sorting, searching, min, max and all that from scratch with our own loops. You will feel proud. And then I will tell you your code is shit. Not to be mean, but because some fucker already sat for months, built the most optimized version, tested every edge case, and it is already sitting in `<algorithm>` for you. So after you get it, do not waste your time writing the same toxic loop again and again in every program when you do not need to. Learn it once to get it, then just use the kit.

Here are the only ones you will actually use. One line each:

- `sort` - puts things in order. Done.
- `min` / `max` - smaller or bigger of two.
- `min_element` / `max_element` - smallest or biggest in a range.
- `lower_bound` / `upper_bound` / `binary_search` - where would it go, and is it even there?

```cpp
vector<int> a = {3,1,2,2,5};
sort(a.begin(), a.end()); // {1,2,2,3,5}
int lo = *min_element(a.begin(), a.end()); // 1, no loop
int hi = *max_element(a.begin(), a.end()); // 5
bool has = binary_search(a.begin(), a.end(), 2); // true?
auto it = lower_bound(a.begin(), a.end(), 2); // first 2
reverse(a.begin(), a.end()); // flip it
int s = accumulate(a.begin(), a.end(), 0); // sum, no loop
```

You learn *how* it works in [[sorting]] and [[binarysearch]]. You *use* this in the interview so you do not waste time writing the same toxic loop for the 100th time. That is why the toolbox exists.

## String - Find and Cut

```cpp
string s = "hello";
s.find("ll"); // where is it?
s.substr(1, 3); // cut a piece
```

You will use this in [[strings/palindrome-check]].

## A Couple of Small Helpers

- `function` and `bind` / lambdas let you pass logic around. A lambda is just a tiny throwaway function.

```cpp
auto add = [](int a, int b){ return a+b; };
sort(a.begin(), a.end(), [](int x, int y){ return x > y; }); // sort descending
```

- Fast I/O - two lines that make your C++ not time out:

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

Put them at the start of `main`. Done.

---

That is it. Vector, the two maps, the two sets, stack/queue/deque, priority queue, and a handful of algorithms. If you know these, you can handle 90 percent of [[arrays]], [[graphs]], and [[dp]]. For the full details with all the corner cases, the one site everyone trusts is [cppreference](https://en.cppreference.com/) - keep it open, do not memorize it.
