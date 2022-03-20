---
title: "Testing 'install' and 'update' flows in chrome extensions"
date: "2019-01-21T22:40:32.169Z"
template: "post"
draft: false
slug: "/blog/test-install-update-flow-chrome-extensions/"
category: "Testing"
tags:
  - "chromeextension"
  - "js"
  - "testing"
description: "Testing the extension update and initial install flow could be tricky. This post will walk you through few steps to test all such flows during development stage itself."
layout: ../../layouts/BlogPost.astro
---

This is a very tiny post pointing out to an existing chrome app development guide about testing chrome extension with respect to install and update flows. These testing may become tricky because during the development stage we use [**Unpacked extensions**](https://developer.chrome.com/extensions/getstarted#manifest). With this method, we may not get to test the actual install and update flows as the related event will not be fired. 

For instance, it's hard to test the *permission* flow when using the unpacked extension. We might include new permission into our manifest and need to test before pushing into the web store. 

There is a way to test such scenarios. We can pack the extension locally (into a `.crx` file) and install our actual extension from a local file (using `.crx` format of the extension). So that, the chrome will treat it as a normal install. Thus, we can test all the install as well as update workflows. 

This [section of the chrome extension development guide](https://developer.chrome.com/extensions/permission_warnings#view_warnings) walk through the process of:

* Creating a `.crx` file (extension source) and `.pem` file (private key) for your extension 
* Installing the `.crx` file into Chrome
* Simulating the update process using the `.pem` file. If the extension is loaded without a `.pem` file, it will be acted as a new install and if we load with an existing `.pem` file, the loaded `.crx` file will be treated as an update to an existing  extension (if exists)

This section will be focused on the permission part we saw as an example. Hope this helps in deploying your extension with confidence. 

**Bonus Note:**

Always have a staging build for your extension such as a separate webstore extension [visible only to testers](https://developer.chrome.com/webstore/publish#publishing-to-test-accounts). Publish new builds to the test extension before making it live. I bet it will save you from a ton of awkwardness. It helped me a lot 😉
