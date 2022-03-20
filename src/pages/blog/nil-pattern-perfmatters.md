---
title: "NIL pattern (#perfmatters)"
date: "2018-08-02T22:40:32.169Z"
template: "post"
draft: false
slug: "/blog/nil-pattern-perfmatters/"
category: "Performance"
tags:
  - "emberjs"
  - "js"
  - "performance"
description: "Setting up a auto-updater would be something significant in many case and this post is all about setting up a auto updater successfully!"
layout: ../../layouts/BlogPost.astro
---

While delivering content to our users via the internet, performance is one of the key checkboxes that need to be checked. Even though our content is awesome, we may face churns over our products if our site/app is not performing well. We need to *Start Fast! and Stay Fast!!* to grab and retain our user base.


There are a lot of awesome and clever techniques out there to improve the performance of our sites which includes reducing the initial load, proper asset caching, prefetching critical resources, offloading heavy computation to workers etc., 

In this article, we are going to see another such technique that I inspired from a Pinterest engineering blog about their [one year PWA success story](https://medium.com/@Pinterest_Engineering/a-one-year-pwa-retrospective-f4a2f4129e05) by [Zack Argyle](https://twitter.com/ZackArgyle). The entire post was a very neat narration of their journey. Definitely give it a try to know more about interesting loading patterns.

The idea taken from the post is:

*if you browse a feed of Pins, we have information about each Pin. When you tap on one, it takes you to a detailed view. Because the Pin data is normalized, we can easily show the limited details we have from the feed view until the full details finish being fetched from the server*

We might have cases in our application where we have a list of things to pick from a list and upon clicking an item, we should load the entire details of the item. That is where the NIL pattern _(expansion to be disclosed 😜)_ will come into play. Take all the data available in the list view and put it on the details view when a user clicks on the particular item and fetch only the remaining details to be displayed on the details view while user digesting the displayed data.

Named the above-said pattern as **Near Instant Loading (NIL)** pattern 😉!

By implementing this, we can even entirely eliminate a loading spinner that splashes everytime the user click on the item. With this little perceived-performance improvement, the user might feel the page rendering as instant 💪

Following is an implementation of NIL pattern in an Ember.js app and can be inherited to any frameworks.

Our sample application is a blog site which has a list of blogs posts. With an ordinary implementation, the site is something like 👇

![usual loading pattern](https://thepracticaldev.s3.amazonaws.com/i/q6rzlkdcbeh1m47hp252.gif)


We got that loading splash everytime we click on any post and have to wait for the data to load from the server. This loading time depends on various factors. To implement the NIL pattern, first, we need to eliminate the intermediate loading sub-state (the loading screen after clicking the post) and then pass the data from the list page to the details page. The loading sub-state is due to the network request to fetch the entire post details originated from the *model* hook. If we suppress the model hook, then loading screen will not be pulled in. Great! but, how to do that?

While transitioning to the details view, if we pass along the model data, the model hook present in the details page will not be invoked, instead, the data sent from the list page will be used as a model.

```js
// routes/posts.js - Before

this.transitionTo('post.details', post.id);
```  

```js
// routes/posts.js - After

this.transitionTo('post.details', post);
```  

Here, `post` will be the limited data from the list page. Here, the point to be noticed is that the _data needs to be normalized_ as same as that of the model we maintain in details page to avoid breakages.

For instance, if you structure the post data in the details page to be inside an object with key `details`, then you have to normalize it correctly.


```js
// routes/posts.js

let postDetails = {
    details: post // from the list page
}
this.transitionTo('post.details', postDetails);
```

If you have done this far, then you are awesome! Now your details page should be loaded instantly without any loading sub-state. Hi-Fi 🙌

But you can also notice that our page will be half-baked. No worries! We gonna fix that. As mentioned earlier, we have to fetch the *remaining* data while the user digests the available data. For this, we can trigger a data fetch inside the `setupController` hook to pull out the remaining data.


```js
// routes/posts/list.js

setupController(controller, model) {
    this._super(...arguments);
    let postId = model.details.id; // model is the passed data from the list
    controller.get('fetchPostMeta').perform({ postId });
    controller.get('fetchComment').perform({ postId });
}
```

In the above snippet, I've used `ember-concurrency` tasks to fetch the remaining post details and comments for that post. Until the task finish and data loads in the UI, we could use a loading symbol on appropriate positions. Again we have to properly normalize the lazily loaded data. One extra hack to again improve the perceived performance here is to use skeleton loader in place wherever possible. There is another great article about [skeleton loading in Ember.js](https://emberway.io/skeleton-screen-loading-in-ember-js-2f7ac2384d63) by [Lauren](https://twitter.com/sugarpirate_). Check for detailed implementation details 😃

After implementing the **NIL pattern**, our sample app would be something like as follow:

![NIL Pattern implement](https://thepracticaldev.s3.amazonaws.com/i/y16ayq8e561lklzud1gc.gif) 

You can see that the author of the blog as well as the comments has been lazily loaded. This is probably a lot better than the previous version where the users have to wait for a while to get some content on the screen.

Hope this helps you save few moments of your users 🙂That's a big win right! 😉 Completed twiddle can be found [here](https://ember-twiddle.com/ab964da9e161c5a7996b1677f3eb09c5?openFiles=templates.posts.details.hbs%2C&route=%2F1)
