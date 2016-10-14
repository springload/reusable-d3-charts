import d3 from 'd3';
import MoneyChart from './MoneyChart';

import { isSmallScreen } from '../config/interface';

export default class BarChart extends MoneyChart {

    constructor(el, props) {
        super(el, props);

        this.props.margin = {
            top: 30,
            right: 10,
            bottom: 40,
            left: 40,
        };

        this.props.width = props.width - this.props.margin.left - this.props.margin.right;
        this.props.height = props.width / (3 / 2) - this.props.margin.top - this.props.margin.bottom;
    }

    create() {
        const svg = super.createRoot();

        svg.append('g')
            .attr('class', 'bars');

        svg.append('g')
            .attr('class', 'x-axis axis');
    }

    update(state) {
        const data = state.data.map((d, i) => {
            return {
                value: d.value / 100,
                period: i,
            };
        });

        const scales = this.getScales(data);

        this.drawAxis(scales, data);
        this.drawBars(scales, data);
    }

    getScales(data) {
        const x = d3.scale.ordinal()
            .rangeRoundBands([0, this.props.width])
            .domain(data.map(d => d.period).reverse());

        const y = d3.scale.linear()
            .rangeRound([this.props.height, 0])
            .domain([0, d3.max(data, d => d.value)]);

        return { x: x, y: y };
    }

drawAxis(scales) {
    const xAxis = d3.svg.axis()
        .orient('top')
        .tickPadding(5)
        .scale(scales.x);

    if (isSmallScreen()) {
        xAxis.tickValues([0, 5, 10]);
    }

    d3.select(this.el).selectAll('.x-axis')
        .call(xAxis);
}

    drawBars(scales, data) {
        const bars = d3.select(this.el).selectAll('.bars');

        const bar = bars.selectAll('.bar')
            .data(data);

        // Enter
        bar.enter().append('g')
            .attr('class', 'bar');

        // Enter & update
        bar.attr('transform', d => `translate(${scales.x(d.period)}, 0)`);

        const rect = bar.selectAll('rect')
            .data(d => [d]);

        rect.enter().append('rect');

        // Enter & update.
        rect.transition()
            .attr('width', scales.x.rangeBand())
            .attr('y', d => scales.y(d.value))
            .attr('height', d => this.props.height - scales.y(d.value));

        // Exit
        rect.exit()
            .remove();

        bar.exit()
            .remove();
    }
}
