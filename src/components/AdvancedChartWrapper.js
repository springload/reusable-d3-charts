import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

/**
 * React bridge to a D3 chart.
 */
export default React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        dataset: React.PropTypes.object.isRequired,
        filterFrom: React.PropTypes.number,
        filterTo: React.PropTypes.number,
    },

    getInitialState() {
        return {
            chart: null,
        };
    },

    componentDidMount() {
        // First render of the D3 chart.
        this.createChart();

        // Re-render from scratch on each resize.
        window.addEventListener('resize', this.createChart);
    },

    // Never re-render since we are rendering using D3.
    shouldComponentUpdate(nextProps) {
        // const { filterFrom, filterTo, dataset } = this.props;

        // Chart should only update if filter or data viewed has changed.
        if (this.state.chart) {
            // Ideally should be nextProps.filterFrom !== filterFrom || nextProps.filterTo !== filterTo || dataset is different.
            const shouldUpdate = true;

            if (shouldUpdate) {
                this.state.chart.update(this.getChartState(nextProps));
            }
        }

        return false;
    },

    // Tear down the chart and remove the listeners.
    componentWillUnmount() {
        const { chart } = this.state;

        if (chart) {
            chart.destroy();
        }
        window.removeEventListener('resize', this.createChart);
    },

    getChartState(props = this.props) {
        const { dataset, filterFrom, filterTo } = props;
        const data = dataset.timeSeries.getMeasures(filterFrom, filterTo);

        return {
            data: data.length ? [data] : [[]],

            measures: [
                {
                    id: '11',
                    shortLabel: '',
                    adjustments: [],
                    unit: '',
                    weight: 20,
                }
            ],

            domains: {
                x: data,
                y: [data],
            },

            format: [ d3.format('.2f') ],

            labels: {
                axis: [ dataset.label ],
                datasets: [ dataset.label ],
                aliases: [ dataset.label ],
                values: [ dataset.label ],
            },

            isSameDataset: true,
        };
    },

    render() {
        const { id } = this.props;

        return (
            <div id={id} ref="chart" className="chart"></div>
        );
    },

    createChart() {
        const { Chart } = this.props;
        const el = ReactDOM.findDOMNode(this.refs.chart);

        if (process.env.NODE_ENV !== 'production') {
            if (console.time) {
                console.time('CHART_RENDER');
            }
        }

        if (this.state.chart) {
            this.state.chart.destroy();
        }

        // Initialise the chart, then render it without transitions.
        const chart = new Chart(el, {
            width: el.clientWidth,
            isBreakdownChart: false,
            isDownloadChart: false,
        });

        const chartState = this.getChartState();

        chart.create();
        chart.update(chartState);

        chart.preventTransitions();

        this.setState({
            chart: chart,
        });

        if (process.env.NODE_ENV !== 'production') {
            if (console.timeEnd) {
                console.timeEnd('CHART_RENDER');
            }
        }
    },
});
