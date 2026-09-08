---
title: "Complexity"
description: "Big O, time and space complexity, and input constraints."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["foundations"]
isPinned: false
growthStage: "budding"
chapter: "0.1"
---

### Overview

Big O sounds like something that should require a lab coat and a whiteboard full of Greek letters. No, okay let's be real it sounds like some WWE wrestler's name. Well, to me at least it does. But yeah technically it is just two questions wearing a mawashi.

**How long does your code take?** & **How much extra stuff does it need to carry around while it works?** That's genuinely the whole thing.

Think of '_time_' like shaking hands at a party. Meet everyone once, and the bigger the party gets, the longer that takes you. Space is like sticky notes. Every time your code says "I'll deal with this later," it slaps a sticky note on a pile. Once that task is done, the note gets peeled off. So your pile only ever gets as tall as how deep you went, not how many people showed up to the party.

You'll bump into this same picture again in [[recursion]] and [[foundations/core-patterns]], so keep it handy.

## Visiting People vs Stacking Notes

Here's the short version, because honestly the long version is a lot to read before your morning coffee kicks in.

**Visits are about how many things you have to touch.** If the job genuinely requires looking at every single item once, that's your floor. You can't magically go faster than "look at everyone once." A neat real example of this is [summing root-to-leaf numbers](https://www.techinterviewhandbook.org/blog/summing-root-to-leaf-numbers/#the-algorithmic-complexity), where you walk every node in a tree exactly once. N nodes, N visits. No shortcuts, no cheat codes.

**Notes are about how deep you go, not how many people exist.** In recursion, you stick a note down, step into a child, stick another note, repeat. When you hit a leaf, you start peeling notes off on your way back out. So your pile height is just the depth of the tree, not the total size of it. We call that H. A nicely balanced tree keeps H small. A lopsided tree that looks like a straight line turns H into basically N, and suddenly your pile is enormous.

```py
# You visit every node once, so time grows with N
# Your note pile only ever gets as tall as the tree, so space is H
def walk(node, cur=0):
    if not node:
        return 0
    cur = cur * 10 + node.val
    if not node.left and not node.right:
        return cur
    return walk(node.left, cur) + walk(node.right, cur)
```

Quick life tip, after you write any solution, just ask yourself "do I actually need to visit everyone?" If yes, congrats, you've already found the fastest possible answer, and that's a perfectly respectable thing to say out loud in an interview.

## Getting A Feel For Big O

Just in case you forgot, if you want the serious math heavy version of all this with formal proofs and Greek symbols, there are way better places for that than a wiki written by someone who still occasionally counts on their fingers. Here we're just trying to make it click.

- **O(1)** - grabbing the top plate off a stack. Doesn't matter if there are 10 plates or 10,000, same effort either way. You'll see this in [[arrays]] every time you write `arr[0]`.
- **O(log n)** - guessing a number between 1 and 100. "Is it bigger than 50?" Boom, half the options are gone. Every guess cuts your problem in half.
- **O(n)** - shaking every single hand at the party once. More people means more handshakes, plain and simple. Peek at [[hashing/frequency-map]].
- **O(n log n)** - sorting a messy room first, then tidying it up properly. Check out [[sorting]] for the full mess.
- **O(n²)** - making every single person at the party talk to every other person. If you catch yourself doing this, stop and ask, can this actually be better? Most of the time, yes. That question alone will save you in a lot of interviews.

```js
// O(1) - the work stays flat no matter how huge the array gets
function getFirst(arr) {
  return arr[0];
}

// O(n) - you have to greet everyone
function sumAll(arr) {
  let s = 0;
  for (let x of arr) s += x;
  return s;
}

// O(log n) - you keep chopping the search in half
function binarySearch(arr, target) {
  let lo = 0,
    hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
```

## Oopsie Daisy, Your Algorithm Isn't Always The Fastest. And That's Fine

Here's something nobody tells you early enough, the "best" algorithm on paper isn't always the fastest one in real life. Sometimes the fancy O(log n) solution loses to a dumb little loop because the input is tiny and the fancy solution has more setup overhead than it's worth. Big O tells you how things scale, not which one wins every single time. Keep that humility in your back pocket.

That said, once your input starts growing, the constraints in the problem are basically handing you a cheat sheet for what kind of solution is even allowed to survive. Here's the rough vibe check to remember forever:

- n around 10 or less, sure, go wild, even trying every possible order might survive
- n around 20 or less, trying every subset is probably fine
- n around 500 or less, a triple nested loop can usually sneak by
- n around 5000 or less, a double loop is your comfort zone
- n around 100000 or more, time to get clever, sort first, grab a hash map, stop brute forcing

This is exactly why [[binarysearch]] and [[hashing]] feel like they're cheating the system. They quietly let you deal with massive inputs without doing massive amounts of work.

## Can You Save Space Too?

Normally your note pile grows right alongside how deep you go. There's a sneaky trick where you skip the pile entirely and just reuse a couple of pointers, temporarily linking nodes as you walk through and then unlinking them on the way back. It's a fun party trick to know exists, see this friendly explainer on [Morris traversal](https://www.geeksforgeeks.org/dsa/inorder-tree-traversal-without-recursion-and-without-stack) or the [TakeUForward walkthrough](https://takeuforward.org/data-structure/morris-preorder-traversal-of-a-binary-tree) if you're curious, but for interviews the normal note pile approach is exactly what people expect from you. Just casually mention the trick exists if you want to look extra thoughtful.

If you want to actually watch a note pile build up and shrink in real time, this video does it with pictures and flowcharts, very chill to follow, [How recursion works, freeCodeCamp](https://www.freecodecamp.org/news/how-recursion-works-explained-with-flowcharts-and-a-video-de61f40cb7f9/).

## If You Want To Read More

A short list of the ones actually worth your time:

- [Grokking Algorithms](https://www.manning.com/books/grokking-algorithms) by Aditya Bhargava, cartoons and simple stories, this one actually sticks in your brain
- [Introduction to Algorithms (CLRS)](https://mitpress.mit.edu/books/introduction-algorithms-fourth-edition/), the big serious reference, keep it on the shelf, do not attempt to read it cover to cover like a novel
- [The Algorithm Design Manual](https://www.algorist.com/) by Steven Skiena, full of real stories about where algorithms went right and horribly wrong

If you remember nothing else, remember this, time is how many visits you make, space is how tall your pile gets, and the fastest possible answer is sometimes just visiting everyone once and calling it a day. Always ask if you can do less. Sometimes the answer is no, and that's a fine answer too.
