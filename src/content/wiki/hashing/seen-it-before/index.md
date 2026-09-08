---
title: "Seen It Before?"
description: "Using a set to instantly know if you've encountered something already."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["hashing"]
isPinned: false
growthStage: "budding"
chapter: "3.2"
---

### Overview

You counted all those wristbands for Maya in [[hashing/frequency-map]] and she gave you a smile. That seems like progress, buddy. The party is still going around you, music in the background. She now trusts you since you seem a little smart, so she tells you a secret. She's actually a long-related cousin of Sherlock and came to this party for a very important mission. She doesn't reveal much about it though and asks you to check the tickets of every person entering the party. The same name should not walk in twice, can you tell if someone is trying to sneak in again? Well, as you say Maya.

Some problems do not care how many times you saw something. Maya does not need to know how many times Raj came, she just wants a yes or no. Have we seen this ticket before?

You could use the tally sheet from [[hashing/frequency-map]] and check if the count is greater than 0. It works, but then you are carrying a clicker when all you needed was a checkmark. Maya would laugh at you for over-engineering, and she would be right.

So let's think better. Just keep a guest list. It is the same labeled cubbies from [[hashing]], just without the tick counts. You kept the headings from that tally sheet and threw away the numbers. A key is either there or it is not. That is a Set in code.

As people walk in, you compute the cubby for each name and check if it is already occupied. Empty means first time, you occupy it and wave them through. Occupied means duplicate, you caught them and Maya is impressed again.

```js
// one check per person - O(n) time, O(n) space
function hasDuplicate(faces) {
  guestList = new Set() // name is present or not
  for face in faces:
    if guestList.has(face):
      return true // seen before, caught
    guestList.add(face) // first time, write it down
  return false
}
```

It is the lightest thing you can keep in your pocket from [[foundations/complexity]] and it makes your intent obvious. Anyone reading this knows you only cared about presence, not frequency. That clarity is the whole point.

Once you have the guest list idea, Maya will ask you for it again and again:

- Contains duplicate? One guest list check, done.
- Do two groups share anyone? Fill a Set with group A for Maya, then walk group B and check.
- What is the first repeated character? The first name that finds its cubby already occupied is your answer. Maya loves that one.

You already saw this pocket check in [[foundations/core-patterns]] under state. There it was called `seen`. The only difference now is you know why `seen.has` is O(1) for Maya - the cubby for that key is computed, not searched.

Whenever the question is about duplicate or unique and not about how many times, do not bring the tally sheet. Bring the guest list and keep impressing Maya.

