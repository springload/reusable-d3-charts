import d3 from 'd3';
import MoneyChart from './MoneyChart';

export default class AreaChart extends MoneyChart {

    create() {
        const svg = super.createRoot();

        svg.append('g')
            .attr('class', 'areas');

        svg.append('g')
            .attr('class', 'lines');

        svg.append('g')
            .attr('class', 'x-axis axis')
            .attr('transform', `translate(0, ${this.props.height})`)
        .append('text')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .attr('transform', `translate(${this.props.width}, 0)`)
            .text(' ');

        svg.append('g')
            .attr('class', 'y-axis axis')
        .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text(' ');

        svg.append('g')
            .attr('class', 'retirement-mark mark axis')
        .append('text')
            .attr('y', this.props.height + 10)
            .attr('dy', '.71em')
            .style('text-anchor', 'middle')
            .text(' ');
    }

    update(state) {
        const scales = this._scales(state.data);

        this._drawAxis(scales);
        this._drawAreas(scales, state.data);
        this._drawLines(scales, state.data);
    }

    _scales(data) {
        const x = d3.scale.linear()
            .range([0, this.props.width])
            .domain(d3.extent(data, d => d.period));

        const y = d3.scale.linear()
            .range([this.props.height, 0])
            .domain(d3.extent(data, d => d.value));

        return { x: x, y: y };
    }

    _drawAreas(scales, data) {
        const areas = d3.select(this.el).selectAll('.areas');

        const interpolation = d3.svg.area()
            .interpolate('cardinal')
            .x(d => scales.x(d.period))
            .y0(this.props.height)
            .y1(d => scales.y(d.value));

        const area = areas.selectAll('.area')
            .data([data]);

        area.enter().append('path');

        area.attr('class', 'area')
            .transition()
            .attr('d', d => interpolation(d));

        area.exit()
            .remove();
    }

    _drawLines(scales, data) {
        const lines = d3.select(this.el).selectAll('.lines');

        const lineFunction = d3.svg.line()
            .interpolate('cardinal')
            .x(d => scales.x(d.period))
            .y(d => scales.y(d.value));

        const line = lines.selectAll('.line')
            .data([data]);

        line.enter().append('path');

        line
            .attr('class', 'line')
            .transition()
            .attr('d', d => lineFunction(d));

        line.exit()
            .remove();
    }

    _drawAxis(scales) {
        const xAxis = d3.svg.axis()
            .orient('bottom')
            .scale(scales.x);

        const yAxis = this.createYAxis(scales.y);

        d3.select(this.el).selectAll('.x-axis')
            .transition()
            .call(xAxis);

        d3.select(this.el).selectAll('.y-axis')
            .transition()
            .call(yAxis)
            .call(this.overrideYAxis());
    }
}
