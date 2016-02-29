import d3 from 'd3';

/**
 * Abstract class for a D3 chart.
 */
export default class FormattedChart {

    constructor(el, props) {
        this.el = el;
        this.props = props;
    }

    /**
     * Creates the root-level SVG element.
     * @return {object} D3 SVG root.
     */
    createRoot() {
        const { width, height, margin } = this.props;

        const svg = d3.select(this.el).append('svg')
            .attr('class', 'chart')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        return svg;
    }

    /**
     * Creates the initial rendering of the chart.
     */
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

        const x = d3.scale.linear()
            .range([0, width])
            .domain([-1, d3.max(state.data, d => d.period)])
            .nice();

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
            .tickFormat(d => `${d3.format('d')(d)} months`)
            .tickValues(d3.extent(state.data, d => d.period))
            .outerTickSize(0);

        const y = d3.svg.axis()
            .scale(scales.y)
            .orient('left')
            .tickFormat(d3.format('s'))
            .outerTickSize(0);

        return {
            x: x,
            y: y,
        };
    }

    update(state) {
        const scales = this.getScales(state);

        this.drawAxis(state, scales);
        this.drawLine(state, scales);
    }

    drawAxis(state, scales) {
        const svg = d3.select(this.el);
        const axis = this.getAxis(state, scales);

        svg.select('.axis.x')
            .transition()
            .call(axis.x);

        svg.select('.axis.y')
            .transition()
            .call(axis.y);
    }

    drawLine(state, scales) {
        const svg = d3.select(this.el);

        const d3Line = d3.svg.line()
            // .interpolate('basis')
            .x(d => scales.x(d.period))
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

    /**
     * To use to flush out D3 transitions.
     */
    preventTransitions() {
        const now = Date.now;
        Date.now = () => Infinity;
        d3.timer.flush();
        Date.now = now;
    }

    /**
     * Can be overriden. Destroys the rendered SVG.
     */
    destroy() {
        d3.select(this.el).selectAll('svg').remove();
    }
}
