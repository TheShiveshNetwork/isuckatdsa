---
title: "Stack"
description: "A pile of plates - last one on is the first one off."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["stack"]
isPinned: true
growthStage: "sprouting"
chapter: "5"
---

### Overview

Welcome to Anna's canteen. Not the fancy one, the sweaty stainless steel one near your college gate where the plates are always stacked in one tall tower.

You know the rule. You can only do two things with that tower. Put a plate on the top, take a plate off the top. You cannot pull a plate from the middle without everything crashing on Anna's head, and Anna will not like that. That is the entire idea of a stack.

We call putting a plate `push` and taking it `pop`. Looking at the top without taking it is `peek`. The last plate you put is the first one you get back. That is why people say last in, first out, but just picture the tower and you will never forget.

Why do we even need such a dramatic tower? Three reasons, and they cover every problem in this chapter:

1. **To remember where to go back.** Like the undo button or the back button in your browser. You did A, then B, then C. Stack remembers C, then B, then A when you hit undo.

2. **To match things that close in reverse order.** Like lids and boxes. You open round, then square, you must close square, then round.

3. **To wait for the next bigger thing.** Like standing in a queue waiting for someone taller to come so you can finally see over them.

That is it. If you understand the tower, you already understand the data structure. The tricks are just about what you decide to put in the tower.

Here is your map of the canteen:

- [[stack/valid-parentheses]] - every opening lid must find its closing lid in reverse order
- [[stack/monotonic-stack]] - keeping the tower always sorted so you can instantly find the next bigger thing
- [[stack/daily-temperatures]] - people waiting in heat for a warmer day to come
- [[stack/largest-rectangle-in-histogram]] - biggest tablecloth you can slide under a skyline of plates
- [[stack/min-stack]] - a tower that also remembers its lightest plate for free

You already met a stack without knowing it. Every time you called a function inside a function in [[foundations/core-patterns]] and [[recursion]], your code was pushing a new plate. And [[linkedlists]] also pretends to be a tower sometimes, but linked lists let you sneak in from the middle, stacks never do.
