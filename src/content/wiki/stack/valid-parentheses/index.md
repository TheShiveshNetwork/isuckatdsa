---
title: "Valid Parentheses"
description: "Making sure every opening bracket finds its matching close."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["stack"]
isPinned: false
growthStage: "sprouting"
chapter: "5.1"
---

### Overview

Picture you are helping Anna pack tiffins before the lunch rush. She has three types of boxes: round `()`, square `[]`, and curly `{}`. Customers throw lids and bases at you in a random line like `([{}])` and your only job is to say if the line is packed correctly or if Anna will shout at you.

The rule is simple but strict. Every opening box must be closed by the same type, and in the reverse order you opened them. You cannot open a round box, then open a square box, then close the round one first. The last one you opened must be the first one you close. If you can picture why you need a tower of plates from [[stack]] here, you already solved it.

Here is your actual job. Walk the line left to right, with one tower next to you.

- If you see an opening - `(`, `[`, `{` - just put it on the tower. `push` it. You are opening a box and waiting for its lid later.
- If you see a closing - `)`, `]`, `}` - look at the top of the tower. `peek` it. Does it match? If the top is `(` and you got `)`, perfect, pop it off. If it is empty or it is a different type like `[` vs `)`, the packing is wrong, you can stop and say false.

If you finish the whole line and the tower is empty, every box found its lid. If something is still left in the tower, you opened something and never closed it, also false.

Walk `([])` in your head:

- `(` -> push `(`. Tower: `[ ( ]`
- `[` -> push `[`. Tower: `[ (, [ ]`
- `]` -> top is `[`, matches, pop. Tower: `[ ( ]`
- `)` -> top is `(`, matches, pop. Tower: `[]` -> empty -> valid.

Walk `([)]`:

- `(` push, `[` push. Tower: `[ (, [ ]`
- `)` comes. Top is `[`, not `(`. Wrong lid. Invalid even though counts match.

That is the whole trap. Count of brackets is not enough. Order matters, and the tower enforces order.

```c++
// Anna's lid checker - O(n) time, O(n) space for the tower
function isValid(line) {
  tower = []  // your stack
  for ch in line:
    if ch == "(" or ch == "[" or ch == "{":
      tower.push(ch)  // open a box, remember it
    else:
      if tower.length == 0: return false  // closing with nothing open
      top = tower.pop() // take the last opened box
      if (top == "(" and ch != ")") or
         (top == "[" and ch != "]") or
         (top == "{" and ch != "}"):
        return false  // wrong lid
  return tower.length == 0  // true only if nothing left open
}
```

Two tiny gotchas people forget in interviews:

1. Check if tower is empty before you pop. `)` with empty tower is instantly false.
2. After the loop, check if tower is empty. `(((` with no closes is also false.

This is also the skeleton for every stack matching problem. String decoding, removing adjacent duplicates, even simplifying a file path like `/a/../b`. You are always pushing what you are waiting to close, and popping when you find its partner. See [[stack/monotonic-stack]] where instead of matching lids, you wait for a bigger plate to arrive.
