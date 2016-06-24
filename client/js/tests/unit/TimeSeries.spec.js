import { expect } from 'chai';
import TimeSeries from '../../models/TimeSeries';

import { TIMESERIES_FREQUENCIES } from '../../config/timeseries';

describe('TimeSeries', () => {
    let timeSeriesQuarterly;
    let timeSeriesMonthly;

    beforeEach('set up the TimeSeries', () => {
        timeSeriesQuarterly = new TimeSeries([], TIMESERIES_FREQUENCIES.QUARTERLY.ID);
        timeSeriesMonthly = new TimeSeries([], TIMESERIES_FREQUENCIES.MONTHLY.ID);
    });

    it('should return the right frequency label', () => {
        expect(timeSeriesQuarterly.getFrequencyLabel()).to.equal('Quarterly');
        expect(timeSeriesMonthly.getFrequencyLabel()).to.equal('Monthly');
    });
});
