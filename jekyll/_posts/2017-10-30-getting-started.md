---
layout: post
title:  Getting Started
description: Tutorial for getting started with Bolt for Mac.
date:   2017-10-30 19:57:19 -0400
tags:
- Bolt
---


##### 1. Clone or download Bolt from Github.
You can access the repository from <https://github.com/jmgoodman27/Bolt>.

##### 2. Install Jekyll and dependencies
Make sure you have Ruby installed by running:

```
ruby -v
```

If you need to install Ruby, you can use [Homebrew](https://brew.sh/):

```
brew install ruby
```

We'll be using [Bundler](http://bundler.io/) for installing all the Ruby gems we need:

```
gem install bundler
```

Once you have Bundler, it'll locate the Gemfile in Bolt and automatically install the correct version of dependencies by running:

```
bundle
```

We'll be using Bundler to run our Jekyll commands. Check to see if Jekyll install correctly by running:

```
bundle exec jekyll -v
```

You should get back version 3.5.2. If you have any issues installing, look at [Jekyll's documentation](https://jekyllrb.com/docs/installation/).

##### 3. Serve files with Jekyll

If everything installed correctly, you can start serving files:

```
bundle exec jekyll serve
```

And if you want live reload capabilities:

```
bundle exec jekyll serve --livereload
```

The easiest way to use it is with live reload's [Chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en).

The server should be up and running at http://127.0.0.1:4000/Bolt/ (output will tell you the server address).


##### 4. Install Gulp and modules (optional)

If you want to use Gulp to enhance performance, first make sure you have Node.js and NPM:

```
node -v
```

To install node if needed:

```
brew install node
```

Now you can use NPM to install everything you need (it will install what is specified in the package.json file):

```
npm install
```

To use Gulp for a production build, run the following:

```
bundle exec jekyll build
gulp build
```

##### Next Steps

Now that everything is installed and you know how to use basic commands, it's time to get to work building your static website! With Bolt, you now have a starting point so you don't have to waste any time with boilerplate stuff.
