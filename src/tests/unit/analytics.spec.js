import sinon from 'sinon';
import { initErrorTracking, errors } from '../../api/analytics';

const gaSpy = sinon.spy();
global.ga = gaSpy;

describe('analytics', () => {
    describe('#initErrorTracking', () => {
        it('set onerror, and initialise', () => {
            global.onerror = sinon.spy();

            initErrorTracking();
        });

        it('exists', () => {
            expect(initErrorTracking).toBeDefined();
        });

        it('captures errors with onerror', () => {
            global.onerror('Test', 'script.js', 5, 5);
            expect(gaSpy.calledOnce).toEqual(true);
        });

        it('contains error message', () => {
            global.onerror('Test', 'script.js', 5, 5);
            expect(gaSpy.calledWith('send', 'exception', { exDescription: 'script.js: Test (5:5)', exFatal: false })).toEqual(true);
        });
    });

    describe('errors', () => {
        it('exists', () => {
            expect(errors).toBeDefined();
        });

        describe('#ajax', () => {
            it('exists', () => {
                expect(errors.ajax).toBeDefined();
            });

            it('captures AJAX errors', () => {
                errors.ajax(400, '/api/v1/bananas');
                expect(gaSpy.calledWith('send', 'exception', { exDescription: 'AJAX error: 400 /api/v1/bananas', exFatal: false })).toEqual(true);
            });
        });
    });
});
