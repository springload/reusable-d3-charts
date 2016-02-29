#!/usr/bin/env bash
#
# Test script for the project. To be ran on each build within a CI environment.

# Fail on first line that fails.
set -e

export TEST_DOMAIN="localhost:8000"

# To only run things on master:
# if [ "$CI_BRANCH" == "master" ];
# then
# fi

# Make sure the front-end build works.
npm run dist

# Start the server if relevant.
python -m SimpleHTTPServer &
SERVER_PID=$!

# Run cleanup before exiting.
function before_exit {
    set +e
    echo "Cleaning up before test exits"

    # Kill the server if relevant.
    kill $SERVER_PID
}

trap before_exit EXIT

# Project tests.
npm run test:unit

npm run test:integration

exit 0
