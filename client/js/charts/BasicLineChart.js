import d3 from 'd3';
import Chart from './Chart';

export default class LineChart extends Chart {

    create() {
        const { height } = this.props;
        const svg = this.createRoot();

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${height})`);

        svg.append('g')
            .attr('class', 'y axis');

        svg.append('g')
            .attr('class', 'lines');
    }

    /**
     * Retrieves the scales for our chart.
     * Those are numerical time series scales on full extent of both dates and values.
     */
    getScales(state) {
        const { height, width } = this.props;

        const x = d3.time.scale()
            .range([0, width])
            .domain(d3.extent(state.data, d => d.date));

        const y = d3.scale.linear()
            .range([height, 0])
            .domain(d3.extent(state.data, d => d.value))
            .nice();

        return {
            x: x,
            y: y,
        };
    }

    getAxis(state, scales) {
        const x = d3.svg.axis()
            .scale(scales.x)
            .orient('bottom')
            .tickFormat(d3.time.format('%Y'));
            // .outerTickSize(0);

        const y = d3.svg.axis()
            .scale(scales.y)
            .orient('left');
            // .outerTickSize(0);

        return {
            x: x,
            y: y,
        };
    }

    update(state) {
        const scales = this.getScales(state);

        this.drawAxis(state, scales);
        this.drawLines(state, scales);
    }

    drawAxis(state, scales) {
        const svg = d3.select(this.el);
        const axis = this.getAxis(state, scales);

        svg.select('.axis.x')
            .transition()
            .call(axis.x)
        .selectAll('.tick text')
            .call(this.wrapText);

        svg.select('.axis.y')
            .transition()
            .call(axis.y);
    }

    drawLines(state, scales) {
        const svg = d3.select(this.el);

        const d3Line = d3.svg.line()
            .interpolate('basis')
            .x(d => scales.x(d.date))
            .y(d => scales.y(d.value));

        const lines = svg.selectAll('.lines');
        const line = lines.selectAll('.line')
            .data([state.data]);

        line.enter().append('path')
            .attr('class', 'line');

        line.transition()
            .attr('d', d3Line);

        line.exit()
            .remove();
    }
}
