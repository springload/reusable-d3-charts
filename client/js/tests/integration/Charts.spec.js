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

    describe('TimeFilter', function() {
        let initialFrom;
        let initialTo;
        let initialPath;

        before('wait for chart to appear', function*() {
            initialFrom = yield night.value('.app > .grid:nth-of-type(1) [name="from"]');
            initialTo = yield night.value('.app > .grid:nth-of-type(1) [name="to"]');

            initialPath = yield night.evaluate(() => {
                return document.querySelector('.app > .grid:nth-of-type(1) .chart .line').getAttribute('d');
            });
        });

        it('exists', function*() {
            expect(yield night.exists('.app > .grid:nth-of-type(1) [name="from"]')).to.equal(true);
            expect(yield night.exists('.app > .grid:nth-of-type(1) [name="to"]')).to.equal(true);
        });

        it('change "from"', function*() {
            const lineBefore = yield night.evaluate(() => {
                return document.querySelector('.app > .grid:nth-of-type(1) .chart .line').getAttribute('d');
            });

            yield night
                .select('.app > .grid:nth-of-type(1) [name="from"]', '2005')
                .wait(1000);

            expect(yield night.value('.app > .grid:nth-of-type(1) [name="from"]')).to.equal('2005');

            const lineAfter = yield night.evaluate(() => {
                return document.querySelector('.app > .grid:nth-of-type(1) .chart .line').getAttribute('d');
            });

            expect(lineBefore).to.not.equal(lineAfter);
        });

        it('change "to"', function*() {
            const lineBefore = yield night.evaluate(() => {
                return document.querySelector('.app > .grid:nth-of-type(1) .chart .line').getAttribute('d');
            });

            yield night
                .select('.app > .grid:nth-of-type(1) [name="to"]', '2009')
                .wait(1000);

            expect(yield night.value('.app > .grid:nth-of-type(1) [name="to"]')).to.equal('2009');

            const lineAfter = yield night.evaluate(() => {
                return document.querySelector('.app > .grid:nth-of-type(1) .chart .line').getAttribute('d');
            });

            expect(lineBefore).to.not.equal(lineAfter);
        });

        it('reset the filter', function*() {
            const lineBefore = yield night.evaluate(() => {
                return document.querySelector('.app > .grid:nth-of-type(1) .chart .line').getAttribute('d');
            });

            yield night
                .click('.app > .grid:nth-of-type(1) .form-inline .btn--link')
                .wait(1000);

            expect(yield night.value('.app > .grid:nth-of-type(1) [name="from"]')).to.equal(initialFrom);
            expect(yield night.value('.app > .grid:nth-of-type(1) [name="to"]')).to.equal(initialTo);

            const lineAfter = yield night.evaluate(() => {
                return document.querySelector('.app > .grid:nth-of-type(1) .chart .line').getAttribute('d');
            });

            expect(lineBefore).to.not.equal(lineAfter);
            expect(lineAfter).to.equal(initialPath);
        });
    });
});
