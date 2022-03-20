---
title: "EmberJS in 2019"
date: "2019-05-30T10:00:32.169Z"
template: "post"
draft: false
slug: "/blog/emberjs-2019-roadmap/"
category: "Automation"
tags:
  - "extension"
  - "automation"
  - "CI/CD"
description: "My list of features and improvements that I love to see in Ember core framework in 2019"
layout: ../../layouts/BlogPost.astro
---

This is the first time I'm participating in the Ember roadmap blog post series. I personally like Ember and it's abstractions to enable and increase productivity.

In order to write this blog, I curated a list of things WRT documentation and communication in the ecosystem that can be improved. On checking the docs and guides, **I'm stunned that most of those points are already addressed** in the Guides and API docs. That's excellent to know. Thanks to all the core teams and the contributors.

Below is a list of few things that I love to see in the core framework and surrounding ecosystems in the coming years.

## 1) Lightweight builds

 One of the reasons Ember is not considered among modern frameworks (that's the bitter truth) is that we aim to build a full-fledged framework with all the batteries included and ended up as a fat baby. I personally love this nature of Ember as most of the web apps ended up adding these batteries at some point of development.

 However, when a developer from other framework or a new JavaScript developer evaluates frameworks, the bundle size will be a predominant deciding factor. So, **tree shaking the framework modules** (and application code) until that's being used will have a great impact on the above-said evaluation. I love to see these such builds being the default one in future Ember apps.

There are cases where I had to leave behind Ember for this reason despite Ember outperforms most other popular frameworks like React or Vue WRT. rendering speed

## 2) Embroider

I personally think we were hanging too much with a specialized build tool that built around broccoli for a long time. Experimenting with existing popular toolkits like Webpack with Embroider is so cool and the features that other framework users are enjoying for a long time such as **HMR**, **Code Splitting** at various levels (route, component, etc.,) can be brought into the ember ecosystem with Embroider. I love to see embroider being the default built tool in 2019.

## 3) Docs around Ember CLI and Broccoli internals

 Developing Addon that is not presentational is really a harder process in Ember. The actual [API documentation](https://ember-cli.com/api/) for CLI is really not helpful to accomplish a task easily (TBH, that's impossible). I usually refer to other similar addons that utilize these hooks and learn from them in order to implement my logic. Since this involves pretty low-level stuff, proper documentation would be wonderful.

## 4) Error Communication

This is inspired from the Vue ecosystem. We are not great at communicating the errors to the developers. Once I hit a few issues, it's tough to debug them and at least it requires considerable knowledge of the framework to identify and rectify them.

When working with Vue, I feel the error communication is more elegant. In some cases, I just need to copy paste the suggested output from the console into my code to make it work. I can see that the error messages in Ember revamped constantly and it will be great if it's taken into account when building the roadmap for the upcoming year.

For a new developer, Googling the cause of the issue might be really overwhelming if the necessary context was not given and it might lead to churn.

## 5) Developer Onboarding

 I must accept that the onboarding of a new developer becomes much easier compared to the earlier days. But there are few little bumps I've seen personally in the past years.

### QueryParams

 This might be a little thing but it's really not intuitive. I've seen in new developers while working with query params, that it is not obvious to them why we have to make an entry in different files ([controller](https://api.emberjs.com/ember/3.10/classes/Controller/properties/queryParams?anchor=queryParams) file and the corresponding [route](https://api.emberjs.com/ember/3.10/classes/Route/properties/queryParams?anchor=queryParams) file) TBH, I personally cannot justify why that is being implemented in such a way.

### Testing as a separate section in the tutorials

 This might be an "Unpopular Opinion" but keeping the testing section separate in the tutorial might be a good option especially when a new developer tries out the framework for the first time. Usually, a new developer loves to see something on the screen as quickly as possible and most time I see many developers skipping this testing section and start over as after they are comfortable with the actual framework.

### Component composition and best practices

Basic preaching of topics like **"why we need components?"** and **"How a UI piece can be built using different component compositions"** and maybe few prevailing anti-patterns would be beneficial. I accept most of these topics are heavily opinionated, but, it would be great if we could document at least the most acceptable one. Maybe in a section named, **"Advanced Component Concepts"** or something similar.

## 6) Ember CLI Presets or Project template

This is a little nice to have functionality. I personally like the way Vue uses it's CLI. We can manually choose the features that we are going to use in our project, like TS or JS, Class-based component or Classic Components, Need Service workers or not from the CLI itself and the supporting packages will be installed by the CLI for us. Then we can save this as a preset and can be used in future projects. In Ember, we use `features` json to modify these settings and it would be cool to have this integrated with the CLI service itself.

A awesome addon which aims to do a similar thing is [ember-cli-create](https://www.npmjs.com/package/ember-cli-create) (like `vue create` ;))

