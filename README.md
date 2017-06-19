# REACTIZER

https://img.shields.io/badge/status-not%20maintained-red.svg
Please note that this project, while it served its purpose well, is no longer maintained - too many changes would need to be made for it to be effective, for which I currently don't have time. :( Thank you for understanding.
___

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
* Immutable data
* Full-out Webpack: hot-reloading, tree-shaking

# Tech stack

* [React](https://github.com/facebook/react) and [React Native](https://github.com/facebook/react-native) as the core libs
* [React Router](https://github.com/reactjs/react-router) for web routing
* [Redux](https://github.com/reactjs/redux) with [React Redux](https://github.com/reactjs/react-redux) data flow
* [Reselect](https://github.com/reactjs/reselect) derives the data
* [Redux Observable](https://github.com/redux-observable/redux-observable) for async flow
* [Redux Form Lite](https://github.com/oreqizer/redux-form-lite) makes forms uber-easy
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

React Native requires (due to it's Babel 5 dependency) `babel-core` and `babel-cli` to be placed in dependencies, instead of dev dependencies.

Having problems? Try running `watchman watch-del-all`

### Tasks

Simply `npm i`. Then you have these following tasks available:

**CORE**

Web:
* `npm start` - starts HMR and server (default at *:8080*)
* `npm run server` - runs the server
* `npm run bundle` - prepares all assets and builds the client and server code

Native:
* `npm run ios` - runs react native ios
* `npm run android` - runs react native android
* `npm run native` - runs react native server
* `npm run native:clean` - runs react native server and clears the cache

Common:
* `npm test` - runs tests
* `npm run lint` - runs eslint

**OTHER**

* `npm run messages` - fetch all messages
* `npm run lint:fix` - runs eslint and fixes problems, if it can
* `npm run test:coverage` - runs tests and generates coverage info
* `npm run test:watch` - runs tests in watch mode

### TODO:

* Koa2 (once Node supports `async await`)
