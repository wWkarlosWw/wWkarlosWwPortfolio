---
title: From Figma to React Native without betraying the design
date: 2026-07-12
excerpt: What I learned building a mobile app from a Figma file that wasn't mine, and why design fidelity is a technical problem rather than an aesthetic one.
tags: [React Native, Figma, UI]
lang: en
---

When I was handed the company mobile app to build, the starting point was a Figma file I had not designed. The instruction was easy to say and hard to honour: make the app look like the design.

## The mistake of working screen by screen

My first instinct was to open the first screen and start laying it out. I moved fast and hit a wall just as fast: by the fourth screen I had three different buttons doing the same job, and two spacing scales that did not agree with each other.

The design was not a list of screens. It was a system with rules, and I was reading it as if it were a catalogue of pictures.

## Reading the file before writing code

I went back and spent a full day not programming. Just walking the file and writing down:

- How many text sizes actually exist
- How many spacing values repeat
- Which components appear on more than one screen
- Where the designer broke their own rule on purpose

That last point is the interesting one. There are almost always intentional exceptions, and telling them apart from oversights is half the work. When I was not sure, I asked instead of guessing.

## Tokens first, screens later

From that list I built the tokens before any view: colours, typography, spacing scale. Then the shared components. Only at the end, the screens.

The second half of the project went noticeably faster than the first, and not because I had become a better programmer in three weeks. It was because new screens barely needed new code any more.

> Faithful design does not come from staring at the reference. It comes from extracting its rules and letting the code obey them.

## When it is worth pushing back

During development, details showed up that did not work on a real screen the way they did on the canvas: a tap target that was too small, text that clipped on narrow phones.

That is where I proposed changes, and several were approved. The gap between proposing and changing things unilaterally is huge: the first adds judgement to the team, the second breaks the trust that the app reflects what was agreed.
