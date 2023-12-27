---
title: "Why the hell I need a test-case?"
date: "2017-09-07T22:40:32.169Z"
template: "post"
draft: false
slug: "/blog/why-the-hell-i-need-test-cases/"
category: "Testing"
tags:
  - "js"
  - "testing"
canonical: https://dev.to/gokatz/how-we-cut-down-our-ember-build-time-ehh
description: "The path from 'why the hell I need a test-case?' to 'you test-case, I love you ❤'"
layout: ../../layouts/BlogPost.astro
---

## One fine day 🌅

I'm a front-end developer who mainly focuses on the development using [ember.js](https://emberjs.com/) and related ecosystem. During my initial phase of development career, I vigorously focused on building things rather than testing those pieces. Typical mindset of a newbie dev! Do you believe, that the scenario continued even for a year? Yes, that was the bitter truth. One fine day, my team decided to cover at-least acceptance tests for all the modules. The ultimate part was that it was me to initiate the journey. I felt really unfortunate that day without experiencing the potential of test-cases. 

## first taste with test-case

With that deep sorrow, I began to keen into the eco-system to get started. As ember.js has a built-in test environment with QUnit, the choices were obvious. We went with ember-cli-mirage for data mocking (Ha.. enough of tech stack 😉). With some code reference, I manage to write my first acceptance test to test whether the particular page is rendered or not. Fortunately, I succeed in a bunch of attempts.

Still then, I wasn't motivated to adopt [TDD](https://en.wikipedia.org/wiki/Test-driven_development). I saw that as one of my tasks and not as a way of writing code. On the course of time, the repo was filled with a lot of acceptance test cases and days were went fine!

## Second fine day 🌅🌅

After about 8 months, On an another fine day, I was into a feature development. On a usual note, I develop with cheers! I manually tested the feature and it worked as expected. Finally, I wrote test case for that feature with a face like 👉 😏. I ran the specific cases - test case passed in dev. Then what? I pushed my changes for review. Super COOL!

Things began to happen thereafter. The test case build for my branch failed that too because of cases where I haven't changed even a letter (both in the app or test) 😱. Instantly, I reran the test build as I suspect the runner as I'm pretty confident of my test cases (Yeah, it ran perfectly in my dev, right ?). No luck! failed again. Then  I decided to debug the failed cases. 

[At this point, you might have figured out!]

Yes, there was an issue in my code. I made changes to some common files to achieve few functionalities. That was the place where issues budded. Those common files have been shared by almost all the modules in my application. The changes went awesome for my feature (module) but unfortunately, not with all the modules 😑. Some of the other modules were broken like 

<!-- ![broken gif](https://thepracticaldev.s3.amazonaws.com/i/5uorey6txcvde39zmn43.gif) -->

Thank whom-so-ever. I fixed the code to support all the modules. The questions rushing into my mind was, _What if we don't have test cases covering all modules?_, _What if the buggy code went production?_ The effects may be worse than I thought.

You know, that was the day when I fell in love with test-cases ❤. Yes, test cases are good 😇. So, EOD, 

**"why the hell I need a test-case ?"**
_- bcoz, I love my product and don't want my customers to experience any piece of junk in my product._

---
