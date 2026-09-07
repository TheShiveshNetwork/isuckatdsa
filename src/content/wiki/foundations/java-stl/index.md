---
title: "Java STL"
description: "Your Java toolbox - the collections and helpers you will actually use."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["foundations"]
isPinned: false
growthStage: "budding"
chapter: "0.4"
---

### Overview

Same deal as before. You only need one language. If you picked Java, you are home. Read this and skip [[foundations/cpp-stl]] and [[foundations/python-stl]]. If you picked C++ or Python, then wth are you doing here? Go away.

If you are still reading, let me show you the Java toolbox. Think of it as a well-organized department store. Everything has a name tag that says what it holds, and you need that name tag because Java is strict like that.

## ArrayList and LinkedList - The Two Ways to Make a Line

`ArrayList` is a stretchy array. You add to the end, it grows. Random access is instant, inserting in the middle is slow. This is your default. Use it 90 percent of the time.

`LinkedList` is a chain of nodes, each pointing to the next. Adding at the ends is fast, but reaching the middle means walking node by node.

```java
ArrayList<Integer> a = new ArrayList<>();
a.add(42); // add to end, usually O(1)
a.get(0);  // random access, O(1)

LinkedList<Integer> link = new LinkedList<>();
link.addFirst(1); // O(1) at ends
link.addLast(2);
```

For [[arrays]] and [[dp]], reach for `ArrayList`. You will rarely need `LinkedList` in interviews.

## HashMap vs TreeMap - The Hashed Drawer vs The Sorted Shelf

`HashMap` is a drawer with hashed labels. Average O(1) for `put` and `get`. No order. This is your workhorse for counting.

`TreeMap` is a shelf where keys stay sorted. It is a tree inside, so O(log n). Use it when you need keys in order.

```java
HashMap<String,Integer> fast = new HashMap<>();
fast.put("alice", 1); // O(1) average
fast.get("alice");

TreeMap<String,Integer> sorted = new TreeMap<>();
sorted.put("alice", 1); // sorted by key
```

This is the heart of [[hashing/frequency-map]] and [[hashing/longest-consecutive-sequence]].

## HashSet vs TreeSet - Just the Keys

Same idea, but only keys, no values. `HashSet` is hashed, `TreeSet` is sorted.

```java
HashSet<Integer> seen = new HashSet<>();
if (seen.contains(x)) return true; // have we seen it?
seen.add(x);

TreeSet<Integer> s = new TreeSet<>(); // keeps sorted
```

You use `HashSet` for [[hashing/seen-it-before]].

## PriorityQueue - The Emergency Room Again

`PriorityQueue` in Java is a min-heap by default. Smallest first. Offer and poll are O(log n).

```java
PriorityQueue<Integer> pq = new PriorityQueue<>(); // min-heap
pq.offer(5); pq.offer(10);
pq.peek(); // 5, the smallest
pq.poll(); // removes smallest

// want max heap? flip the order
PriorityQueue<Integer> max = new PriorityQueue<>((a,b) -> b - a);
```

This is your go-to for [[heap/top-k-elements]] and [[heap/merge-k-sorted-lists-heap-version]].

## ArrayDeque - The Good Line

Forget the old `Stack` class. Use `ArrayDeque` for both stack and queue. It is a line where you can add or remove from both ends in O(1).

```java
ArrayDeque<Integer> dq = new ArrayDeque<>();
dq.offerLast(1);  // queue: add to back
dq.pollFirst();   // queue: remove from front
dq.push(1);       // stack: push
dq.pop();         // stack: pop
```

You will see it in [[queue/monotonic-deque]] and [[stack/valid-parentheses]].

## The Department Store Receipt

Idk why I called it that. But yeah, Java is that department store that makes you fill three forms and get a name tag just to buy socks. It is hated because you need `public static void main(String[] args)` just to say hello, and everything needs a type and a signature. But that same slow bureaucracy already stamped the perfect forms for you.

So when I say do not use this, I mean do not touch the four stamps below. Not yet. First we are going to hit our heads for 20 chapters and build sorting, searching, min, max and all that from scratch with our own loops. You will feel smart. And then I will tell you your code is shit. Not to be rude, but because some fucker at Sun already sat for months, built the most optimized version, tested every edge case, and hid it in `Collections` and `Arrays` for you. So after you get it, do not waste your time writing the same toxic code again and again in every program when you do not need to. Just stamp the form.

The only stamps you need:

- `sort` - puts it in order.
- `binarySearch` - is it there?
- `min` / `max` - smallest or biggest, no loop.
- `reverse` / `shuffle` - flip it or mix it.

```java
ArrayList<Integer> a = new ArrayList<>(List.of(3,1,2,2,5));
Collections.sort(a); // [1,2,2,3,5]
int lo = Collections.min(a); // 1
int hi = Collections.max(a); // 5
int idx = Collections.binarySearch(a, 2); // found?
Collections.reverse(a); // flip
int cnt = Collections.frequency(a, 2); // count
```

You learn _how_ in [[sorting]] and [[binarysearch]]. You _use_ this so you do not write the same toxic paperwork again. That is the whole point of the store.

## StringBuilder - Because Strings Are Stubborn

Java strings do not change. If you keep adding to a string, you make a new string every time. `StringBuilder` is a mutable notepad.

```java
StringBuilder sb = new StringBuilder();
sb.append("hi"); sb.append(" there");
sb.toString(); // "hi there"
sb.reverse(); // handy for [[strings/palindrome-check]]
```

## Comparator, Iterator, Generics - The Name Tags

- `Comparator` is how you tell Java how to sort your own objects. You write the rule.

```java
Collections.sort(a, (x,y) -> x - y); // ascending
Collections.sort(a, Comparator.reverseOrder());
```

- `Iterator` is just a polite way to walk through any collection: `hasNext()`, `next()`.
- `Generics` like `<String>` are the name tags that keep you from putting apples in an orange box. They make the store strict, which actually saves you in interviews.

---

That is the store. `ArrayList`, the two maps, the two sets, `PriorityQueue`, `ArrayDeque`, `StringBuilder`, and `sort`. If you know these, you can handle most of [[graphs]] and [[dp]] without getting lost in the aisles. For the full catalog, keep [the official Java docs](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/package-summary.html) nearby.
