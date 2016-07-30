# REACTIZER

A React boilerplate that's always ahead! Click [here](http://reactizer.herokuapp.com/) to check out the live demo.

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

To check out the backend, click [here](https://github.com/oreqizer/reactizer-api)!

# Features:

The features currently present in the demo are as follows:

* Server-side rendering, data fetching and *i18n* 
* Persistent, real-world example - your registration and TODOs are saved on my [heroku app](https://reactizer.herokuapp.com). Mind: it's just a demo. I recommend making up some arbitary username/email/password. I use `test`, with password `Testtest1`.
* Truly *universal* architecture - shared Redux code in mobile, browser and server
* Protected routes with *JWT authentication*
* Immutable data with Ramda functions
* Full-out Webpack: hot-reloading, tree-shaking (bundle splitting example coming in the future)

### COMING NEXT:

**Documentation**. I will document all the stuff present in the demo, from server side rendering + auth, different auth options, obstacles I had to overcome and design decisions I made.

**Full mobile app**. I want to supply you guys with a full-blown React Native app as a reference for anyone starting with native mobile development. Everything currently working in the web demo will work in the native app.

**More examples**. Serverless, Firebase, bundle splitting, Mobx (later on). I will move this working demo to `examples` folder, clean the top level app out so you don't have to do it yourself when forking, and finally include the other demos with all current features.

**Full test coverage**. Tests are good for you (and especially for your team). I will include tests to cover everything from reducers, to sagas.

# Tech stack

* [React](https://github.com/facebook/react) and [React Native](https://github.com/facebook/react-native) as the core libs
* [React Router](https://github.com/reactjs/react-router) for web routing
* [Redux](https://github.com/reactjs/redux) with [React Redux](https://github.com/reactjs/react-redux) data flow
* [Reselect](https://github.com/reactjs/reselect) derives the data
* [Redux Saga](https://github.com/yelouafi/redux-saga) for async flow
* [Redux Form](https://github.com/erikras/redux-form) makes forms uber-easy
* [React Intl](https://github.com/yahoo/react-intl) i18n
* [Immutable](https://github.com/facebook/immutable-js) data
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
* No `react-hot-loader`, `react-transform` nor `webpack-isomorphic-tools` - I keep HMR and Webpack vanilla

### Known issues:

Please note that this project is **very** young. There are still incomplete things, and this README is just a quickfix. I have a lot of work + school, but I will try to improve everything on the go!

React Native requires (due to it's Babel 5 dependency) `babel-core` and `babel-cli` to be placed in dependencies, instead of dev dependencies.

Having problems? Try running `watchman watch-del-all`

### Tasks

Simply `npm i` and `npm i gulp -g`. Then you have these following tasks available:

**CORE**

Web:
* `gulp` - starts HMR and server (default at *:8080*)
* `gulp run` - bundles the app and runs the server 
* `gulp server` - runs the server
* `gulp bundle` - prepares all assets and builds the client and server code

Native:
* `gulp ios` - runs react native ios
* `gulp android` - runs react native android
* `gulp native` - runs react native server
* `gulp nativeClean` - runs react native server and clears the cache

Common:
* `gulp test` - runs tests
* `gulp lint` - runs eslint

**OTHER**

* `gulp build` - builds the client and server code
* `gulp assets` - prepares all assets
* `gulp lintFix` - runs eslint and fixes problems, if it can
* `gulp testCoverage` - runs tests and generates coverage info
* `gulp testWatch` - runs tests in watch mode
* `gulp clean` - cleans tmp and dist directories

There are also `npm` alternatives of **core** tasks, in case you don't fancy a global `gulp` install:

* `npm start` - `gulp`
* `npm test` - `gulp test`
* `npm run lint` - `gulp lint`
* `npm run messages` - `gulp messages`
* `npm run run` - `gulp run`
* `npm run server` - `gulp server`
* `npm run bundle` - `gulp bundle`
* `npm run ios` - `gulp ios`
* `npm run android` - `gulp android`
* `npm run native` - `gulp native`
* `npm run native:clean` - `gulp nativeClean`

### TODO:

* Koa2 (once Node supports `async await`)
