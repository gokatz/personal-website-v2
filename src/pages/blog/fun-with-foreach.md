---
setup: |
  import Image from '../../components/Image.astro'
title: "Fun With forEach"
date: "2019-06-06T10:00:32.169Z"
template: "post"
draft: false
slug: "/blog/fun-with-foreach/"
category: "Fun With Arrays"
tags:
  - "javascript"
canonical: https://dev.to/gokatz/fun-with-foreach-1p1o
description: "Have fun with forEach by guessing few snippets that we might not encounter in real-time applications. Share your fun forEach snippets and let's all have fun! 👯‍♂️👯‍♂️"
layout: ../../layouts/BlogPost.astro
heroImage: "/assets/images/fun-with-foreach.png" 
---
## So, what's2 a forEach?

`forEach` is a little guy who iterates/loops through the array and executes the given callback for each element. It's more like the traditional `for` loop, but with a functional touch. A sample snippet would be like,

```js
let colors = ['black', 'blue', 'red'];

colors.forEach((color) => {
    console.log(`${color} is a cool color`);
});
```

And the output will be:

```
black is a cool color
blue is a cool color
red is a cool color
```

So, as you can see, `forEach` will invoke the callback for each entry of the callee array. Yes, you might already know that what's fun with this?

## What's the Fun in there? 👯‍♂️

We are gonna see some snippets that you might not encounter in real-time products/application and try to guess the result of those snippets (without peeking through the output 👀). That's where the real fun lies 😉

### Snippet 1

```js
let colors = ['black', 'blue', 'red'];

colors.forEach((color) => {
    colors.push('cyan');
    console.log(`${color} is a cool color`);
});

console.log(colors);
```

So, When I thought through this snippet, I predicted this would lead to an infinite loop. That's totally understandable, right? But, our little guy, `forEach`, will **run the callback only for the exact number of times as that of the initial array length**.

This is a little [Twitter poll](https://twitter.com/_gokatz/status/1129378217226203136) stating a snippet like this. Check this out. You are not alone 😛

Here, the initial array length is 3 and the callback will be executed only for 3 times. However, the **callback can mutate/change the array**. But, the callbacks will not be executed for the later elements that are outside the bound (initial length).

So, the output will be:

```
black is a cool color
blue is a cool color
red is a cool color
[ 'black', 'blue', 'red', 'cyan', 'cyan', 'cyan' ]
```

### Snippet 2

```js
let colors = ['black', 'blue', 'red'];

colors.forEach((color, index) => {
    colors[index+1] = 'cyan';
    console.log(`${color} is a cool color`);
});

console.log(colors);
```

As per the rule that **callback can mutate the array**, the output for this snippet will be somewhat straight-forward. From the first run itself, we are changing the array value of the next index to `cyan` with this `colors[index+1] = 'cyan'` statement. So, the output will be:

```
black is a cool color
cyan is a cool color
cyan is a cool color
[ 'black', 'cyan', 'cyan', 'cyan' ]
```

As you might be noticed, There is an extra element in the resulting array and that's because, on the last run (index = 2), we are assigning the next index (index = 3) element's value as `cyan` and as said before, the callback will not be run for that last element we just pushed as it resides outside the initial array length.

### Snippet 3

```js
let colors = ['black', 'blue', 'red'];

colors.forEach((color, index) => {
    delete colors[index+1];
    console.log(`${color} is a cool color`);
});

console.log(colors);
```

Now, we delete items from the array. What do you think the output will be? What will be the placeholder for the deleted items? `undefined`? `NULL`? or something else?

On Quick skim, a common prediction for the loop would be,

```
black is a cool color
undefined is a cool color
undefined is a cool color
```

this is because, we know that callback will be called for the initial length of the array and here in this array, that's **3**.

but, deleting the array element will make that space a [hole](http://2ality.com/2015/09/holes-arrays-es6.html) and this `forEach` guy is **pretty smart and will not run the callback for the holes in the array**.

So, when the callback is executed for the first element (index = 0), it will delete the second element and the callback for the same will not be executed and the loop will be skipped to the third element. So the output will be:

```
black is a cool color
red is a cool color
[ 'black', empty, 'red' ] // empty is just the representation of holes in V8
```

### Snippet 4

So, How an empty array will be treated?

```js
let colors = new Array(3);

colors.forEach((color, index) => {
    colors[index] = 'cyan';
    console.log(`${colors[index]} is a cool color`);
});

console.log(colors);
```

Nothing changes, the empty array will be having all elements as holes. `console.log(colors)` will result in something like

```
[empty × 3]
```

So the **callback will not be executed for any of the holes** and the actual output of the entire snippet will also be:

```
[empty × 3]
```

### Snippet 5

Another less used feature in `forEach` is that it can accept a second parameter, [`thisArg`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Using_thisArg) and if that's passed, the callback will be executed with the passed context. The following snippet is just for the demo you can find a more relevant example on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Using_thisArg). I haven't used arrow function here as that will make `this` to be `undefined`.

```js
class colorHandler {
  isFavorite(color) {
    return color === 'cyan';
  }
}

let colors = ['black', 'blue', 'red', 'cyan'];

colors.forEach(function(color, index) {
    console.log(this.isFavorite(color))
}, new colorHandler());
```

the output will be:

```
false
false
false
true
```

### So...

Hope this was fun. That's all for our little guy. There might be a lot of other fun stuff about `forEach`. Kindly share it in the comments to surprise us. Let's see in some time with another array method/property in **Fun With Arrays** series.

And a fun fact: This title was inspired from the awesome (😉) show hosted by Sheldon and Amy in **The Big Bang Theory** series, named, **Fun With Flags.**

<br />

<Image src="/assets/images/bbt-fwf.jpg">


