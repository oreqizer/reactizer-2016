# React Starter

A React starter boilerplate I created as a base for my React apps.

**Features:**

* React with router
* Redux with React router, selectors and Sagas
* Server-side rendering (Universal Javascript)
* Complete ES6 with some ES7 goodies
* Hot-reloadint *(not working yet)*

Mind that this starter is quite opinionated - I primarily created it for myself, however, any suggestions and pull requests ale wholeheartly welcome.

### Philosophy

Compilation is done by **Webpack**, however I tried to keep it as barebones as possible - no special Webpack stuff scattered in the source files. Thus I omitted any importing of any other files other than `.js` and `.jsx` to the main bundle or anything that would make me having to stick to Webpack forever and ever.

The only thing I couldn't pass on was hot-reloading, though. That is way too awesome to miss.
