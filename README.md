# Bolt

A starting point for rapid website development.

Tools used:
- Jekyll
- Gulp
- Webpack
- PostCSS
- Tailwind CSS

## Getting Started

### 1. Clone or download Bolt from Github.
```
git clone https://github.com/jmgoodman27/Bolt
```

### 2. Install Jekyll and dependencies
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

Bundler will locate the Gemfile and automatically install the correct version of dependencies when you run:

```
bundle
```

We'll be using Bundler to run our Jekyll commands. Check to see if Jekyll installed correctly by running:

```
bundle exec jekyll -v
```

You should get back version 3.5.2. If you have any issues installing, look at [Jekyll's documentation](https://jekyllrb.com/docs/installation/).

### 3. Install npm modules

Check to make sure you have Node installed: 
```
node -v
```

If you don't have Node, install it with Homebrew:

```
brew install node
```

Now let install dependencies with npm: 

```
npm install
```

## Project Structure

Folders:
- dist: output of static files to run both locally and on production
- src: contains CSS and JS before running through PostCSS and Webpack
- jekyll: all Jekyll files, layouts, posts, and includes live here

Src Files:
- src/css/tailwind.js: file to configure output for CSS
- src/css/style.css: main CSS file that uses PostCSS imports
- src/js/index.js: entry point for Webpack

## Gulp

Gulp controls the build process and utilizes commands and plugins from Jekyll, PostCSS, and Webpack. 

Running "gulp" will first run a build of the site and then start a local Jekyll server with Browsersync for live reload. CSS is generated on build through PostCSS and will auto-generate when any CSS is updated in the src/css/ folder. JS is bundled on build through Webpack and will auto-generate a new bundle when index.js entry point is updated.

When ready for deployment, simply run "gulp production" to clean the dist folder and generate a production build. This will make sure to minify code, compress images, and also remove unused CSS. 

"gulp git" will run commands to commit and push to your remote repository with a custom commit message. 

Additional PostCSS plugins can be added easily through Gulp.

## Tailwind CSS

Tailwind CSS generates utility classes and can be configured with tailwind.js. It provides base styles out of the box as well, but additional CSS can be written and imported into style.css. Documentation for Tailwind CSS can be found here: [https://tailwindcss.com/docs/what-is-tailwind/](https://tailwindcss.com/docs/what-is-tailwind/). 

## Other Features

- Webpack 4: used to build and transpile (with Babel) JS with a 0 config setup through npm scripts.
- Jekyll Sitemap: Auto generate sitemap on Jekyll build
- Parts of HTML5 Boilerplate are used in Jekyll
- Jekyll is blog ready
- humans.txt and robots.txt and both included

