---
title: "LRU Cache"
description: "Keeping only your most recently used items and tossing the rest."
createdAt: 2026-09-07
updatedAt: 2026-09-07
tags: ["hashing"]
isPinned: false
growthStage: "budding"
chapter: "3.6"
---

### Overview

So far your cubbies from [[hashing]] at the party had unlimited space and you and Maya were happily decoding together. Now Maya tells you the party host just told her that the evidence room only has `capacity` working cubbies, say 2 or 100, for her Sherlock-family mission. When they are full and a new piece of evidence needs a spot, you and Maya have to throw something out together. You should throw out the least recently used - the item you and Maya have not asked for in the longest time. Maya is very specific about this, she does not want her most important clues evicted just because they came first.

Think of you and Maya now running that tiny evidence room together for her mission. Only a few hooks actually work for your evidence. When the wall is full and a new bag arrives for your case, you both have to send one bag back. The fair rule you both agree on is to send back the bag that neither of you has touched for the longest while. The one at the very end of your recent-use line.

Hashing alone cannot do this for you two. A hash table can jump to any item in O(1), but it has no idea who was used when. You could keep a timestamp on each item for Maya's mission, but finding the least recent would mean scanning every cubby, which is O(capacity). That defeats the whole point of jumping and Maya will notice you two are slow, not a great detective duo move.

So you and Maya keep two things together. Think of them as two ways of looking at the same evidence.

One is your wall of labeled cubbies, the `Map` from [[hashing/frequency-map]] and [[hashing/seen-it-before]]. It gives you both O(1) lookup by key.

The other is a hallway line of the same evidence standing in order of use. Front is most recent, tail is least recent. Moving something to the front should be O(1) because you both just snip it out and re-link. For that you need a doubly linked list, where each piece holds hands with both neighbors. With a singly linked line you would have to walk from the front to find the previous person, which is O(n). The double links give you both O(1) snip and Maya will never see you sweating.

Your cubbies do not store the coats directly anymore. Each cubby stores a pointer to where that piece stands in the hallway line for your mission.

You and Maya also put two dummy evidence bags at the ends of the line, the traffic cones from [[foundations/core-patterns]]. They are not real, they just mean you both never have to write annoying `if hallway is empty` checks while solving the case.

```js
// hallway node has prev, next, key, value
// cubbies is Map(key -> node) for you and Maya, line is dummyHead <-> ... <-> dummyTail

function makeLRU(capacity) {
  cubbies = new Map() // labeled cubbies for your detective duo
  cap = capacity
  // hallway with cones at both ends
  head = { prev: null, next: null } // front side, most recent for you and Maya
  tail = { prev: null, next: null } // back side, least recent for you and Maya
  head.next = tail
  tail.prev = head

  function snip(node) {
    node.prev.next = node.next
    node.next.prev = node.prev
  }

  function moveToFront(node) {
    snip(node)
    node.next = head.next
    node.prev = head
    head.next.prev = node
    head.next = node
  }

  function addToFront(node) {
    node.next = head.next
    node.prev = head
    head.next.prev = node
    head.next = node
  }

  function removeFromBack() {
    victim = tail.prev // least recent for you and Maya
    snip(victim)
    return victim
  }

  function get(key) {
    if cubbies.has(key) == false:
      return -1 // you both do not have it
    node = cubbies.get(key)
    moveToFront(node) // you and Maya touched it, it becomes most recent
    return node.value
  }

  function put(key, value) {
    if cubbies.has(key):
      node = cubbies.get(key)
      node.value = value
      moveToFront(node)
      return
    newNode = { key: key, value: value, prev: null, next: null }
    addToFront(newNode)
    cubbies.set(key, newNode)
    if cubbies.size > cap:
      victim = removeFromBack() // hallway tells you both who is least recent
      cubbies.delete(victim.key)
  }

  return { get: get, put: put }
}
```

A quick walk through with Maya helps. Say capacity is 2 and your line together is `3 front -> 2 back`. `get(2)` finds 2 via cubbies, you both snip it and move to front, line becomes `2 -> 3`. `put(4)` adds 4 to front making `4 -> 2 -> 3`, size is 3, so you both snip the tail `3` and delete its cubby. No scanning anywhere, and Maya is still impressed that you two move like one.

This is the same in-place relinking you both saw in [[linkedlists/in-place-reversal]] and [[arrays/dutch-national-flag]]. You are not building a new hallway, you are just changing who holds whose hand.

The pattern for your duo to remember while solving with Maya: whenever you need O(1) lookup and O(1) ordering, tape a hash table to a line. One answers where, the other answers when. You and Maya will see this pair again anytime the mission, or any interviewer, says "most recent" or "least used." It is the same wall plus the same hallway you started with at the party, just forced to share a tiny room for your case.

## Case Closed

And that is the whole party with Maya. And it is getting so emotional, I'm going to cry. Really.

You walked in to find one bag for Maya in [[hashing]] at the party entrance. You counted her wristbands with a tally sheet in [[hashing/frequency-map]], so she trusted you. You checked every ticket at the entrance with a guest list in [[hashing/seen-it-before]], so she told you her Sherlock secret. You found the two numbered backs that cracked her code in [[hashing/complement-lookup]], you traced her trail of chits without rescanning it in [[hashing/prefix-sum-plus-hashmap]], and you lined up her scattered evidence tags in [[hashing/longest-consecutive-sequence]] without sorting them.

Now you and Maya are standing in that same tiny evidence room, watching you both snip and re-link evidence bags like pros. Maya smiles. Her Sherlock-family mission is done, the party can actually be a party now.

[[arrays]] taught you to walk the building floor by floor, hashing and Maya just taught you how to skip the walk entirely. You computed, you jumped, you kept the right pockets light. And you impressed Maya. Which, let's be honest, was the real algorithm all along.

Your detective shift with Maya is over and you are trying very hard not to look sad about it.

Maya looks at you, tucks that evidence tag she kept as a souvenir into your hand and says, "This was fun." And you want to say something to her. You have something to say. She starts fixing her bag, slightly tilts her head to the right still looking down and says, "I have to go complete the rest of my missions." Then she takes a quick glance at you with her shiny eyes which seemed a little more shiny in that moment and says, "Maybe our paths will collide again, who knows, may be just to crack another weird code some day." She smiles, turns to go. You still want to tell her something. She starts walking away into the beautiful sunlight that is slowly starting to emerge as the morning is almost arrived. She stops for a second, turns around and says:

"Oh, I forgot to ask, what is your name?"

