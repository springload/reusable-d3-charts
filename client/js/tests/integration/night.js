'use strict';

const nightmare = require('nightmare');

const TEST_DOMAIN = process.env.TEST_DOMAIN || 'localhost:3000';

console.log(`Testing ${TEST_DOMAIN}`);

// Use a custom type function that fires an event React detects.
// See http://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
nightmare.action('type', function(selector, text, done) {
    this.evaluate_now(function(selector, text) {
        const elem = document.querySelector(selector);
        elem.focus();
        elem.value = text;
        elem.blur();
        elem.dispatchEvent(new Event('input', { bubbles: true }));
    }, done, selector, text);
});

nightmare.action('text', function(selector, done) {
    this.evaluate_now(function(selector) {
        const elt = document.querySelector(selector);
        return elt ? elt.textContent : null;
    }, done, selector);
});

nightmare.action('value', function(selector, done) {
    this.evaluate_now(function(selector) {
        const elt = document.querySelector(selector);
        return elt ? elt.value : null;
    }, done, selector);
});

nightmare.action('nbElements', function(selector, done) {
    this.evaluate_now(function(selector) {
        const elt = document.querySelectorAll(selector);
        return elt ? elt.length : 0;
    }, done, selector);
});

const night = nightmare({
    show: true,
    width: 1024,
    height: 768,
    titleBarStyle: 'hidden',
});

night.on('page', (type, message, additionalMessage) => {
    console.log(type, message, additionalMessage);
});

night.on('console', (type, message, additionalMessage) => {
    console.log(type, message, additionalMessage);
});

night.TEST_DOMAIN = TEST_DOMAIN;

// Root-Level hook that runs after all tests.
after('teardown nightmare instance', function*() {
    yield night.end();
});

module.exports = night;
