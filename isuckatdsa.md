Growth stages legend: budding → sprouting → growing → blooming → evergreen

---

## 0. Foundations

Foundations
No-BS DSA overview - simple mental models and patterns, not deep technical docs.
budding

Complexity
Big O, time and space complexity, and input constraints.
budding

Core Programming Patterns
Iteration, recursion, invariants, and frequency counting.
budding

C++ STL
C++ Standard Template Library - containers, algorithms, and utilities.
budding

Java STL
Java Standard Template Library - collections, algorithms, and utilities.
budding

Python STL
Python Standard Library - data structures, algorithms, and utilities.
budding

---

## 1. Arrays

Arrays
Why arrays are just an apartment building of numbered slots.
budding

Two Pointers
Two people walking toward each other (or the same direction) through an array.
budding

Sliding Window
A moving camera frame that grows or shrinks over a sequence.
budding

Prefix Sum
Keeping a running total so you never have to re-add the same numbers twice.
budding

Kadane's Algorithm
Deciding moment by moment whether to keep your streak or start fresh.
budding

Dutch National Flag
Sorting three buckets of stuff in one pass without extra space.
budding

Two Sum
Finding two numbers that shake hands to make a target.
budding

Product of Array Except Self
Multiplying everything except yourself, without dividing.
budding

Trapping Rain Water
How much water sits between buildings of different heights.
budding

Container With Most Water
Picking two walls that hold the most water between them.
budding

Array Grab Bag
Move Zeroes, Next Permutation, Missing Number - quick common patterns.
budding

---

## 2. Strings

Strings
Arrays that happen to spell things.
budding

Palindrome Check
Reading the same forwards and backwards.
budding

Anagram Check
Same letters, shuffled into a different order.
budding

Sliding Window on Strings
Longest substring without repeats and minimum window substring.
budding

Group Anagrams
Sorting words into families that share the same letters.
budding

Advanced String Matching
KMP, Rabin-Karp, and rolling hash - finding a needle in a haystack fast.
budding

---

## 3. Hashing

Hashing
Labeled lockers where you can grab your stuff instantly.
budding

Frequency Map
Counting how many times each thing shows up.
budding

Seen It Before?
Using a set to instantly know if you've encountered something already.
budding

Complement Lookup
Asking "what's missing to complete this pair?" instead of searching for it.
budding

Prefix Sum + HashMap
Remembering past running totals to answer "did this happen before?"
budding

Longest Consecutive Sequence
Finding the longest unbroken chain of numbers without sorting.
budding

LRU Cache
Keeping only your most recently used items and tossing the rest.
budding

---

## 4. Linked Lists

Linked Lists
A treasure hunt where each clue points to the next.
budding

Dummy Node Trick
Adding a fake starting point so you never have to special-case the head.
budding

Fast & Slow Pointers
One runner and one walker on the same track - useful tricks fall out of the gap.
budding

In-Place Reversal
Flipping the direction of the arrows without extra space.
budding

Merging Sorted Lists
Zipping two (or many) sorted lines together into one.
budding

Remove Nth From End
Counting from the back without knowing the length up front.
budding

Palindrome Linked List
Checking if a chain of clues reads the same both ways.
budding

---

## 5. Stack

Stack
A pile of plates - last one on is the first one off.
sprouting

Valid Parentheses
Making sure every opening bracket finds its matching close.
sprouting

Monotonic Stack
Keeping a pile that only ever goes one direction, so you can peek at what's "next bigger."
sprouting

Daily Temperatures
How many days until it gets warmer than today.
sprouting

Largest Rectangle in Histogram
Finding the biggest box that fits under a skyline.
sprouting

Min Stack
A pile of plates that also remembers its lightest plate at all times.
sprouting

---

## 6. Queue & Deque

Queue & Deque
A ticket counter line - first come, first served.
sprouting

Queue via Two Stacks
Faking a line using two piles of plates.
sprouting

Monotonic Deque
A line that kicks out anyone weaker than the newest arrival.
sprouting

Sliding Window Maximum
Tracking the biggest value in a moving window efficiently.
sprouting

---

## 7. Recursion

Recursion
Russian dolls - each one contains a smaller version of itself.
sprouting

Base Case & Recursive Case
Knowing when to stop opening dolls and when to open one more.
sprouting

Call Stack Visualization
Watching the dolls stack up and then close back down.
sprouting

Divide and Conquer Mindset
Breaking a big problem into smaller identical problems.
sprouting

Recursion Classics
Factorial, Fibonacci, subsets and permutations - recursion's greatest hits.
sprouting

---

## 8. Backtracking

Backtracking
Exploring a maze with a pencil and an eraser.
sprouting

Choose, Explore, Un-Choose
The three-step dance behind every backtracking solution.
sprouting

Subsets, Permutations, Combinations
Generating every possible grouping or ordering of a set.
sprouting

Combination Sum
Picking numbers (reusable or not) that add up to a target.
sprouting

N-Queens
Placing queens on a board so none of them can attack each other.
sprouting

Word Search
Hunting for a word by walking letter to letter on a grid.
sprouting

Generate Parentheses
Building every valid way to balance a set of brackets.
sprouting

---

## 9. Sorting

Sorting
Organizing a messy room, several different ways.
sprouting

Simple Sorts
Bubble, selection, and insertion sort - the "obvious but slow" methods.
sprouting

Efficient Sorts
Merge sort, quick sort, and heap sort - the clever, faster methods.
sprouting

Sorting Without Comparing
Counting sort, bucket sort, and radix sort.
sprouting

Quickselect
Finding the Kth largest or smallest item without sorting everything.
sprouting

---

## 10. Binary Search

Binary Search
Guessing a number between 1 and 100 in the fewest tries.
growing

Boundary Search
Finding the first or last occurrence of something in sorted data.
growing

Binary Search on Answer
Guessing the answer itself, not just its position in an array.
growing

Search in Rotated Sorted Array
Binary search when the sorted line got cut and spliced.
growing

Find Peak Element
Climbing toward a local mountaintop using halves.
growing

---

## 11. Matrix / Grid

Matrix / Grid
A city map made of blocks you can walk between.
growing

Flood Fill
Spreading paint outward from a starting point.
growing

Number of Islands
Counting separate landmasses hidden in a grid of water and land.
growing

Rotting Oranges
Watching rot spread outward from multiple starting points at once.
growing

Grid Transformations
Spiral matrix, rotate image, and set matrix zeroes.
growing

---

## 12. Intervals

Intervals
Overlapping events on a shared calendar.
growing

Merge Intervals
Squishing overlapping events into one block.
growing

Meeting Rooms
How many rooms you need so nobody's meeting overlaps.
growing

Insert Interval
Dropping a new event into an already-sorted calendar.
growing

Non-Overlapping Intervals
Removing the fewest events so nothing overlaps anymore.
growing

---

## 13. Trees

Trees
A family tree, branching downward from one ancestor.
growing

Tree Traversals
Preorder, inorder, postorder, and level-order - different ways to visit every relative.
growing

Trust the Smaller Subtree
The recursive mindset of solving a tree problem one branch at a time.
growing

BST Property
Why left is always smaller and right is always bigger.
growing

Depth, Diameter & Balance
Measuring how tall, wide, or lopsided a tree is.
growing

Invert Binary Tree
Flipping a tree into its mirror image.
growing

Lowest Common Ancestor
Finding the closest shared relative of two nodes.
growing

Validate BST
Checking that a tree actually follows the rules it claims to.
growing

Serialize & Deserialize
Flattening a tree into a string and rebuilding it later.
growing

Path Sum Problems
Finding paths through a tree that add up to a target.
growing

---

## 14. Heap / Priority Queue

Heap / Priority Queue
Emergency room triage - most urgent case gets seen first.
growing

Min-Heap vs Max-Heap
Always knowing the smallest or biggest item instantly.
growing

Top K Elements
Keeping only the K most important items as you go.
growing

Kth Largest / Smallest
Finding a specific rank without fully sorting.
growing

Two Heaps
Splitting data into a "small half" and "big half" to track the median.
growing

Merge K Sorted Lists (Heap Version)
Merging many sorted lines at once using a priority queue.
growing

Task Scheduler
Scheduling jobs with cooldowns using priority.
growing

---

## 15. Trie

Trie
A living dictionary built out of shared prefixes.
blooming

Insert, Search, Prefix Search
Walking character by character down the dictionary tree.
blooming

Word Search II
Searching a grid for many words at once using a trie.
blooming

Autocomplete
Why your phone finishes your sentences - a trie in the real world.
blooming

---

## 16. Graphs

Graphs
A city's road network - places connected by paths.
blooming

BFS vs DFS
Spreading like a rumor vs exploring like a maze-walker.
blooming

Cycle Detection
Figuring out if you can walk in a circle and end up where you started.
blooming

Topological Sort
Ordering tasks so nothing runs before its prerequisites.
blooming

Union-Find
Tracking friend groups and who's connected to who.
blooming

Dijkstra
GPS navigation - shortest path when all roads cost something positive.
blooming

Bellman-Ford
GPS that still works even when some roads give you money back.
blooming

Minimum Spanning Tree
The cheapest way to connect every city with roads.
blooming

Graph Classics
Clone Graph, Course Schedule, and Word Ladder.
blooming

---

## 17. Greedy

Greedy
Always grabbing the best-looking snack right now.
blooming

When Local Best = Global Best
Why greedy works sometimes and completely fails other times.
blooming

Activity Selection
Scheduling the most non-overlapping events possible.
blooming

Jump Game
Figuring out if you can hop your way to the end.
blooming

Gas Station
Finding the one starting point that lets you complete a full loop.
blooming

Partition Labels
Splitting a sequence into the fewest pieces without breaking groups apart.
blooming

Greedy + Heap
Combining "grab the best now" with a priority queue.
blooming

---

## 18. Dynamic Programming

Dynamic Programming
A notebook where you write down answers so you never solve the same problem twice.
blooming

Recognizing DP
Spotting overlapping subproblems and optimal substructure.
blooming

1D DP
Climbing stairs, house robber, coin change, and word break.
blooming

2D DP
Unique paths, edit distance, and longest common subsequence.
blooming

Knapsack
Packing the most value into a bag with limited space.
blooming

Longest Increasing Subsequence
Finding the longest run of numbers that keeps going up.
blooming

Interval DP
Burst balloons - solving problems defined over ranges.
blooming

Tree DP
House Robber III - making decisions that ripple up a tree.
blooming

Bitmask DP
Tracking which items you've used with a row of on/off switches.
blooming

---

## 19. Bit Manipulation

Bit Manipulation
A row of light switches, flipped on and off.
evergreen

Bitwise Basics
AND, OR, XOR, and shifts explained without the jargon.
evergreen

Power of Two & Set Bits
Quick tricks for checking and counting bits.
evergreen

Single Number
Using XOR to find the one thing that doesn't have a pair.
evergreen

Bitmask as a Set
Representing "which items are included" as a row of switches.
evergreen

---

## 20. Math for DSA

Math for DSA
Numbers have patterns too - the toolkit behind the algorithms.
evergreen

GCD & LCM
The Euclidean algorithm and why it's so fast.
evergreen

Primes & Sieve
Finding prime numbers efficiently, all at once.
evergreen

Modular Arithmetic
Why we mod by a big prime and what it actually means.
evergreen

Fast Exponentiation
Raising numbers to huge powers without looping forever.
evergreen

Basic Combinatorics
Counting how many ways something can happen.
evergreen

---

## 21. Geometry

Geometry
Points, lines, and the space between them.
evergreen

Orientation & Cross Product
Figuring out if you're turning left or right.
evergreen

Rectangle Overlap & Line Intersection
Checking if two shapes are stepping on each other's toes.
evergreen

---

## 22. Recognition System

Recognition System
The cheat sheet: what you see in a problem, and what it's hinting at.
evergreen

Array/String Signals
Clues that point to sliding window, two pointers, or prefix sum.
evergreen

Linked List Signals
Clues that point to fast/slow pointers or pointer rewiring.
evergreen

Tree/Graph Signals
Clues that point to DFS, BFS, or topological sort.
evergreen

DP/Greedy Signals
Clues that point to "notebook of subproblems" vs "grab the best now."
evergreen
