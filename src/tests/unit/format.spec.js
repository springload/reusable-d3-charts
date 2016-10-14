import { humanNumber, padNumber, monthName, formatRange } from '../../utils/format';

describe('format', () => {
    describe('#humanNumber', () => {
        it('exists', () => {
            expect(humanNumber).toBeDefined();
        });

        it('number formatting makes the numbers look nicer', () => {
            expect(humanNumber(0)).toEqual('0');
            expect(humanNumber(5000)).toEqual('5,000');
            expect(humanNumber(5000000)).toEqual('5,000,000');
            expect(humanNumber(-5000)).toEqual('-5,000');
            expect(humanNumber(-5000000)).toEqual('-5,000,000');
            expect(humanNumber(5000.5000)).toEqual('5,000.5');
            expect(humanNumber(0.3333333)).toEqual('0.3333333');
        });
    });

    describe('#padNumber', () => {
        it('exists', () => {
            expect(padNumber).toBeDefined();
        });

        it('pads single-digit numbers with a zero', () => {
            expect(padNumber(0)).toEqual('00');
            expect(padNumber(9)).toEqual('09');
            expect(padNumber(-1)).toEqual('-1');
            expect(padNumber(0.3333333)).toEqual('00.3333333');
        });
    });

    describe('#monthName', () => {
        it('exists', () => {
            expect(monthName).toBeDefined();
        });

        it('converts a month number to a string, from 0 to 11', () => {
            expect(monthName(0)).toEqual('January');
            expect(monthName(11)).toEqual('December');
        });
    });

    describe('#formatRange', () => {
        it('exists', () => {
            expect(formatRange).toBeDefined();
        });

        it('converts a range to a string', () => {
            expect(formatRange([100, 200])).toEqual('100\u2013200');
        });

        it('custom separator', () => {
            expect(formatRange([100, 200], '-')).toEqual('100-200');
        });
    });
});
