import TimeSeries from '../../models/TimeSeries';

import { TIMESERIES_FREQUENCIES } from '../../config/timeseries';

describe('TimeSeries', () => {
    it('should return the right frequency label', () => {
        expect(new TimeSeries([], TIMESERIES_FREQUENCIES.QUARTERLY.ID).getFrequencyLabel()).toEqual('Quarterly');
        expect(new TimeSeries([], TIMESERIES_FREQUENCIES.MONTHLY.ID).getFrequencyLabel()).toEqual('Monthly');
    });
});
