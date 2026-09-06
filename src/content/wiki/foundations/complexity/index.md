---
title: "Complexity"
description: "Big O without the headache - time, space, and what your recursion stack is really doing."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["foundations"]
isPinned: false
growthStage: "budding"
chapter: "0.1"
---

### Overview

Hey, let me be honest with you. Big O sounds scary, but it is just two simple questions. How long will your code take? And how much extra space does it need to remember things along the way? That is it.

Think of time like shaking hands at a party. If you have to meet everyone once, that takes longer as the party gets bigger. Space is like sticky notes you carry. Every time you say I will come back to this later, you stick a note on top of the pile. When you finish that task, you peel it off. Your pile only gets as tall as how deep you go, not how many people are at the party.

You will see this a lot in [[recursion]] and [[foundations/core-patterns]], so keep that picture in mind.

## The Two Questions You Should Always Ask

**How many times do you visit something?** If you have to see every person once, you cannot do better than that. The nice example in [summing root-to-leaf numbers](https://www.techinterviewhandbook.org/blog/summing-root-to-leaf-numbers/#the-algorithmic-complexity) shows this well. You walk through the whole tree and visit every node once to build the numbers. You do one small calculation at each node, so the time grows directly with the number of nodes. If you have N nodes, you do N visits.

**How tall does your pile of notes get?** When you use recursion, your notes pile up. You add a note, go to a child, add another note, and so on. When you reach a leaf you start peeling notes off as you backtrack. So the space you need is not the total number of nodes, it is just how deep the tree is. We call that height H. If the tree is nice and balanced, H is small. If the tree is lopsided and looks like a chain, H becomes N, and then you need a lot of space.

```py
# You visit every node once - time grows with N
# Your notes pile only as deep as the tree is tall - space is H
def walk(node, cur=0):
    if not node:
        return 0
    cur = cur * 10 + node.val  # build number, one small step
    if not node.left and not node.right:  # reached a leaf, no more going deeper
        return cur
    # go left and right, each call adds a note, then peels it
    return walk(node.left, cur) + walk(node.right, cur)
```

After you write a solution, just pause and ask yourself - do I really need to visit everyone? If the answer is yes, you cannot beat that time. That is a perfectly fine answer in an interview.

## A Simple Way to Feel Big O

Let me give you everyday pictures so you can feel it, not memorize it.

- **O(1)** - picking the top plate. It does not matter if there are 10 plates or 10,000. Same effort. See this in [[arrays]] when you do `arr[0]`.
- **O(log n)** - guessing a number between 1 and 100. You ask is it bigger than 50? Then you throw away half the options. Each guess cuts the work in half.
- **O(n)** - shaking every hand once. More people, more handshakes. See [[hashing/frequency-map]].
- **O(n log n)** - sorting a messy room first, then tidying. See [[sorting]].
- **O(n²)** - asking every person to talk to every other person. If you see this, you can often do better.

```js
// O(1) - work stays the same no matter how big the array is
function getFirst(arr) {
  return arr[0]; // just one look, that is it
}

// O(n) - you have to say hello to everyone
function sumAll(arr) {
  let s = 0;
  for (let x of arr) s += x; // one visit per person
  return s;
}

// O(log n) - you keep cutting the search in half
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1; // pick the middle, throw half away
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
```

## Let the Input Size Guide You

You do not have to guess what solution will pass. The constraints tell you.

- n is 10 or less -> even trying every order might be okay
- n is 20 or less -> trying every subset might be okay
- n is 500 or less -> a triple loop might be okay
- n is 5000 or less -> a double loop might be okay
- n is 100000 or more -> you need to be clever, like sorting first or using a hash map

This is why [[binarysearch]] and [[hashing]] feel like cheating. They let you handle big inputs without big work.

## Can You Save Space?

Normally your pile of notes grows with depth. There is a clever trick where you reuse a couple of pointers instead of a pile, so you use almost no extra space. It works by temporarily linking nodes as you walk and then unlinking them. It is neat to know it exists - the original paper is [here](https://www.sciencedirect.com/science/article/abs/pii/0020019079900681) if you are curious - but for interviews, the simple pile of notes approach is what people expect. Just mention that the trick exists if you want to sound thoughtful.

If you want to actually see how that pile of notes builds up and shrinks, watch this: [How recursion works - freeCodeCamp](https://www.freecodecamp.org/news/how-recursion-works-explained-with-flowcharts-and-a-video-de61f40cb7f9/) - it uses pictures and flowcharts, very friendly.

## If You Want to Read More

These are the few that are actually enjoyable:

- [Grokking Algorithms](https://www.manning.com/books/grokking-algorithms) by Aditya Bhargava - uses cartoons and simple stories, you will actually remember it
- [Introduction to Algorithms (CLRS)](https://mitpress.mit.edu/books/introduction-algorithms-fourth-edition/) - the big reference. Keep it nearby, do not try to read it cover to cover
- [The Algorithm Design Manual](https://www.algorist.com/) by Steven Skiena - he tells real stories of where algorithms went right and wrong

Remember this and you will be fine: time is how many visits, space is how tall your pile gets. Visit everyone once if you must, keep your pile short, and always ask if you can do less.
