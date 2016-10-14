const night = require('./night');

describe('Charts', () => {
    it('exists', async () => {
        const url = await night.goto(`http://${night.TEST_DOMAIN}/`).url();

        expect(url).toContain('/');
    });

    describe('BasicLineChart', () => {
        it('exists', async () => {
            expect(await night.exists('#basic-line-chart-wrapper')).toEqual(true);
        });

        it('has x axis', async () => {
            expect(await night.exists('#basic-line-chart-wrapper .x.axis')).toEqual(true);
        });

        it('has y axis', async () => {
            expect(await night.exists('#basic-line-chart-wrapper .y.axis')).toEqual(true);
        });

        it('has axis ticks', async () => {
            expect(await night.exists('#basic-line-chart-wrapper .axis .tick')).toEqual(true);
        });

        it('has lines', async () => {
            expect(await night.exists('#basic-line-chart-wrapper .line')).toEqual(true);
        });

        it('line has a rendered path', async () => {
            const path = await night.evaluate(() => document.querySelector('#basic-line-chart-wrapper .line').getAttribute('d'));

            expect(path.length).toBeGreaterThan(50);
        });
    });

    describe('TimeFilter', () => {
        it('exists', async () => {
            expect(await night.exists('.app > .grid:nth-of-type(1) [name="from"]')).toEqual(true);
            expect(await night.exists('.app > .grid:nth-of-type(1) [name="to"]')).toEqual(true);
        });

        it('change "from"', async () => {
            const lineBefore = await night.evaluate(() => document.querySelector('.app > .grid:nth-of-type(1) .chart .line').getAttribute('d'));

            await night
                .select('.app > .grid:nth-of-type(1) [name="from"]', '2005')
                .wait(1000);

            expect(await night.value('.app > .grid:nth-of-type(1) [name="from"]')).toEqual('2005');

            const lineAfter = await night.evaluate(() => document.querySelector('.app > .grid:nth-of-type(1) .chart .line').getAttribute('d'));

            expect(lineBefore).not.toEqual(lineAfter);
        });

        it('change "to"', async () => {
            const lineBefore = await night.evaluate(() => document.querySelector('.app > .grid:nth-of-type(1) .chart .line').getAttribute('d'));

            await night
                .select('.app > .grid:nth-of-type(1) [name="to"]', '2009')
                .wait(1000);

            expect(await night.value('.app > .grid:nth-of-type(1) [name="to"]')).toEqual('2009');

            const lineAfter = await night.evaluate(() => document.querySelector('.app > .grid:nth-of-type(1) .chart .line').getAttribute('d'));

            expect(lineBefore).not.toEqual(lineAfter);
        });

        it('reset the filter', async () => {
            const lineBefore = await night.evaluate(() => document.querySelector('.app > .grid:nth-of-type(1) .chart .line').getAttribute('d'));

            await night
                .click('.app > .grid:nth-of-type(1) .form-inline .btn--link')
                .wait(1000);

            const lineAfter = await night.evaluate(() => document.querySelector('.app > .grid:nth-of-type(1) .chart .line').getAttribute('d'));

            expect(lineBefore).not.toEqual(lineAfter);
        });
    });
});
