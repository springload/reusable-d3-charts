import d3 from 'd3';

const dates = [new Date('2001'), new Date('2002'), new Date('2003'), new Date('2004'), new Date('2005'), new Date('2006'), new Date('2007'), new Date('2008'), new Date('2009'), new Date('2010'), new Date('2011'), new Date('2012'), new Date('2013'), new Date('2014'), new Date('2015'), new Date('2016')];

/**
 * Abstract class for a D3 chart.
 */
export default class Chart {

    constructor(el, props) {
        this.el = el;
        this.props = props;
        this.dispatch = d3.dispatch('navigation');
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
     * Retrieves the scales for our chart.
     * Those are numerical time series scales on full extent of both domains.
     */
    getScales(state) {
        const { height, width } = this.props;

        const x = d3.time.scale()
            .range([0, width])
            .domain(d3.extent(dates));

        const y = d3.scale.linear()
            .range([height, 0])
            .domain(d3.extent(state.data[0]))
            .nice();

        return {
            x: x,
            y: y,
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
                .attr('dy', dy + 'em');

            while (word) {
                line.push(word);
                tspan.text(line.join(' '));
                line.pop();
                tspan.text(line.join(' '));
                line = [word];
                tspan = text.append('tspan')
                    .attr('x', 0)
                    .attr('y', y)
                    .attr('dy', ++lineNumber * lineHeight + dy + 'em')
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
