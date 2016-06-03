# REACTIZER

A React boilerplate that's always ahead! To check out the backend of the demo, click [here](https://github.com/oreqizer/reactizer-api).

[![Build Status](https://travis-ci.org/oreqizer/reactizer.svg?branch=develop)](https://travis-ci.org/oreqizer/reactizer)
[![Code Climate](https://codeclimate.com/github/oreqizer/reactizer/badges/gpa.svg)](https://codeclimate.com/github/oreqizer/reactizer)
[![Dependency Status](https://david-dm.org/oreqizer/reactizer.svg)](https://david-dm.org/oreqizer/reactizer)
[![devDependency Status](https://david-dm.org/oreqizer/reactizer/dev-status.svg)](https://david-dm.org/oreqizer/reactizer#info=devDependencies)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/oreqizer/reactizer/develop/LICENSE)

> This boilerplate has one thing in mind - use as few dependencies as possible, while having all the best features. If something is not absolutely necessary, you won't find it here.
>
> **Reactizer**'s goal is mainly to provide you with the best practices of building a modern **React** application. Feel free to open an issue or a pull request!
>
> All the tech I chose is super new, sometimes even in an *alpha* version - thus if you'd like to use it for production, I recommend scaling those unstable versions down.

### Tech stack

* [React](https://github.com/facebook/react) and [React Native](https://github.com/facebook/react-native) as the core libs
* [React Router](https://github.com/reactjs/react-router) for web routing
* [Redux](https://github.com/reactjs/redux) with [React Redux](https://github.com/reactjs/react-redux) data flow
* [Reselect](https://github.com/reactjs/reselect) derives the data
* [Redux Saga](https://github.com/yelouafi/redux-saga) for async flow
* [Redux Form](https://github.com/erikras/redux-form) makes forms uber-easy
* [React Intl](https://github.com/yahoo/react-intl) i18n
* [Jest](https://github.com/facebook/jest) testing
* [Babel](https://github.com/babel/babel) for all the ES6+ goodness
* [Material UI](https://github.com/callemall/material-ui) makes the web sexy
* [Webpack 2](https://github.com/webpack/webpack) client compilation + Hot Reloading
* [ESlint](https://github.com/eslint/eslint) and Airbnb level code quality
* [Gulp](https://github.com/gulpjs/gulp) tasks, because `npm` just doesn't scale

**Also in the bundle:**

* Sprites with `gulp.spritesmith`
* Translation message collection with `babel-plugin-react-intl`
* Server compilation with Babel, because that's the way it's [supposed to be](https://medium.com/@Cuadraman/how-to-use-babel-for-production-5b95e7323c2f#.qer1pvtrg)

### Known issues:

Please note that this project is **very** young. There are still incomplete things, and this README is just a quickfix. I have a lot of work + school, but I will try to improve everything on the go!

React Native requires (due to it's Babel 5 dependency) `babel-core` and `babel-cli` to be placed in dependencies, instead of dev dependencies.

Having problems? Try running `watchman watch-del-all`

### Tasks

Simply `npm i` and `npm i gulp -g`. Then you have these following tasks available:

**CORE**

Web:
* `gulp` - runs `gulp start`
* `gulp start` - starts HMR and server (default at *:8080*)
* `gulp server` - builds and runs the server (note: no static asset in production mode)
* `gulp build` - builds all web assets and sources
* `gulp test` - runs tests
* `gulp lint` - runs eslint

Native:
* `gulp ios` - runs react native ios
* `gulp android` - runs react native android
* `gulp native` - runs react native server
* `gulp native:clean` - runs react native server and clears the cache

**OTHER**

* `gulp build:client` - builds client-related web stuff
* `gulp build:server` - builds server-related web stuff
* `gulp lint:fix` - runs eslint and fixes problems, if it can
* `gulp test:watch` - runs tests in watch mode
* `gulp messages` - collects `react-intl`'s default messages
* `gulp assets` - cleans up, makes sprites and moves files
* `gulp locales:default` - copies `_default.json` to `en.json` to test real messages
* `gulp sprites` - makes sprites - keep those in `src/browser/assets/sprites`
* `gulp clean` - cleans distribution directory based on config
* `gulp clean:all` - cleans all distribution directories

There are also `npm` alternatives of **core** tasks, in case you don't fancy a global `gulp` install:

* `npm start` - `gulp`
* `npm test` - `gulp test`
* `npm run lint` - `gulp lint`
* `npm run server` - `gulp server`
* `npm run build` - `gulp build`
* `npm run ios` - `gulp ios`
* `npm run android` - `gulp android`
* `npm run native` - `gulp native`
* `npm run native:clean` - `gulp native:clean`

### Philosophy

Testing out newest trends that I find interesting. I try to keep the project lightweight and safe, though. I will not include packages that are unnecessary or unmaintained.

Compilation is done by **Webpack**, however I tried to keep it as barebones as possible - no special Webpack stuff scattered in the source files. Thus I omitted any importing of any other files other than `.js` and `.jsx` to the main bundle or anything that would make me having to stick to Webpack forever and ever.

The only thing I couldn't pass on was hot-reloading, though. That is way too awesome to miss. Keep in mind that I'm using Webpack's built-in hot module reloading. There is neither `react-hot-loader`, nor `react-transform` taking place. This is because I keep all of my state in **Redux**.

If you'd like to keep your state in your application, feel free to include one of the implementations. However, keeping state in Redux has many benefits, I highly recommend this approach.

### TODO:

* Koa2 (once Node supports `async await`)
