import React from 'react';
import ReactDOM from 'react-dom';

import LineChart from '../charts/LineChart';

/**
 * React bridge to a D3 chart.
 */
export default React.createClass({
    displayName: 'ExampleChart',


    getInitialState() {
        return {
            chart: null,
        };
    },

    componentDidMount() {
        // First render of the D3 chart.
        this.createChart();
    },

    // Never re-render since we are rendering using D3.
    shouldComponentUpdate(nextProps) {
        if (this.state.chart) {
            this.state.chart.update(this.getChartState(nextProps));
        }

        return false;
    },

    // Tear down the chart and remove the listeners.
    componentWillUnmount() {
        const { chart } = this.state;

        chart.destroy();
    },

    getChartState(props = this.props) {
        return {
            data: props.data,
        };
    },

    render() {
        return (
            <div className="chart_container" ref="chart"></div>
        );
    },

    createChart() {
        const el = ReactDOM.findDOMNode(this.refs.chart);

        if (this.state.chart) {
            this.state.chart.destroy();
        }

        const margin = {
            top: 0,
            right: 0,
            bottom: 40,
            left: 0,
        };

        const elWidth = Math.max(el.offsetWidth, 300);
        const elHeight = elWidth / 1.5;

        const chartProps = {
            margin: margin,
            width: elWidth - margin.left - margin.right,
            height: elHeight - margin.top - margin.bottom,
        };

        // Initialise the chart, then render it without transitions.
        this.setState({
            chart: new LineChart(el, chartProps),
        }, () => {
            const { chart } = this.state;

            chart.create(this.getChartState());
            chart.update(this.getChartState());

            chart.preventTransitions();
        });
    },
});
