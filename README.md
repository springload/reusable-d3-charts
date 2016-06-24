reusable-d3-charts [![Build Status](https://travis-ci.org/springload/reusable-d3-charts.svg?branch=master)](https://travis-ci.org/springload/reusable-d3-charts)
=====================

> Reusable charts built with [D3](https://d3js.org/). [See them live](https://springload.github.io/reusable-d3-charts/).

```
    1 ++-----------****-----------+--***-------+------****--++
  0.6 *+          **+  *          +**   *         d3(x)*****++
  0.2 +*         *      *         **     **         *     **++
    0 ++*       **       *       **       *       **       *++
 -0.4 ++**     *         **     **         *      *         *+
 -0.8 ++ **   *     +      *   ** +         *  +**          +*
   -1 ++--****------+-------***---+----------****-----------++
     2000         2005          2010          2015         2020
```

## Why should I use those instead of `<high-level abstraction over D3 of the day>`?

> TL;DR; D3 allows full customisability and is built on web standards.

First of all, because you want to have the final say on what your charts look like. This is the whole point of using something like D3: we want our graphs to be art-directed, rendering differently across projects and across screen sizes.

Then, because you will have more bangs for your bucks learning and using D3's API, JavaScript, SVG and CSS rather than locking yourself into a particular charting library's configuration options. D3's bundle of web technologies will still be relevant for the years to come, whereas high-level wrappers over it come and go.

### So no [C3](http://c3js.org/)? No [NVD3](http://nvd3.org/)? No [D4](http://visible.io/) either? Not even [Victory](https://github.com/FormidableLabs/victory)?!

Those tools all bring value to the table. They make it very easy and quick to put a chart on a page with minimal effort. The reason why they exist is that **charting is hard, and D3 is hard**. You can have it easy by using those, and that's great – up to the point where you need to customize the chart further than what the library allows.

### So we should all write charts from scratch?

No, not really. D3 has a history of enabling code reuse via [examples](http://bl.ocks.org/). There are [a lot](https://github.com/mbostock/d3/wiki/Gallery) of examples out there. Look for the one you're after [here](http://bl.ocksplorer.org/), then customize it.

There are a number of conventions when writing D3 code that make it easier to reuse charts and chart code.

Here are good reads:

- https://bost.ocks.org/mike/chart/
- https://bocoup.com/weblog/reusability-with-d3
- http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/, and our accompanying https://github.com/springload/react-d3-integration

## Reusing one of the charts

**Those examples are meant to be copied and pasted into your project's code**. You can then update their rendering code so that it suits the precise need of your project.

Most of the examples are divided into two files: a base class and one that inherits from it. If you intend to use multiple charts, they will most likely share some code – this code should be in the base class.

## Chart download

The download feature is built with a thin [`api/download.js` layer](https://github.com/springload/reusable-d3-charts/blob/master/client/js/api/download.js) which relies on [`saveSvgAsPng`](https://github.com/exupero/saveSvgAsPng). Browser support is patchy, but the API layer takes care of feature-detecting / browser-detecting what works and what doesn't to display warning messages to the end user.

### Known issues

- Does not support custom web fonts
- Safari 9 / iOS 9 Safari – Image export does not have the right filename, and opens as file in separate window  (see http://caniuse.com/#feat=download)
- IE11 – PNG export does not work (hidden behind error message suggesting SVG use)
- IE11 – Image export works but does not display embedded symbols (warning is displayed to the user).
- Android browser – Image export does not work (soft fail with error message)


## Contributing

### Installation

> You first need to clone the project on your computer, and to install [Node](https://nodejs.org). This project also uses [nvm](https://github.com/creationix/nvm).

From the command-line:

```sh
cd ~/Development/sites/
git clone git@github.com:springload/reusable-d3-charts.git
cd reusable-d3-charts
```

To install our dependencies:

```sh
nvm install
npm install --global eslint eslint-plugin-react babel-eslint eslint-config-airbnb sass-lint
# Then, install all project dependencies.
npm install
# Optionally, install the git hooks.
./.githooks/deploy
```

### Working on the project

> Everything mentioned in the installation process should already be done.

```sh
# Start the server and the development tools.
npm run start
# Builds frontend assets.
npm run build
# Runs linting.
npm run lint
# Runs tests.
npm run test
```

### Tests

We use `mocha`, `chai`, `sinon` and `isparata` for unit tests.

```sh
# Run all the tests.
npm run test
# Run unit tests.
npm run test:unit
# Run unit tests in a watcher.
npm run test:unit:watch
# Run your tests and outputs code coverage.
npm run test:unit:coverage
# And then to see the coverage:
open coverage/lcov-report/index.html
```

## Deploying a new version

### To production (`gh-pages`)

```sh
# From the project's root.
# First make sure your master is up to date.
git fetch --all
git checkout master
git pull
git push origin master
# Then push the new changes
git checkout gh-pages
git merge master
npm run dist
git add .
git commit -m 'Release new version'
git push origin gh-pages
# And get back to master!
git checkout master
```
