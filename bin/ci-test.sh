#!/usr/bin/env bash
#
# Test script for the project. To be ran on each build within a CI environment.

# Fail on first line that fails.
set -e

export TEST_DOMAIN="localhost:8000/reusable-d3-charts"

# To only run things on master:
# if [ "$CI_BRANCH" == "master" ];
# then
# fi

# Make sure the front-end build works.
npm run build

# Start the server.
mv build reusable-d3-charts
python -m SimpleHTTPServer &
SERVER_PID=$!

# Run cleanup before exiting.
function before_exit {
    set +e
    echo "Cleaning up before test exits"

    mv reusable-d3-charts build

    # Kill the server if relevant.
    kill $SERVER_PID
}

trap before_exit EXIT

# Run linting
npm run lint

# Project tests.
npm run test -- --watch=no

exit 0
