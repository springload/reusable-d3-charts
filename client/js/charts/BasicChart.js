import d3 from 'd3';

/**
 * Abstract class for a D3 chart.
 */
export default class BasicChart {

    constructor(el, props) {
        this.el = el;
        this.props = props;
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
     * Wraps multi-line text.
     * http://bl.ocks.org/mbostock/7555321
     */
    wrapText(selections) {
        selections.each(function wrap() {
            const text = d3.select(this);
            const words = text.text().split(/\s+/).reverse();
            const lineHeight = 1.1; // ems
            const y = text.attr('y');
            const dy = parseFloat(text.attr('dy'));

            let line = [];
            let lineNumber = 0;
            let word = words.pop();
            let tspan = text.text(null)
                .append('tspan')
                .attr('x', 0)
                .attr('y', y)
                .attr('dy', `${dy}em`);

            while (word) {
                line.push(word);
                tspan.text(line.join(' '));
                line.pop();
                tspan.text(line.join(' '));
                line = [word];
                tspan = text.append('tspan')
                    .attr('x', 0)
                    .attr('y', y)
                    .attr('dy', `${++lineNumber * lineHeight + dy}em`)
                    .text(word);
                word = words.pop();
            }
        });
    }

    /**
     * Can be overriden. Destroys the rendered SVG.
     */
    destroy() {
        d3.select(this.el).selectAll('svg').remove();
    }
}
