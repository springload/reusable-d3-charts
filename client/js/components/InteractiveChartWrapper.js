import React from 'react';
import ReactDOM from 'react-dom';

/**
 * React bridge to a D3 chart.
 */
export default React.createClass({
    displayName: 'InteractiveChartWrapper',

    propTypes: {
        Chart: React.PropTypes.func.isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
            date: React.PropTypes.instanceOf(Date).isRequired,
            value: React.PropTypes.number.isRequired,
        }).isRequired).isRequired,
        id: React.PropTypes.string.isRequired,
        active: React.PropTypes.number.isRequired,
    },

    getInitialState() {
        return {
            chart: null,
            active: this.props.active,
        };
    },

    // First render of the D3 chart.
    componentDidMount() {
        this.createChart();
    },

    // Never re-render since we are rendering using D3.
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.chart) {
            this.state.chart.update(this.getChartState(nextProps, nextState));
        }

        return false;
    },

    onNavigationInteraction(index) {
        this.setState({
            active: index,
        }, () => {
            this.state.chart.update(this.getChartState());
        });
    },

    // Tear down the chart and remove the listeners.
    componentWillUnmount() {
        this.destroyChart();
    },

    render() {
        const { id } = this.props;

        return (
            <div id={id} ref="chart"></div>
        );
    },

    getChartState(props = this.props, state = this.state) {
        return {
            data: props.data,
            active: state.active,
        };
    },

    createChart() {
        const { Chart } = this.props;
        const el = ReactDOM.findDOMNode(this.refs.chart);

        this.destroyChart();

        // Initialise the chart, then render it without transitions.
        this.setState({
            chart: new Chart(el, {
                width: Math.max(el.offsetWidth, 300),
            }),
        }, () => {
            const { chart } = this.state;

            chart.create();
            chart.update(this.getChartState());

            chart.preventTransitions();

            // Re-render from scratch on each resize.
            global.addEventListener('resize', this.createChart);
            chart.dispatch.on('navigation', this.onNavigationInteraction);
        });
    },

    destroyChart() {
        if (this.state.chart) {
            this.state.chart.dispatch.on('navigation', null);
            this.state.chart.destroy();
        }

        global.removeEventListener('resize', this.createChart);
    },
});
