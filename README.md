# Reactizer

A React boilerplate that's always ahead!

[![Build Status](https://travis-ci.org/oreqizer/reactizer.svg?branch=develop)](https://travis-ci.org/oreqizer/reactizer)

## WORK IN PROGRESS

I change stuff. A lot. I move folders, files, change dependencies etc. Please keep that in mind. This is a very fresh project and frequent changes are inevitable. Keep calm - this is all temporary.

**Features:**

* React and React Native
* Redux with router, selectors and Sagas
* Server-side rendering (Universal Javascript)
* Complete ES6 with some ES7 goodies
* Hot-reloading

If you find anything outdated, feel free to submit a pull request with an update.

### TODO:

* Koa2

### Tasks

Simply `npm i` and `npm i gulp -g`. Then you have these following tasks available:

**CORE**

Web:
* `gulp start` - starts HMR and server (default at *:8080*)
* `gulp server` - runs the server (note: no static asset in production mode)
* `gulp build` - builds all assets and sources
* `gulp verify` - runs all tests and eslint

Native:
* `gulp ios` - runs react native ios
* `gulp android` - runs react native android

**OTHER**

* `gulp native` - runs react native server
* `gulp native:clean` - runs react native server and clears the cache
* `gulp lint` - runs eslint
* `gulp lint:tests` - runs eslint and fixes problems, if it can
* `gulp lint:fix` - runs eslint and fixes problems, if it can
* `gulp test` - runs tests
* `gulp test:watch` - runs tests in watch mode
* `gulp messages` - collects `react-intl`'s default messages
* `gulp assets` - cleans up, makes sprites and moves files
* `gulp locales:default` - copies `_default.json` to `en.json` to test real messages
* `gulp sprites` - makes sprites - keep those in `src/browser/assets/sprites`
* `gulp clean` - cleans distribution directory based on config
* `gulp clean:all` - cleans all distribution directories

### Philosophy

Testing out newest trends that I find interesting. I try to keep the project lightweight and safe, though. I will not include packages that are unnecessary or unmaintained.

Compilation is done by **Webpack**, however I tried to keep it as barebones as possible - no special Webpack stuff scattered in the source files. Thus I omitted any importing of any other files other than `.js` and `.jsx` to the main bundle or anything that would make me having to stick to Webpack forever and ever.

The only thing I couldn't pass on was hot-reloading, though. That is way too awesome to miss.

### WARNING:

Keep in mind that I'm using Webpack's built-in hot module reloading. There is neither `react-hot-loader`, nor `react-transform` taking place. This is because I keep all of my state in **Redux**.

If you'd like to keep your state in your application, feel free to include one of the implementations. However, keeping state in Redux has many benefits, I highly recommend this approach.
