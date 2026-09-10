---
title: "Palindrome Linked List"
description: "Checking if a chain of clues reads the same both ways."
createdAt: 2026-09-07
updatedAt: 2026-09-10
tags: ["linkedlists"]
isPinned: false
growthStage: "budding"
chapter: "4.6"
---

### Overview

A palindrome is a word that reads the same forwards and backwards, like racecar. You already checked that for arrays with two pointers walking toward each other in [[arrays/two-pointers]] and for strings with a simple mirror check. On a string you can read from both ends because the apartment building from [[arrays]] lets you jump.

On the festival trail from [[linkedlists]] you cannot. You can only walk forward following arrows. There is no arrow pointing backward, no way to start from the last lantern and walk left. So how do you check if 1 -> 2 -> 3 -> 2 -> 1 reads the same both ways when you are only allowed to go one direction?

You cheat by bringing two tricks you already know and stacking them.

Step one: find the middle. Step two: flip the second half. Step three: compare. Optional step four: flip back so you leave the trail as you found it.

## The little story to never forget

You are holding a paper bracelet made of linked lanterns. You pinch it in the middle with one hand. Now you flip the right half backward so both halves face you. Now you can compare left half and flipped right half side by side, walking forward on both, like two parallel trails. If every pair matches, it was a palindrome.

That pinch is [[linkedlists/fast-and-slow-pointers]], that flip is [[linkedlists/in-place-reversal]].

## Walk through

Trail: 1 -> 2 -> 3 -> 2 -> 1

1. Find middle with slow and fast. Slow one step, fast two steps. When fast hits end, slow is at 3, the middle. For even length 1 -> 2 -> 2 -> 1, slow lands at the second 2. That is fine, you will split after slow.

2. Reverse the half starting at `slow` or `slow.next` depending on variant. Many people do `reverse(slow)` for odd/even simplicity, but the clean interview version is `second = reverse(slow.next)` and keep `slow` as end of first half. Either works if you are consistent. We will show `reverse from slow`.

3. Compare first half head and reversed second half head lantern by lantern. If any `val` differs, not a palindrome.

4. Restore by reversing again if the problem asks you not to modify input.

```js
// O(n) time, O(1) space, leaves trail unchanged if you restore
function isPalindrome(head) {
  if head == null || head.next == null: return true

  // 1. find middle
  slow = head
  fast = head
  while fast != null && fast.next != null:
    slow = slow.next
    fast = fast.next.next
  // slow is middle

  // 2. flip second half starting at slow
  second = reverseTrail(slow) // the three-finger flip from in-place-reversal
  first = head

  // 3. compare
  // save secondHead to restore later
  copy = second
  result = true
  while second != null:
    if first.val != second.val:
      result = false
      break
    first = first.next
    second = second.next

  // 4. restore, not required but polite
  reverseTrail(copy)
  return result
}

function reverseTrail(node) {
  prev = null
  cur = node
  while cur != null:
    nxt = cur.next
    cur.next = prev
    prev = cur
    cur = nxt
  return prev
}
```

If you cut at `slow.next` instead, you do `second = reverseTrail(slow.next)` and you cut with `slow.next = null` before comparing. Then first half and second half have equal length for even, and first half is one longer for odd. That version makes the odd middle lantern not get compared, which is also correct because the middle alone does not matter for palindrome. Both tellings are the same story, just a slightly different pinch point.

Why not just copy values into an array and check with two pointers? You can, O(n) space. It passes, but it throws away the O(1) space win and the interviewer already knows you can use an array from [[arrays]]. The half-reverse shows you can think in pointers.

Common trips:

- Forgetting that reversing from `slow` will create a loop-ish shape temporarily because `slow.next` was part of first half. That is okay, you still compare using the two heads, just remember to restore if needed.
- Moving `first` and `second` at different speeds while comparing. Both move one step, like two kids walking side by side, not fast and slow anymore.
- Using `===` in pseudo code when the site asks for `==`. Stay with `==`.

If you remember to pinch the bracelet, flip the right half, then walk both halves together, you have linked list palindromes forever. And you already knew both moves, you just finally used them together.
