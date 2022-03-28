---
title: "Automate your chrome extension deployment in minutes!"
date: "2018-05-27T22:40:32.169Z"
template: "post"
draft: false
slug: "/blog/automate-your-chrome-extension-deployment-in-minutes/"
category: "Automation"
tags:
  - "extension"
  - "automation"
  - "CI/CD"
description: "Building a chrome extension is fun! But deployment is a bit tedious as it requires few manual processes. In this post, I’ll Show you how to automate the build, upload and publish process of your chrome extension in a matter of few minutes."
layout: ../../layouts/BlogPost.astro
---

Building a chrome extension is fun! But deployment is a bit tedious as it requires few manual processes. In this post, I’ll Show you how to automate the build, upload and publish process of your chrome extension in a matter of few minutes 🔥🔥

First thing first, thanks to the authors of the following NPM packages which I will be using to automate things.

- [chrome-webstore-upload](https://www.npmjs.com/package/chrome-webstore-upload)
- [zip-folder](https://www.npmjs.com/package/zip-folder)

Let’s get started. One of the perfect places for automating the deployment process is the CI/CD pipelines. I will be demoing using the GitLab’s built-in CI environment with the help of `gitlab-ci.yml` file. The same can be applied to any CI services for Github like Travis, Circle-CI etc., 

As a chrome extension authors, you may be aware of the following release steps. 

- zipping the extension folder (make sure you bump the manifest version)
- uploading to chrome web store.
- publish the uploaded version of the extension.

I'm going to code the automating script using node. So, let's create a node file (`deploy.js`) in the root directory to invoke it from the CI environment using `gitlab-ci.yml` file.

###zipping the extension folder:

Using the [zip-folder](https://www.npmjs.com/package/zip-folder) package, zipping will be only a command away! 

```js
const zipFolder = require('zip-folder');
let folderName = 'path/to/folder'; 
// I too hate placeholders! will be attaching a sample file at the end of this writeup
let zipName = '/path/to/archive.zip';

zipFolder(folderName, zipName, function(err) {
    if(err) {
        console.log('oh no! ', err);
    } else {
        console.log(`Successfully zipped the ${folderName} directory and store as ${zipName}`);
        // will be invoking upload process 
    }
});
```
Woohoo! You Done zipping your extension 🤟🏻Add this to your `deploy.js` file.

###uploading to chrome web store:

Here comes the another package, [chrome-webstore-upload](https://github.com/DrewML/chrome-webstore-upload). With the help of this package, we can upload the zipped extension to the chrome web store. 

Install the package on your extension project using the command:

```bash
yarn add chrome-webstore-upload -D
```

To upload the file to webstore, this package needs `client ID`, `client secret` and `refresh token` of your extension project. If you are not familiar with those terminologies, don't worry. To use the webstore APIs, Google needs some identifiers and credentials to authorize you and identify your extension. 

To get all the three credentials, follow the instruction mentioned [here](https://github.com/DrewML/chrome-webstore-upload/blob/master/How%20to%20generate%20Google%20API%20keys.md). The package author, [Andrew](https://twitter.com/drewml) did a great job of adding this guide. 

_[Take few moments and generate all the three ids and credentials...]_

Once you have done with getting all those ids and credentials, store those credentials in your CI environment variable (GitLab) or other CI services' environment variable, like Travis' [env variable](https://docs.travis-ci.com/user/environment-variables/) or circle-ci [env variable](https://circleci.com/docs/2.0/env-vars/) or anything of your choice. ⚠️ Refrain from checking-in these variables into your codebase as these are your API credentials (like your password!)

Now, we can now start to upload the zip file to webstore upload package. This step has to be invoked on the success of the zipping process.

To use the webstore API, seed them with the created credentials. After seeding the credentials, create a file stream of the zipped extension that needs to be uploaded. Then, call the upload API (`uploadExisting`) using the created stream.

```js
// getting all the credentials and IDs from `gitlab-ci.yml` file
let REFRESH_TOKEN = process.env.REFRESH_TOKEN; 
let EXTENSION_ID = process.env.EXTENSION_ID;
let CLIENT_SECRET = process.env.CLIENT_SECRET;
let CLIENT_ID = process.env.CLIENT_ID;

const webStore = require('chrome-webstore-upload')({
  extensionId: EXTENSION_ID,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  refreshToken: REFRESH_TOKEN
});

function upload() {
  const extesnionSource = fs.createReadStream(zipName);
  webStore.uploadExisting(extesnionSource).then(res => {
    console.log('Successfully uploaded the ZIP');    

    // call publish API on success
  }).catch((error) => {
    console.log(`Error while uploading ZIP: ${error}`);
    process.exit(1);
  });
}

```

The `process.env` thing is a way to pass the variable from `gitlab-ci.yml` file to the node process. Will be showing how it works later in this post.

The above method will upload the mentioned zip to the web store as a draft. You can check out the draft at your [developer console](https://chrome.google.com/webstore/developer/dashboard). Again, make sure you **bump the manifest version**. Otherwise, the API will fail to upload the zip!

Once we successfully uploaded the zip to webstore, we can publish it using the webstore package's `publish` API:

Like the upload API, we can invoke the publish API the same way. Make sure you call this API on the success of upload command.

```js
    
publish() {
  // publish the uploaded zip
  webStore.publish().then(res => {
    console.log('Successfully published the newer version');
  }).catch((error) => {
    console.log(`Error while publishing uploaded extension: ${error}`);
    process.exit(1);
  });
}

```

You know something? you have done automating the extension deployment process 😍Let's put together all the snippets to give birth to the node process file - `deploy.js`

As I promised, sample `deploy.js` file is as follow! Keep it as a reference. Get your hands dirty with code 💻

{% gist https://gist.github.com/gokatz/b99c36c74a0b0f219f3c3e4096e7d26d %}

####hi-fi 🙏 

Now it’s time to invoke those script from the `gitlab-ci.yml` file. This is a sample ci file I'm using (to be invoked in GitLab CI environment)

```yml
image: node:6.10.3

before_script:
  - yarn

stages:
  - deployExtension

deployExtension:
  stage: deployExtension
  only:
    - master #to be invoked only on master merge
  script:
    - yarn build
    - CLIENT_ID=${CLIENT_ID} CLIENT_SECRET=${CLIENT_SECRET} EXTENSION_ID=${EXTENSION_ID} REFRESH_TOKEN=${REFRESH_TOKEN} node ./deploy.js
```

the credentials (`${CLIENT_ID}`, `${CLIENT_SECRET}`, `${EXTENSION_ID}`, `${REFRESH_TOKEN}`) will be pulled from the environemnt variable (in case of GitLab) and passed to the `deploy.js` file (present in the root directory) as environment variable. Those varables can be accessed using `process.env` (say, to retrieve CLIENT_ID in node process, use `process.env.CLIENT_ID`)

PS: 
* You can completely automate this without using a separate node file (`deploy.js`) with the help of `gitlab-ci.yml` file alone (using [`chrome-webstore-upload-cli`](https://github.com/DrewML/chrome-webstore-upload-cli)). But for our convenience and for better error handling, we can go with a separate node file 😉
* Consider using [chalk](https://www.npmjs.com/package/chalk) package to sprinkle some color to the CI/CD logs 🎨

---

You got a bonus video tutorial 🤩
[Joe](https://twitter.com/jsjoeio) has done an awesome job taking you to a video tour of this entire process.

https://www.youtube.com/watch?v=fH0jmBa-HhM

---

I personally love building extensions. But definitely not a PRO! Reach me out if you have any queries with getting started. The package, [baby-chrome](https://www.npmjs.com/package/baby-chrome) should help you scaffolding a chrome extension and help get up and running in minutes.

https://twitter.com/practicingdev/status/973616317386428418