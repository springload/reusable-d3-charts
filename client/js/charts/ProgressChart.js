import d3 from 'd3';
import MoneyChart from './MoneyChart';

export default class ProgressChart extends MoneyChart {

    // First step of the D3 rendering.
    create() {
        const svg = super.createRoot();

        svg.append('g')
            .attr('class', 'bar')
            .attr('width', this.props.width);

        svg.append('g')
            .attr('class', 'bar-label');
    }

    // Main D3 rendering, that should be redone when the data updates.
    update(state) {
        const scales = this._scales(state.data);

        const data = state.data.slice(0, 2).map((d, i) => {
            /* eslint-disable */
            d.prevX = scales.x(i === 0 ? 0 : state.data[i - 1].value);
            /* eslint-enable */
            return d;
        });

        this._drawBar(scales, data);
        this._drawLabel(scales, data.filter((d, i) => i < 2));
    }

    // Generates our D3 scales.
    _scales(data) {
        const x = d3.scale.linear()
            .rangeRound([0, this.props.width])
            .domain(d3.extent(data, d => d.value));

        const colors = d3.scale.category10()
            .domain([0, 14]);

        return { x: x, colors: colors };
    }

    // Draws our bars and rectangles for our bar chart.
    _drawBar(scales, data) {
        const bar = d3.select(this.el).selectAll('.bar');

        const rect = bar.selectAll('rect')
            .data(data);

        // Enter.
        rect.enter().append('rect')
            .style('fill', (d, i) => scales.colors(i));

        // Enter & update.
        rect.transition()
            .attr('x', d => d.prevX)
            .attr('width', d => Math.max(0, scales.x(d.value) - d.prevX))
            .attr('height', this.props.height);

        // Exit
        rect.exit()
            .remove();
    }

    // Draws the label on top of the bars.
    _drawLabel(scales, val) {
        const numbers = d3.format('%')(val[0].value);
        const label = d3.select(this.el).selectAll('.bar-label');

        const range = label.selectAll('.money-range')
            .data([numbers]);

        range.enter().append('text')
            .attr('class', 'money-range')
            .attr('y', 20)
            .attr('x', 15);

        range.text(d => d);

        range.exit().remove();
    }
}
