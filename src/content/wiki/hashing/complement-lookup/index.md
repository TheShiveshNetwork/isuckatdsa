---
title: "Complement Lookup"
description: 'Asking "what''s missing to complete this pair?" instead of searching for it.'
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["hashing"]
isPinned: false
growthStage: "budding"
chapter: "3.3"
---

### Overview

You have counted wristbands for Maya in [[hashing/frequency-map]] and checked her guest list at the party entrance in [[hashing/seen-it-before]]. Maya is now fully convinced you are a wizard, so she takes you inside the party for the real part of her Sherlock-family mission. She points to a small group on the dance floor. Each of them has a number stuck on their back, say `[2, 7, 11, 15]`, like a silly detective party game. Maya whispers that her target is `9` and she needs the two people whose numbers add up to that target. Here it is the person with `2` and the one with `7`, but she wants you to find them without making a scene.

You could make every person turn around and shake hands with every other person to check their sum, the nested handshake from [[foundations/core-patterns]]. Person at `i` shakes hands with every person after `i` to see if they hit the target. It works, but in a party of 100,000 guests that is about 5 billion handshakes. Maya's suspects would have slipped away, the drunk locker guy would have woken up and gone home, and you would still be on the first handshake. All that impressing would be for nothing, and for a detective, slow is just a fancy word for failed.

So let's think like a detective with Maya. Instead of making everyone shake hands, look for a missing partner. You walk along the edge of that group once, and for each new person you quietly ask: has the person who would complete this one already walked past me?

If Maya's target is 10 and the new guest has `3` on his back, the missing partner is `10 - 3 == 7`. You already have a guest list trick from [[hashing/seen-it-before]], so you compute the cubby for `7` and check if it is occupied. If yes, you just found Maya's two suspects without a single handshake. If not, you add `3` to the guest list and move to the next person. One quiet pass, O(n).

That subtraction is the complement. You are not searching for yourself, you are checking if your complement is already in Maya's guest list. If that line of guests had been sorted by their numbers you could have used the two walkers from [[arrays/two-pointers]] and [[arrays/two-sum]] walking from both ends, but Maya's party group is unsorted, so this cubby check is the fastest way to keep her attention and solve her case.

```js
// one pass, check complement before storing - O(n) time, O(n) space
function twoSum(nums, target) {
  cubbies = new Map() // value -> index where you first saw it for Maya
  for i in 0 .. nums.length - 1:
    me = nums[i]
    need = target - me // the partner who would complete me for Maya
    if cubbies.has(need):
      return [cubbies.get(need), i]
    cubbies.set(me, i) // not found yet, save me for someone later
  return null
}
```

The order inside your loop matters and it is the only thing people get wrong, even when trying to impress Maya. Check first, store after. If you store first, a single `5` could incorrectly match with itself when the target is `10`. Checking first guarantees the partner came earlier, so it has to be a different person. You check the cubby before you occupy it.

Maya will make you reuse this complement check everywhere:

- Two sum and all its cousins where two things need to make X for Maya.
- Three sum is the same idea with one number fixed and complement lookup on the rest, though there sorting plus two pointers is often cleaner.
- And [[hashing/prefix-sum-plus-hashmap]] is literally you doing this trick again for Maya, just with running totals. There the complement is `pref - k`.

If you remember one line for Maya, it is this: do not look for a pair, look for the complement in the cubbies.

Whenever a problem whispers "two things that together make X," try `X - me` in your guest list before you add yourself. Maya will think you are psychic.

