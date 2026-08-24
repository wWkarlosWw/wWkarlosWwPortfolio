---
title: Building the same project twice, on purpose
date: 2026-03-09
excerpt: I built the same PokéDex in Vue and in React Native. It was not wasted time: it was the cheapest way I found to see what belongs to the framework and what belongs to me.
tags: [Vue, React Native, Learning]
lang: en
---

I had a finished PokéDex in Vue and decided to build it again, this time in React Native. From the outside it looks like repeated work. It was the opposite.

## The problem with learning one framework at a time

When you learn a single tool, it is impossible to tell which part of what you know is real knowledge and which part is a habit of that tool.

I thought I understood state management. What I understood was state management *in Vue*. Those are not the same thing, and I only noticed when I had to solve the same problem without the same pieces.

## What changed and what did not

Rewriting the app made the separation sharp.

**Changed:** the syntax, the way reactivity is declared, the navigation system, how styles are applied, and what you can assume about the screen.

**Did not change:** anything that mattered.

- What the app asks the API for, and when
- How already-downloaded data is cached
- What is shown while loading
- What is shown when the search finds nothing
- How the data model is organised

That second list travels to any stack. The first is what you relearn in a week.

> If starting the second version feels hard, it is not that you do not know the new framework. It is that the first version had its logic tangled with its views.

## The most honest symptom

The most uncomfortable part of the exercise was discovering that the logic I believed was clean was glued to the Vue components. Every time I had to copy and adapt rather than simply move, I had found a place where I had mixed domain with presentation.

Nobody flagged it in a code review. The move itself flagged it.

## I would recommend it, with one condition

It is worth doing if the project is small and you have already finished it once. The point is for the problem to be fully solved in your head, so all your attention goes to the tool.

With a large project, or one you do not fully understand yet, it turns into two lessons at the same time and neither gets learned well.
