import { TIMESERIES_START_DEFAULT, TIMESERIES_END_DEFAULT, TIMESERIES_FREQUENCIES } from '../config/timeseries';
import { formatRange } from '../utils/format';

/**
 * A Time series, and its related methods.
 * - Frequency of measurement
 * - Measures, over time.
 */
export default class TimeSeries {
    constructor(measures, frequency) {
        this.frequency = frequency;
        this.measures = measures;
    }

    hasMeasures() {
        return this.measures.length > 0;
    }

    getStartYear() {
        return this.hasMeasures() ? this.measures[0].date.getFullYear() : TIMESERIES_START_DEFAULT;
    }

    getEndYear() {
        return this.hasMeasures() ? this.measures[this.measures.length - 1].date.getFullYear() : TIMESERIES_END_DEFAULT;
    }

    getAvailableYears() {
        return this.measures.map((measure) => {
            const year = measure.date.getFullYear();
            return {
                value: year,
                label: year,
            };
        });
    }

    getFilterBounds(filterFrom, filterTo) {
        const fromValue = filterFrom || TIMESERIES_START_DEFAULT;
        const toValue = filterTo || TIMESERIES_END_DEFAULT;

        return {
            start: Math.min(fromValue, toValue),
            end: Math.max(fromValue, toValue),
        };
    }

    // Get measures in interval, or all measures by default.
    getMeasures(filterFrom, filterTo) {
        const bounds = this.getFilterBounds(filterFrom, filterTo);

        return this.measures.filter((measure) => {
            const year = measure.date.getFullYear();
            return year >= bounds.start && year <= bounds.end;
        });
    }

    getFrequencyLabel() {
        return TIMESERIES_FREQUENCIES[this.frequency].LABEL;
    }

    getRange() {
        return [
            this.getStartYear(),
            this.getEndYear(),
        ];
    }

    getRangeLabel() {
        return formatRange(this.getRange());
    }
}
