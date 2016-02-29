import d3 from 'd3';
import BasicChart from './BasicChart';

export default class LineChart extends BasicChart {

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
