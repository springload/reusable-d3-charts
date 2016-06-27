#!/usr/bin/env bash
#
# From the project's root.
# First make sure your master is up to date.
# Then push the new changes
git checkout gh-pages
git merge master
npm run dist
git commit -am 'Release new version'
git push origin gh-pages
# And get back to master!
git checkout master
