import keyMirror from 'keymirror';

/**
 * Measure business logic configuration.
 */

export const MEASURE_TYPE_IDS = keyMirror({
    PERCENT_RELATIVE: null,
    PERCENT_ABSOLUTE: null,
    MONEY_RELATIVE: null,
    MONEY_ABSOLUTE: null,
    NUMBER_RELATIVE: null,
    NUMBER_ABSOLUTE: null,
    INDEX: null,
    YEARS: null,
    OTHER: null,
});

export const MEASURE_TYPES_PERCENT = [
    MEASURE_TYPE_IDS.PERCENT_RELATIVE,
    MEASURE_TYPE_IDS.PERCENT_ABSOLUTE,
];

export const MEASURE_TYPES_EXCLUDED = [
    MEASURE_TYPE_IDS.OTHER,
];

export const isPercentMeasure = measure => MEASURE_TYPES_PERCENT.indexOf(measure.type) !== -1;
export const isExcludedMeasure = measure => MEASURE_TYPES_EXCLUDED.indexOf(measure.type) !== -1;

export const MEASURES = {};

MEASURES[MEASURE_TYPE_IDS.PERCENT_RELATIVE] = {
    type: MEASURE_TYPE_IDS.PERCENT_RELATIVE,
    weight: 90,
    formatFunction: 'vaguePercent',
};

MEASURES[MEASURE_TYPE_IDS.PERCENT_ABSOLUTE] = {
    type: MEASURE_TYPE_IDS.PERCENT_ABSOLUTE,
    weight: 80,
    formatFunction: 'vaguePercent',
};

MEASURES[MEASURE_TYPE_IDS.MONEY_RELATIVE] = {
    type: MEASURE_TYPE_IDS.MONEY_RELATIVE,
    weight: 70,
    formatFunction: 'exactMoney',
};

MEASURES[MEASURE_TYPE_IDS.MONEY_ABSOLUTE] = {
    type: MEASURE_TYPE_IDS.MONEY_ABSOLUTE,
    weight: 60,
    formatFunction: 'exactMoney',
};

MEASURES[MEASURE_TYPE_IDS.NUMBER_RELATIVE] = {
    type: MEASURE_TYPE_IDS.NUMBER_RELATIVE,
    weight: 50,
    formatFunction: 'exactNumber',
};

MEASURES[MEASURE_TYPE_IDS.NUMBER_ABSOLUTE] = {
    type: MEASURE_TYPE_IDS.NUMBER_ABSOLUTE,
    weight: 40,
    formatFunction: 'exactNumber',
};

MEASURES[MEASURE_TYPE_IDS.INDEX] = {
    type: MEASURE_TYPE_IDS.INDEX,
    weight: 30,
    formatFunction: 'exactNumber',
};

MEASURES[MEASURE_TYPE_IDS.YEARS] = {
    type: MEASURE_TYPE_IDS.YEARS,
    weight: 20,
    formatFunction: 'exactNumber',
};

MEASURES[MEASURE_TYPE_IDS.OTHER] = {
    type: MEASURE_TYPE_IDS.OTHER,
    weight: 10,
    formatFunction: 'exactValue',
};

/* eslint-disable quote-props */

// The base criteria to determine which measure we are looking at.
// Should cover all measures.
export const MEASURE_UNITS_MAP = {
    '%': MEASURES[MEASURE_TYPE_IDS.PERCENT_ABSOLUTE],
    '$': MEASURES[MEASURE_TYPE_IDS.MONEY_ABSOLUTE],
    '#': MEASURES[MEASURE_TYPE_IDS.NUMBER_ABSOLUTE],
    'Index': MEASURES[MEASURE_TYPE_IDS.INDEX],
    'Years': MEASURES[MEASURE_TYPE_IDS.YEARS],
    'text': MEASURES[MEASURE_TYPE_IDS.OTHER],
};

// Extra criteria to infer more meaning.
// Does not cover all measures.
export const MEASURE_TYPES_MAP = {
    'Per_capita': MEASURES[MEASURE_TYPE_IDS.MONEY_RELATIVE],
    '%_GDP': MEASURES[MEASURE_TYPE_IDS.PERCENT_RELATIVE],
    '%_of_public_sector': MEASURES[MEASURE_TYPE_IDS.PERCENT_RELATIVE],
    '%_of_all_sectors': MEASURES[MEASURE_TYPE_IDS.PERCENT_RELATIVE],
    '%_exports': MEASURES[MEASURE_TYPE_IDS.PERCENT_RELATIVE],
    '% tot': MEASURES[MEASURE_TYPE_IDS.PERCENT_RELATIVE],
};

/* eslint-enable quote-props */

export const MEASURE_WARNING_MESSAGES = {
    DIFFERENT_UNITS: {
        current: 'Your y-axis units are different.',
        future: 'Your y-axis units will be different.',
    },
    DIFFERENT_ADJUSTMENTS: {
        current: 'You can’t compare real vs nominal values.',
        future: 'You can’t compare real vs nominal values.',
    },
};

export const MEASURE_ADJUSTMENT_REAL = 'real';
