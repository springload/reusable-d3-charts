'use strict';

require('mocha-generators').install();

const expect = require('chai').expect;
const night = require('./night');

describe('Charts', function() {
    before('go to page', function*() {
        yield night.goto(`http://${night.TEST_DOMAIN}/`);
    });

    describe('BasicLineChart', function() {
        it('exists', function*() {
            expect(yield night.exists('#basic-line-chart-wrapper')).to.equal(true);
        });

        it('has x axis', function*() {
            expect(yield night.exists('#basic-line-chart-wrapper .x.axis')).to.equal(true);
        });

        it('has y axis', function*() {
            expect(yield night.exists('#basic-line-chart-wrapper .y.axis')).to.equal(true);
        });

        it('has axis ticks', function*() {
            expect(yield night.exists('#basic-line-chart-wrapper .axis .tick')).to.equal(true);
        });

        it('has lines', function*() {
            expect(yield night.exists('#basic-line-chart-wrapper .line')).to.equal(true);
        });

        it('line has a rendered path', function*() {
            const path = yield night.evaluate(() => {
                return document.querySelector('#basic-line-chart-wrapper .line').getAttribute('d');
            });

            expect(path.length).to.be.above(50);
        });
    });
});
