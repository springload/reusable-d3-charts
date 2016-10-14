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

> TL;DR; D3 allows full customisability, and leverages the web standards you know and love.

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

## Contributing

### Installation

> You first need to clone the project on your computer, and to install [Node](https://nodejs.org). This project also uses [nvm](https://github.com/creationix/nvm), and [yarn](https://yarnpkg.com/).

From the command-line:

```sh
cd ~/Development/sites/
git clone git@github.com:springload/reusable-d3-charts.git
cd reusable-d3-charts
```

To install our dependencies:

```sh
nvm install
# Then, install all project dependencies.
yarn install
# Optionally, install the git hooks.
./.githooks/deploy
```

### Working on the project

> Everything mentioned in the installation process should already be done.

```sh
# Start the server and the development tools.
yarn run start
# Builds for production
yarn run build
# Rebuild the styles
yarn run css
# Runs tests.
yarn run test
# Runs linting.
yarn run lint
```

## Deploying a new version

### To production (`gh-pages`)

```sh
# From the project's root.
# Make sure your master is up to date.
git fetch --all
git checkout master
git pull
git push origin master
# Then push the new changes
npm run deploy
```
