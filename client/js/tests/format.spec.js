import { expect } from 'chai';
import { humanNumber, padNumber, monthName } from '../utils/format';

describe('format', () => {
    describe('#humanNumber', () => {
        it('exists', () => {
            expect(humanNumber).to.be.a('function');
        });

        it('number formatting makes the numbers look nicer', () => {
            expect(humanNumber(0)).to.equal('0');
            expect(humanNumber(5000)).to.equal('5,000');
            expect(humanNumber(5000000)).to.equal('5,000,000');
            expect(humanNumber(-5000)).to.equal('-5,000');
            expect(humanNumber(-5000000)).to.equal('-5,000,000');
            expect(humanNumber(5000.5000)).to.equal('5,000.5');
            expect(humanNumber(0.3333333)).to.equal('0.3333333');
        });
    });

    describe('#padNumber', () => {
        it('exists', () => {
            expect(padNumber).to.be.a('function');
        });

        it('pads single-digit numbers with a zero', () => {
            expect(padNumber(0)).to.equal('00');
            expect(padNumber(9)).to.equal('09');
            expect(padNumber(-1)).to.equal('-1');
            expect(padNumber(0.3333333)).to.equal('00.3333333');
        });
    });

    describe('#monthName', () => {
        it('exists', () => {
            expect(monthName).to.be.a('function');
        });

        it('converts a month number to a string, from 0 to 11', () => {
            expect(monthName(0)).to.equal('January');
            expect(monthName(11)).to.equal('December');
        });
    });
});
