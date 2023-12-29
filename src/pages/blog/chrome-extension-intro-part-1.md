---
title: "My Intro to Chrome Extension Development - A Series"
date: "2021-10-19T10:00:32.169Z"
template: "post"
draft: false
slug: "/blog/chrome-extension-intro-part-1/"
category: "Chrome Extension Development 101"
tags:
  - "Chrome"
  - "Extension"
canonical: https://dev.to/gokatz/my-intro-to-chrome-extension-development-46lg
description: "This is the first part of a series which aims to explain the development process of browser extensions and the related ecosystem."
heroImage: "/assets/images/chrome-laptop.jpg"
layout: ../../layouts/BlogPost.astro
---

*<center> <small> [Image from From [pexels.com](https://www.pexels.com/photo/macbook-air-on-grey-wooden-table-67112/)] </small> </center>*

Building a chrome extension is definitely a fun process! Chrome extensions open a whole new set of doors to the web developers and users as well.

That is the reason I’m planning this to be a series of blogs explaining in-depth about the chrome extension ecosystem and the development, testing, and deployment process. This is the first part which explains what are chrome extensions and a brief about other browser ecosystems.

## What are Chrome Extensions?

As per the official [chrome extension development guide](https://developer.chrome.com/docs/extensions/), the definition for a chrome extension would be:

> Extensions are software programs, built on web technologies (such as HTML, CSS, and JavaScript) that enable users to customize the Chrome browsing experience.

This definition is self-explanatory, right? However, I would put it in a slightly different way:

_Extensions are used to **enhance the browsing experience** using the customization feature enabled by the browsers via various APIs_

These customization ranges from changing a content, [look and feel](https://chrome.google.com/webstore/detail/dark-mode/dmghijelimhndkbmpgbldicpogfkceaj?hl=en) inside a webpage, [injecting a widget](https://chrome.google.com/webstore/detail/grammarly-for-chrome/kbfnbcaeplbcioakkpcpgfkobkghlhen?hl=en) into the page and all the way to [intercept the network request](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en) and change its behavior and content. The possibility is **limitless**.

A little history
----------------

The extension architecture we are using today is a modern take by the web browser vendors to extend the browse functionality. Before the current extension architecture, we had plugin architecture using API surfaces like [NPAPI](https://en.wikipedia.org/wiki/NPAPI), etc., You might have heard about the recently [depreacted Adobe flash plugiun](https://www.adobe.com/in/products/flashplayer/end-of-life.html) for the browsers. This is a classic example of plugin software.

Due to various limitations and issues such as security (No Sandboxing), stability, etc. browser vendors decided to deprecate the plugin ecosystem and come up with the now existing, browser extension architecture built using the existing web technologies.

Is it worth our time?
---------------------

We might have heard about/used extensions that are fun to use and concise in functionality. However, the possibility is not so concise and companies around the globe are making use of this technology to improve the product experience and drive a lot more customers towards their brand/site. For instance, for a business like password managers/vault-like, [Zoho Vault](https://www.zoho.com/vault) (I worked here 😉), [LastKeep](https://www.lastpass.com/), etc., browser extensions are not an optional one. They had to have an extension to work seamlessly and it drives a major part of the user experience and of course, in turn, revenue.

Hence, depending upon our use case/business model, the knowledge about chrome extensions and it’s development might be crucial and of course, there is always fun tweaking the browser behavior, right? 😉

## How to build one?

We’ve seen a brief intro about the extension and its ecosystem. Let’s dive into the actual chrome extension development process. The chrome extension development history has seen a lot of phases and the process we are following today is a result of the refinement of those phases. In the modern era, we can develop a chrome extension by using the web technologies we are familiar with, **HTML, CSS, and JavaScript** with the help of a **bunch of browser APIs** exposed by Chrome to access the internals of the browser itself. These APIs are the ones that help us to build the enhanced experience.

A-lot-simplified architecture would be something like:

![Chrome Arch](/assets/images/chrome-arch.png)

## The Standard

The development story of the extension had been coupled to individual browser vendors. Each vendor devised their own way to develop and package an extension for their browser software. This causes a lot of roadblocks for developers to build their extensions across multiple browser vendors. To solve this and to make the development process close to today’s web developers, initially, Mozilla joined hands with Microsoft and Opera to come up with the initial draft. The spec closely resembles the APIs devised by Chrome for their extensions.

Unfortunately, lately, the spec has had no traction and dormant for some time. Let’s hope the work will be resumed in near future in this space 🤞

The spec draft can be found here: [https://browserext.github.io/browserext/](https://browserext.github.io/browserext/)

## Why Just Chrome?

As we can see, browser vendors are more keen to unify the extension development process so that the extension will work cross-browser. Then, it will be a natural question, then why should we just learn about Chrome extension and not a genetic development process.

The main reason is that the web extension spec has still a long way to rely on and they are heavily inspired by Chrome’s API. So,

*   we are gonna focus on building chrome extension as the skills are transferable to any browser vendors
*   We are gonna learn how to port a chrome extension into other browsers at the end of this series as well.

So, stay tuned. We gonna explore a lot about chrome extensions and the relevant ecosystem. Until then, see you all 👋👋