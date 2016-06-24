import React from 'react';

import Export from '../components/Export';
import TimeFilter from '../components/TimeFilter';

import BasicLineChart from '../components/BasicLineChart';
import FormattedChart from '../components/FormattedChart';
import AreaChart from '../components/AreaChart';
import ProgressChart from '../components/ProgressChart';
import BarChart from '../components/BarChart';
import InteractiveLineChart from '../components/InteractiveLineChart';

import datasets from '../datasets';

const STEP = 1;
const MIN = 0;
const MAX = datasets.length - STEP;

export default React.createClass({
    displayName: 'App',

    getInitialState() {
        return {
            activeDatasetIndexes: [0, 1, 2, 3, 4, 5],
            timeFilters: [
                { from: null, to: null },
                { from: null, to: null },
                { from: null, to: null },
                { from: null, to: null },
                { from: null, to: null },
                { from: null, to: null },
            ],
        };
    },

    changeActiveDataset(index, e) {
        const { activeDatasetIndexes } = this.state;
        const newActiveDatasets = activeDatasetIndexes.slice();

        newActiveDatasets[index] = parseInt(e.target.value, 10);

        this.setState({
            activeDatasetIndexes: newActiveDatasets,
        });
    },

    changeTimeFilter(index, from, to) {
        const { timeFilters } = this.state;
        const newTimeFilters = timeFilters.slice();

        newTimeFilters[index] = {
            from: typeof from !== 'undefined' ? from : timeFilters[index].from,
            to: typeof to !== 'undefined' ? to : timeFilters[index].to,
        };

        this.setState({
            timeFilters: newTimeFilters,
        });
    },

    handleChangeTo(index, value) {
        this.changeTimeFilter(index, undefined, parseInt(value, 10));
    },

    handleChangeFrom(index, value) {
        this.changeTimeFilter(index, parseInt(value, 10));
    },

    resetTimeFilter(index) {
        this.changeTimeFilter(index, null, null);
    },

    render() {
        const { activeDatasetIndexes, timeFilters } = this.state;
        const activeDatasets = activeDatasetIndexes.map(i => datasets[i]);

        return (
            <div className="app">
                <h1>Reusable D3 charts</h1>
                <div className="grid">
                    <div className="medium-one-half large-two-thirds gutters">
                        <BasicLineChart id="basic-line-chart-wrapper" data={activeDatasets[0].timeSeries.getMeasures(timeFilters[0].from, timeFilters[0].to)} />
                        <h4>{activeDatasets[0].label}</h4>
                    </div>
                    <div className="medium-one-half large-one-third gutters">
                        <a href="https://github.com/springload/reusable-d3-charts/blob/master/client/js/charts/BasicLineChart.js" className="u-block"><h3>Basic line chart</h3></a>
                        <input
                            type="range"
                            className="full"
                            value={activeDatasetIndexes[0]}
                            max={MAX}
                            min={MIN}
                            step={STEP}
                            onChange={this.changeActiveDataset.bind(this, 0)}
                            onClick={this.changeActiveDataset.bind(this, 0)}
                        />
                        <TimeFilter
                            filterFrom={timeFilters[0].from}
                            filterTo={timeFilters[0].to}
                            availableYears={activeDatasets[0].timeSeries.getAvailableYears()}
                            handleChangeFrom={this.handleChangeFrom.bind(this, 0)}
                            handleChangeTo={this.handleChangeTo.bind(this, 0)}
                            resetTimeFilter={this.resetTimeFilter.bind(this, 0)}
                        />
                        <Export targetId="basic-line-chart-wrapper" dataset={activeDatasets[0]}/>
                    </div>
                </div>

                <div className="grid">
                    <div className="medium-one-half large-two-thirds gutters">
                        <FormattedChart
                            id="formatted-chart-wrapper"
                            data={activeDatasets[1].timeSeries.getMeasures(timeFilters[1].from, timeFilters[1].to)}
                        />
                        <h4>{activeDatasets[1].label}</h4>
                    </div>
                    <div className="medium-one-half large-one-third gutters">
                        <a href="https://github.com/springload/reusable-d3-charts/blob/master/client/js/charts/FormattedChart.js" className="u-block"><h3>Formatted line chart</h3></a>
                        <input
                            type="range"
                            className="full"
                            value={activeDatasetIndexes[1]}
                            max={MAX}
                            min={MIN}
                            step={STEP}
                            onChange={this.changeActiveDataset.bind(this, 1)}
                            onClick={this.changeActiveDataset.bind(this, 1)}
                        />
                        <TimeFilter
                            filterFrom={timeFilters[1].from}
                            filterTo={timeFilters[1].to}
                            availableYears={activeDatasets[1].timeSeries.getAvailableYears()}
                            handleChangeFrom={this.handleChangeFrom.bind(this, 1)}
                            handleChangeTo={this.handleChangeTo.bind(this, 1)}
                            resetTimeFilter={this.resetTimeFilter.bind(this, 1)}
                        />
                        <Export targetId="formatted-chart-wrapper" dataset={activeDatasets[1]}/>
                    </div>
                </div>

                <div className="grid">
                    <div className="medium-one-half large-two-thirds gutters">
                        <AreaChart
                            id="area-chart-wrapper"
                            data={activeDatasets[2].timeSeries.getMeasures(timeFilters[2].from, timeFilters[2].to)}
                        />
                        <h4>{activeDatasets[2].label}</h4>
                    </div>
                    <div className="medium-one-half large-one-third gutters">
                        <a href="https://github.com/springload/reusable-d3-charts/blob/master/client/js/charts/AreaChart.js" className="u-block"><h3>Area chart</h3></a>
                        <input
                            type="range"
                            className="full"
                            value={activeDatasetIndexes[2]}
                            max={MAX}
                            min={MIN}
                            step={STEP}
                            onChange={this.changeActiveDataset.bind(this, 2)}
                            onClick={this.changeActiveDataset.bind(this, 2)}
                        />
                        <TimeFilter
                            filterFrom={timeFilters[2].from}
                            filterTo={timeFilters[2].to}
                            availableYears={activeDatasets[2].timeSeries.getAvailableYears()}
                            handleChangeFrom={this.handleChangeFrom.bind(this, 2)}
                            handleChangeTo={this.handleChangeTo.bind(this, 2)}
                            resetTimeFilter={this.resetTimeFilter.bind(this, 2)}
                        />
                        <Export targetId="area-chart-wrapper" dataset={activeDatasets[2]}/>
                    </div>
                </div>

                <div className="grid">
                    <div className="medium-one-half large-two-thirds gutters">
                        <ProgressChart
                            id="progress-chart-wrapper"
                            data={activeDatasets[3].timeSeries.getMeasures(timeFilters[3].from, timeFilters[3].to)}
                        />
                        <h4>{activeDatasets[3].label}</h4>
                    </div>
                    <div className="medium-one-half large-one-third gutters">
                        <a href="https://github.com/springload/reusable-d3-charts/blob/master/client/js/charts/ProgressChart.js" className="u-block"><h3>Progress chart</h3></a>
                        <input
                            type="range"
                            className="full"
                            value={activeDatasetIndexes[3]}
                            max={MAX}
                            min={MIN}
                            step={STEP}
                            onChange={this.changeActiveDataset.bind(this, 3)}
                            onClick={this.changeActiveDataset.bind(this, 3)}
                        />
                        <TimeFilter
                            filterFrom={timeFilters[3].from}
                            filterTo={timeFilters[3].to}
                            availableYears={activeDatasets[3].timeSeries.getAvailableYears()}
                            handleChangeFrom={this.handleChangeFrom.bind(this, 3)}
                            handleChangeTo={this.handleChangeTo.bind(this, 3)}
                            resetTimeFilter={this.resetTimeFilter.bind(this, 3)}
                        />
                        <Export targetId="progress-chart-wrapper" dataset={activeDatasets[3]}/>
                    </div>
                </div>

                <div className="grid">
                    <div className="medium-one-half large-two-thirds gutters">
                        <BarChart
                            id="bar-chart-wrapper"
                            data={activeDatasets[4].timeSeries.getMeasures(timeFilters[4].from, timeFilters[4].to)}
                        />
                        <h4>{activeDatasets[4].label}</h4>
                    </div>
                    <div className="medium-one-half large-one-third gutters">
                        <a href="https://github.com/springload/reusable-d3-charts/blob/master/client/js/charts/BarChart.js" className="u-block"><h3>Bar chart</h3></a>
                        <input
                            type="range"
                            className="full"
                            value={activeDatasetIndexes[4]}
                            max={MAX}
                            min={MIN}
                            step={STEP}
                            onChange={this.changeActiveDataset.bind(this, 4)}
                            onClick={this.changeActiveDataset.bind(this, 4)}
                        />
                        <TimeFilter
                            filterFrom={timeFilters[4].from}
                            filterTo={timeFilters[4].to}
                            availableYears={activeDatasets[4].timeSeries.getAvailableYears()}
                            handleChangeFrom={this.handleChangeFrom.bind(this, 4)}
                            handleChangeTo={this.handleChangeTo.bind(this, 4)}
                            resetTimeFilter={this.resetTimeFilter.bind(this, 4)}
                        />
                        <Export targetId="bar-chart-wrapper" dataset={activeDatasets[4]}/>
                    </div>
                </div>

                <div className="grid">
                    <div className="medium-one-half large-two-thirds gutters">
                        <InteractiveLineChart
                            id="interactive-chart-wrapper"
                            data={activeDatasets[5].timeSeries.getMeasures(timeFilters[5].from, timeFilters[5].to)}
                        />
                        <h4>{activeDatasets[5].label}</h4>
                    </div>
                    <div className="medium-one-half large-one-third gutters">
                        <a href="https://github.com/springload/reusable-d3-charts/blob/master/client/js/charts/InteractiveLineChart.js" className="u-block"><h3>Interactive line chart</h3></a>
                        <input
                            type="range"
                            className="full"
                            value={activeDatasetIndexes[5]}
                            max={MAX}
                            min={MIN}
                            step={STEP}
                            onChange={this.changeActiveDataset.bind(this, 5)}
                            onClick={this.changeActiveDataset.bind(this, 5)}
                        />
                        <TimeFilter
                            filterFrom={timeFilters[5].from}
                            filterTo={timeFilters[5].to}
                            availableYears={activeDatasets[5].timeSeries.getAvailableYears()}
                            handleChangeFrom={this.handleChangeFrom.bind(this, 5)}
                            handleChangeTo={this.handleChangeTo.bind(this, 5)}
                            resetTimeFilter={this.resetTimeFilter.bind(this, 5)}
                        />
                        <Export targetId="interactive-chart-wrapper" dataset={activeDatasets[5]}/>
                    </div>
                </div>
            </div>
        );
    },
});
