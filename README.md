reusable-d3-charts
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

## Why should I use those instead of <high-level abstraction over D3 of the day>?

TODO

## Reusing one of the charts

TODO

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
