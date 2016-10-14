import React from 'react';

import Select from 'react-simpler-select';

import Button from '../components/Button';

/**
 * Time filtering UI, for the user to "zoom in" on a smaller length of time.
 */
const TimeFilter = ({ availableYears, filterTo, filterFrom, handleChangeFrom, handleChangeTo, resetTimeFilter }) => {
    const hasFilter = filterFrom || filterTo;
    const fromValue = filterFrom || availableYears[0];
    const toValue = filterTo || availableYears[availableYears.length - 1];

    return (
        <form className="form-inline text--">
            <label className="select">
                <Select
                    name="from"
                    value={fromValue}
                    options={availableYears}
                    onChange={handleChangeFrom}
                />
            </label>

            <span> - </span>

            <label className="select">
                <Select
                    name="to"
                    value={toValue}
                    options={availableYears.slice().reverse()}
                    onChange={handleChangeTo}
                />
            </label>

            {hasFilter ? (
                <Button
                    className="btn--link"
                    onClick={resetTimeFilter}
                >
                    All
                </Button>
            ) : null}
        </form>
    );
};

TimeFilter.propTypes = {
    availableYears: React.PropTypes.array.isRequired,
    filterFrom: React.PropTypes.number,
    filterTo: React.PropTypes.number,
    handleChangeFrom: React.PropTypes.func.isRequired,
    handleChangeTo: React.PropTypes.func.isRequired,
    resetTimeFilter: React.PropTypes.func.isRequired,
};

export default TimeFilter;
