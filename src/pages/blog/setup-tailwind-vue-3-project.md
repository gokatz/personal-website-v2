---
title: "Setup Tailwind@next in Vue CLI 3 project"
date: "2019-05-07T10:00:00.169Z"
template: "post"
draft: false
slug: "/blog/setup-tailwind-vue-3-project/"
category: "Toolkit"
tags:
  - "tailwind"
  - "vue"
  - "css"
  - "Tailwind Toolkit"
description: "Learn how to setup tailwind css in a Vue CLI 3 project."
layout: ../../layouts/BlogPost.astro
---

Setting up Tailwind is really an easier process consist of few simple steps. But, developers who are new to Webpack or common CSS configuration like PostCSS (like me) might feel it difficult to join all the parts. This post will help to set up and run tailwind with basic configuration in a Vue CLI 3 project.

## Create a new Project
Create a new Vue project using Vue CLI 3 using any of your presets.

```bash
vue create my-app
```

## Install Tailwind (@next)

```bash
# Using npm
npm install tailwindcss@next --save-dev

# Using Yarn
yarn add tailwindcss@next --dev
```

## Load all the Tailwind defaults
Load tailwind defaults in a `.css` file. Create a new `css` file (say, `src/assets/css/tailwind.css`) and load the defaults

```css
/* tailwind.css */

@tailwind preflight;
@tailwind components;
@tailwind utilities;
```

Import this `css` file inside `main.js` entry file.

```js
// main.js

// other imports
import '@/assets/css/tailwind.css'
```

## Configure PostCSS
Configur PostCSS to use tailwind styles

```js
// postcss.config.js

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
```

Now restart the vue server and start working with Tailwind 🎉 
Watch this series for more Tailwind and Vue related tips 😉