import keyMirror from 'keymirror';

/**
 * Time series business logic configuration.
 */

const FREQUENCIES = keyMirror({
    ANNUAL: null,
    QUARTERLY: null,
    MONTHLY: null,
});

const DAY_LENGTH_MS = 24 * 3600 * 1000;

export const TIMESERIES_FREQUENCIES = {};

TIMESERIES_FREQUENCIES[FREQUENCIES.ANNUAL] = {
    ID: FREQUENCIES.ANNUAL,
    LABEL: 'Annual',
    MAX_LENGTH: DAY_LENGTH_MS * 366 * 1,
};

TIMESERIES_FREQUENCIES[FREQUENCIES.QUARTERLY] = {
    ID: FREQUENCIES.QUARTERLY,
    LABEL: 'Quarterly',
    MAX_LENGTH: DAY_LENGTH_MS * 32 * 3,
};

TIMESERIES_FREQUENCIES[FREQUENCIES.MONTHLY] = {
    ID: FREQUENCIES.MONTHLY,
    LABEL: 'Monthly',
    // Upper bound, ok assumption for the time difference comparisons.
    MAX_LENGTH: DAY_LENGTH_MS * 32,
};

export const FREQUENCIES_MAP = {
    Annual: FREQUENCIES.ANNUAL,
    Quarterly: FREQUENCIES.QUARTERLY,
    Monthly: FREQUENCIES.monthly,
};

export const TIMESERIES_START_DEFAULT = 1000;
export const TIMESERIES_END_DEFAULT = (new Date()).getFullYear() + 1000;
