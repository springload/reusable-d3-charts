import d3 from 'd3';

/**
 * Abstract class for a D3 chart.
 */
export default class Chart {

    constructor(el, props) {
        this.el = el;
        this.props = props;

        this.config = {
            tickCount: 3,
            tickFormat: d3.format('%'),
        };
    }

    /**
     * To override. Creates the initial rendering of the chart.
     */
    create() {}

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
     * Creates the Y "money" axis that is shared between all charts.
     * @param  {function} scale A D3 scale to use for the axis.
     * @return {function}       A D3 axis to call on the axis SVG elements.
     */
    createYAxis(scale) {
        const axis = d3.svg.axis()
            .scale(scale)
            .orient('right')
            .ticks(this.config.tickCount)
            .tickFormat(this.config.tickFormat)
            .innerTickSize(this.props.width)
            .outerTickSize(0);

        return axis;
    }

    /**
     * Second axis function to override D3's default tick generation.
     * @return {function} A D3 axis to call on the axis SVG elements.
     */
    overrideYAxis() {
        return (group) => {
            group.selectAll('text')
                .attr('class', 'y-tick-label')
                .attr('x', -this.props.margin.left)
                .each('end', function override() {
                    const label = d3.select(this.parentNode);
                    label.insert('rect', '.y-tick-label')
                        .attr('class', 'y-tick-hack')
                        .attr('x', -15)
                        .attr('y', -10)
                        .attr('width', 38)
                        .attr('height', 20)
                        .style('fill', '#f8faf5');
                });
        };
    }

    /**
     * To override. Populates the initial renderings with content.
     */
    update() {}

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
