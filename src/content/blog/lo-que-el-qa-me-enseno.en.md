---
title: What learning QA did to the way I write code
date: 2026-05-28
excerpt: Studying white, grey and black box testing did not turn me into a tester. It changed the order in which I think when I write a function.
tags: [QA, Testing, Practice]
lang: en
---

I studied white, grey and black box testing expecting to learn how to break other people's software. What ended up changing was how I write my own.

## Three ways of looking at the same thing

The distinction, stated without ceremony:

1. **Black box** — I only see inputs and outputs. I test the contract.
2. **Grey box** — I know part of the internal structure. I test the contract knowing where it usually hurts.
3. **White box** — I see all the code. I test the paths, including the ones nobody walks.

The useful part is not memorising the definitions. It is noticing you can swap hats at will over the same code.

## The habit that stuck

Now, before calling a function done, I look at it twice:

- First as the author: does it do what I meant?
- Then as a black box: if I only had the signature and the name, what would I feed it to break it?

The second look is the one that finds the `null` I did not account for, the empty list, the string with leading spaces, the negative number where I assumed there would always be a positive one.

## Edge cases are not rare cases

For a long time I thought edge cases were improbable situations worth skipping for speed. Production taught me the opposite: users reach the edges constantly, without trying.

The empty field nobody would leave blank gets left blank. The order for zero units gets placed. The connection drops exactly halfway through the request.

> Writing the test before fixing the bug is what stops the same bug from returning in three months wearing different clothes.

## Where it pays off and where it does not

I do not test everything. On a weekend side project, writing full suites would be ceremony without an audience.

Where I do insist is on logic that touches money, inventory, or data that cannot be rebuilt. There, a ten-line unit test has more than once been worth an entire afternoon of not having to investigate what happened.
