import React from 'react';

import Export from '../components/Export';
import TimeFilter from '../components/TimeFilter';
import ChartWrapper from '../components/ChartWrapper';
import InteractiveChartWrapper from '../components/InteractiveChartWrapper';
import AdvancedChartWrapper from '../components/AdvancedChartWrapper';
import AdvancedDownloadWrapper from '../components/AdvancedDownloadWrapper';

import BasicLineChart from '../charts/BasicLineChart';
import AreaChart from '../charts/AreaChart';
import ProgressChart from '../charts/ProgressChart';
import BarChart from '../charts/BarChart';
import InteractiveLineChart from '../charts/InteractiveLineChart';
import AdvancedLineChart from '../charts/AdvancedLineChart';

import datasets from '../datasets';

const STEP = 1;
const MIN = 0;
const MAX = datasets.length - STEP;

export default React.createClass({
    displayName: 'App',

    getInitialState() {
        return {
            activeDatasetIndexes: [0, 1, 2, 3, 4, 5, 9],
            timeFilters: [
                { from: null, to: null },
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
                        <ChartWrapper
                            Chart={BasicLineChart}
                            id="basic-line-chart-wrapper"
                            data={activeDatasets[0].timeSeries.getMeasures(timeFilters[0].from, timeFilters[0].to)}
                        />
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
                        <Export targetId="basic-line-chart-wrapper" dataset={activeDatasets[0]} />
                    </div>
                </div>

                <div className="grid">
                    <div className="medium-one-half large-two-thirds gutters">
                        <ChartWrapper
                            Chart={AreaChart}
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
                        <Export targetId="area-chart-wrapper" dataset={activeDatasets[2]} />
                    </div>
                </div>

                <div className="grid">
                    <div className="medium-one-half large-two-thirds gutters">
                        <ChartWrapper
                            Chart={ProgressChart}
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
                        <Export targetId="progress-chart-wrapper" dataset={activeDatasets[3]} />
                    </div>
                </div>

                <div className="grid">
                    <div className="medium-one-half large-two-thirds gutters">
                        <ChartWrapper
                            Chart={BarChart}
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
                        <Export targetId="bar-chart-wrapper" dataset={activeDatasets[4]} />
                    </div>
                </div>

                <div className="grid">
                    <div className="medium-one-half large-two-thirds gutters">
                        <InteractiveChartWrapper
                            Chart={InteractiveLineChart}
                            id="interactive-chart-wrapper"
                            data={activeDatasets[5].timeSeries.getMeasures(timeFilters[5].from, timeFilters[5].to)}
                            active={4}
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
                        <Export targetId="interactive-chart-wrapper" dataset={activeDatasets[5]} />
                    </div>
                </div>

                <div className="grid">
                    <div className="medium-one-half large-two-thirds gutters">
                        <AdvancedChartWrapper
                            Chart={AdvancedLineChart}
                            id="advanced-chart-wrapper"
                            dataset={activeDatasets[6]}
                            filterFrom={timeFilters[6].from}
                            filterTo={timeFilters[6].to}
                        />
                        <AdvancedDownloadWrapper
                            Chart={AdvancedLineChart}
                            id="advanced-download-wrapper"
                            dataset={activeDatasets[6]}
                            filterFrom={timeFilters[6].from}
                            filterTo={timeFilters[6].to}
                        />
                        <h4>{activeDatasets[6].label}</h4>
                    </div>
                    <div className="medium-one-half large-one-third gutters">
                        <a href="https://github.com/springload/reusable-d3-charts/blob/master/client/js/charts/AdvancedLineChart.js" className="u-block"><h3>Advanced line chart</h3></a>
                        <input
                            type="range"
                            className="full"
                            value={activeDatasetIndexes[6]}
                            max={MAX}
                            min={MIN}
                            step={STEP}
                            onChange={this.changeActiveDataset.bind(this, 6)}
                            onClick={this.changeActiveDataset.bind(this, 6)}
                        />
                        <TimeFilter
                            filterFrom={timeFilters[6].from}
                            filterTo={timeFilters[6].to}
                            availableYears={activeDatasets[6].timeSeries.getAvailableYears()}
                            handleChangeFrom={this.handleChangeFrom.bind(this, 6)}
                            handleChangeTo={this.handleChangeTo.bind(this, 6)}
                            resetTimeFilter={this.resetTimeFilter.bind(this, 6)}
                        />
                        <Export targetId="advanced-download-wrapper" dataset={activeDatasets[6]} />
                    </div>
                </div>
            </div>
        );
    },
});
