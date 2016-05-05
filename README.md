# Reactizer

A React boilerplate that's always ahead!

**Features:**

* React and React Native
* Redux with router, selectors and Sagas
* Server-side rendering (Universal Javascript)
* Complete ES6 with some ES7 goodies
* Hot-reloading

If you find anything outdated, feel free to submit a pull request with an update.

### TODO:

* Tests
* I18n
* Koa2

### Tasks

Simply `npm i`. Then you have these following tasks available:

* `npm start` - run when you want to develop
* `npm run build` - builds assets for production
* `npm run build:beta` - bu ilds assets for beta
* `npm run server` - runs the server for production (note: no static asset serving)
* `npm run server:beta` - runs the server for beta
* `npm run lint` - runs eslint
* `npm run lint:fix` - runs eslint and fixes problems, if it can
* `npm run native` - runs react native

### Philosophy

Testing out newest trends that I find interesting. I try to keep the project lightweight and safe, though. I will not include packages that are unnecessary or unmaintained.

Compilation is done by **Webpack**, however I tried to keep it as barebones as possible - no special Webpack stuff scattered in the source files. Thus I omitted any importing of any other files other than `.js` and `.jsx` to the main bundle or anything that would make me having to stick to Webpack forever and ever.

The only thing I couldn't pass on was hot-reloading, though. That is way too awesome to miss.

### WARNING:

Keep in mind that I'm using Webpack's built-in hot module reloading. There is neither `react-hot-loader`, nor `react-transform` taking place. This is because I keep all of my state in **Redux**.

If you'd like to keep your state in your application, feel free to include one of the implementations. However, keeping state in Redux has many benefits, I highly recommend this approach.
