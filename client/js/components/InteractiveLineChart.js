import React from 'react';
import ReactDOM from 'react-dom';

import InteractiveLineChart from '../charts/InteractiveLineChart';

/**
 * React bridge to a D3 chart.
 */
export default React.createClass({
    displayName: 'InteractiveLineChart',

    propTypes: {
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
            date: React.PropTypes.instanceOf(Date).isRequired,
            value: React.PropTypes.number.isRequired,
        }).isRequired).isRequired,
        id: React.PropTypes.string.isRequired,
    },

    getInitialState() {
        return {
            chart: null,
            active: 4,
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
        if (this.state.chart) {
            this.state.chart.update(this.getChartState(nextProps));
        }

        return false;
    },

    // Tear down the chart and remove the listeners.
    componentWillUnmount() {
        this.state.chart.destroy();

        this.state.chart.dispatch.on('navigation', null);

        window.removeEventListener('resize', this.createChart);
    },

    getChartState(props = this.props) {
        return {
            active: this.state.active,
            data: props.data,
        };
    },

    render() {
        const { id } = this.props;

        return (
            <div id={id} ref="chart"></div>
        );
    },

    onNavigationInteraction(index) {
        this.setState({
            active: index,
        }, () => {
            this.state.chart.update(this.getChartState(this.props));
        });
    },

    createChart() {
        const el = ReactDOM.findDOMNode(this.refs.chart);

        if (this.state.chart) {
            this.state.chart.destroy();
        }

        const margin = {
            top: 20,
            right: 0,
            bottom: 50,
            left: 40,
        };

        const ratio = 3 / 2;
        const elWidth = Math.max(el.offsetWidth, 300);
        const elHeight = elWidth / ratio;

        const chartProps = {
            margin: margin,
            width: elWidth - margin.left - margin.right,
            height: elHeight - margin.top - margin.bottom,
        };

        // Initialise the chart, then render it without transitions.
        this.setState({
            chart: new InteractiveLineChart(el, chartProps),
        }, () => {
            const { chart } = this.state;

            chart.create(this.getChartState());
            chart.update(this.getChartState());

            chart.preventTransitions();

            chart.dispatch.on('navigation', this.onNavigationInteraction);
        });
    },
});
