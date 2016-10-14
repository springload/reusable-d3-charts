import TimeSeries from './models/TimeSeries';

import { TIMESERIES_FREQUENCIES } from './config/timeseries';

export default [
    {
        id: '1',
        label: 'Monthly Airline Passenger Numbers 1949-1960',
        timeSeries: new TimeSeries([{ value: 108, date: new Date('2001') }, { value: 89, date: new Date('2002') }, { value: 86, date: new Date('2003') }, { value: 56, date: new Date('2004') }, { value: 114, date: new Date('2005') }, { value: 60, date: new Date('2006') }, { value: 8, date: new Date('2007') }, { value: 121, date: new Date('2008') }, { value: 50, date: new Date('2009') }, { value: 131, date: new Date('2010') }, { value: 65, date: new Date('2011') }, { value: 91, date: new Date('2012') }, { value: 66, date: new Date('2013') }, { value: 83, date: new Date('2014') }, { value: 117, date: new Date('2015') }], TIMESERIES_FREQUENCIES.ANNUAL),
    },
    {
        id: '2',
        label: 'Sales Data with Leading Indicator',
        timeSeries: new TimeSeries([{ value: 59, date: new Date('2001') }, { value: 84, date: new Date('2002') }, { value: 31, date: new Date('2003') }, { value: 64, date: new Date('2004') }, { value: 68, date: new Date('2005') }, { value: 127, date: new Date('2006') }, { value: 121, date: new Date('2007') }, { value: 52, date: new Date('2008') }, { value: 105, date: new Date('2009') }, { value: 103, date: new Date('2010') }, { value: 60, date: new Date('2011') }, { value: 7, date: new Date('2012') }, { value: 106, date: new Date('2013') }, { value: 68, date: new Date('2014') }, { value: 75, date: new Date('2015') }], TIMESERIES_FREQUENCIES.ANNUAL),
    },
    {
        id: '3',
        label: 'Biochemical Oxygen Demand',
        timeSeries: new TimeSeries([{ value: 71, date: new Date('2001') }, { value: 36, date: new Date('2002') }, { value: 91, date: new Date('2003') }, { value: 61, date: new Date('2004') }, { value: 40, date: new Date('2005') }, { value: 100, date: new Date('2006') }, { value: 16, date: new Date('2007') }, { value: 101, date: new Date('2008') }, { value: 66, date: new Date('2009') }, { value: 83, date: new Date('2010') }, { value: 117, date: new Date('2011') }, { value: 1, date: new Date('2012') }, { value: 18, date: new Date('2013') }, { value: 66, date: new Date('2014') }, { value: 87, date: new Date('2015') }], TIMESERIES_FREQUENCIES.ANNUAL),
    },
    {
        id: '4',
        label: 'Determination of Formaldehyde',
        timeSeries: new TimeSeries([{ value: 58, date: new Date('2001') }, { value: 122, date: new Date('2002') }, { value: 113, date: new Date('2003') }, { value: 53, date: new Date('2004') }, { value: 51, date: new Date('2005') }, { value: 16, date: new Date('2006') }, { value: 103, date: new Date('2007') }, { value: 65, date: new Date('2008') }, { value: 56, date: new Date('2009') }, { value: 42, date: new Date('2010') }, { value: 126, date: new Date('2011') }, { value: 75, date: new Date('2012') }, { value: 99, date: new Date('2013') }, { value: 54, date: new Date('2014') }, { value: 118, date: new Date('2015') }], TIMESERIES_FREQUENCIES.ANNUAL),
    },
    {
        id: '5',
        label: 'Hair and Eye Color of Statistics Students',
        timeSeries: new TimeSeries([{ value: 43, date: new Date('2001') }, { value: 128, date: new Date('2002') }, { value: 131, date: new Date('2003') }, { value: 114, date: new Date('2004') }, { value: 50, date: new Date('2005') }, { value: 131, date: new Date('2006') }, { value: 65, date: new Date('2007') }, { value: 91, date: new Date('2008') }, { value: 74, date: new Date('2009') }, { value: 130, date: new Date('2010') }, { value: 76, date: new Date('2011') }, { value: 10, date: new Date('2012') }, { value: 112, date: new Date('2013') }, { value: 70, date: new Date('2014') }, { value: 27, date: new Date('2015') }], TIMESERIES_FREQUENCIES.ANNUAL),
    },
    {
        id: '6',
        label: 'Effectiveness of Insect Sprays',
        timeSeries: new TimeSeries([{ value: 20, date: new Date('2001') }, { value: 76, date: new Date('2002') }, { value: 68, date: new Date('2003') }, { value: 127, date: new Date('2004') }, { value: 13, date: new Date('2005') }, { value: 49, date: new Date('2006') }, { value: 52, date: new Date('2007') }, { value: 126, date: new Date('2008') }, { value: 125, date: new Date('2009') }, { value: 105, date: new Date('2010') }, { value: 96, date: new Date('2011') }, { value: 37, date: new Date('2012') }, { value: 83, date: new Date('2013') }, { value: 38, date: new Date('2014') }, { value: 130, date: new Date('2015') }], TIMESERIES_FREQUENCIES.ANNUAL),
    },
    {
        id: '7',
        label: 'Quarterly Earnings per Johnson & Johnson Share',
        timeSeries: new TimeSeries([{ value: 33, date: new Date('2001') }, { value: 71, date: new Date('2002') }, { value: 123, date: new Date('2003') }, { value: 104, date: new Date('2004') }, { value: 21, date: new Date('2005') }, { value: 81, date: new Date('2006') }, { value: 26, date: new Date('2007') }, { value: 69, date: new Date('2008') }, { value: 80, date: new Date('2009') }, { value: 63, date: new Date('2010') }, { value: 100, date: new Date('2011') }, { value: 67, date: new Date('2012') }, { value: 105, date: new Date('2013') }, { value: 103, date: new Date('2014') }, { value: 60, date: new Date('2015') }], TIMESERIES_FREQUENCIES.ANNUAL),
    },
    {
        id: '8',
        label: 'Level of Lake Huron 1875-1972',
        timeSeries: new TimeSeries([{ value: 7, date: new Date('2001') }, { value: 22, date: new Date('2002') }, { value: 17, date: new Date('2003') }, { value: 32, date: new Date('2004') }, { value: 77, date: new Date('2005') }, { value: 107, date: new Date('2006') }, { value: 22, date: new Date('2007') }, { value: 33, date: new Date('2008') }, { value: 2, date: new Date('2009') }, { value: 20, date: new Date('2010') }, { value: 49, date: new Date('2011') }, { value: 43, date: new Date('2012') }, { value: 67, date: new Date('2013') }, { value: 123, date: new Date('2014') }, { value: 70, date: new Date('2015') }], TIMESERIES_FREQUENCIES.ANNUAL),
    },
    {
        id: '9',
        label: 'Flow of the River Nile',
        timeSeries: new TimeSeries([{ value: 96, date: new Date('2001') }, { value: 37, date: new Date('2002') }, { value: 12, date: new Date('2003') }, { value: 12, date: new Date('2004') }, { value: 52, date: new Date('2005') }, { value: 126, date: new Date('2006') }, { value: 110, date: new Date('2007') }, { value: 34, date: new Date('2008') }, { value: 24, date: new Date('2009') }, { value: 17, date: new Date('2010') }, { value: 84, date: new Date('2011') }, { value: 129, date: new Date('2012') }, { value: 53, date: new Date('2013') }, { value: 99, date: new Date('2014') }, { value: 19, date: new Date('2015') }], TIMESERIES_FREQUENCIES.ANNUAL),
    },
];
