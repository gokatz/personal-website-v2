---
title: "How we cut down our ember build time?"
date: "2017-09-29T22:40:32.169Z"
template: "post"
draft: false
slug: "/blog/how-we-cut-down-our-ember-build-time/"
category: "Performance"
tags:
  - "emberjs"
  - "js"
  - "build"
canonical: https://dev.to/gokatz/how-we-cut-down-our-ember-build-time-ehh
description: "Tricks we incorporate to reduce our build time to almost half"
layout: ../../layouts/BlogPost.astro
---

The journey starts about 4 months back when my ember build took even 2 mins (at worst case) to rebuild (incremental rebuild). You know it's really painful 😰 when you need to wait for 2 mins to get your changes in the browser. So I decided to dive into the build process to know which of the build task took a long time to finish. Actually, there are many! Some of those are:
- concating source maps for both app and test files
- merging the trees and
- few custom build tasks.

When examing the number, a task took almost half of the total build time 😱 and that was to concatenate the test files. The first question that knocks the door was 

>"Why the test files need to be concatenated during my development, where I know I will not touch a single test file at all?" 🤔

Yes, the answer is **"You don't need to!"**. I was so relaxed that I can now eliminate half of my build time 😌. But, how? Zoooob! Headed towards the community and [this thread] (https://discuss.emberjs.com/t/excluding-test-related-files-when-building-for-environment-development/10232) helped me out. As mentioned, you can eliminate the test file manipulations by adding an option, `tests: false` to your build file (ember-cli-build.js) so that a sample build file will look like, 

```js
let EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {

  let buildOptions = {};

  if ( process.env.EMBER_ENV === 'development') {
    // only during development mode
    buildOptions.tests = false;
  }

  let app = new EmberApp(defaults, buildOptions);

  return app.toTree();
};
```

Awesome! we cut off our build to almost half but its almost a minute in worst cases. But far better than the earlier one. Days went good and on another fine day last week, I accidentally noticed that a task for concatenating source map of app files took a half part of the total build time. Again tools on the hand. Actually, I was not surprised at the numbers because our codebase is large and concatenating those files would take some time than usual. Just to have a look, I examined the source map file of our app and I once again stunned that about 15 percent of the file were from mirage folder where we have our mock-data files. Again the same question,

>why those mirage files have to be included in the build when the test files itself eliminated (in the previous process)? 🤔🤔

Fortunately, again the answer was **"Yes, don't need to include"!** Again a 15% reduction in `sourceMapConcat` time. That's great, but how to exclude those files. Luckily, `ember-cli-mirage` has an option to exclude the files explicitly with a config option (`config/environment.js`). We need to set the flag, `excludeFilesFromBuild` to true for the development environment to exclude those files from the build (as the key itself is self-explanatory). So, your config would look like, 

```js
  if (environment === 'development') {
    ENV['ember-cli-mirage'] = {
      excludeFilesFromBuild: true
    };
  }
```

It's not done ;) Yes, you guys got some bonus too if you are using engines to lazy load assets. Doc-cially, engines are defined as 

>Engines allow multiple logical applications to be composed together into a single application from the user’s perspective.

Since our codebase is large, we need to modularize and lazy load assets. For that, we prefer in-repo engines. At this point, you would have guessed! Smart! This is question time,

>Why we have to worry about the engines file (isolated application) if we are not gonna touch the engine-related modules at all? 🤔🤔🤔

The answer to this question depends on the use-cases and nature of the product/application. In my case, I was free to exclude those files too from the source-map concatenation process as my engines are almost isolated from the rest of the application that to be developed with their own scope. How to exclude engine files? 

**Ha... First, why the engines files (actually an addon) are included in source-map?**

_Because we make it so by mentioning it as a developing addon in `index.js` file of an engine to get the changes reflected in the app simultaneously/instantly for developing purposes._

Yeah, you found the answer, if you actually don't change the engine files during your development, make those engines as a developed addon 😉 as mentioned below:

```js
let EngineAddon = require('ember-engines/lib/engine-addon');
module.exports = EngineAddon.extend({
  name: 'chatbox',
  isDevelopingAddon() {
    return false;
  }
});
```

This is all for today's flash post 😊 There's a long way to go 😉 Meet you all in a future post. With respect to the engines, we should come up with configuration settings that will help us to manipulate the engine configuration (both in-repo and standalone engine) during runtime. Comments are welcome on this front. BTW, since the entire blog post is somewhat leaned against test and test cases, I must tell you all that [I love test cases](/blog//why-the-hell-i-need-test-cases/) as the same level as development process 😇.