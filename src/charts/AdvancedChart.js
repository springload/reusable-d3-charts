import d3 from 'd3';

// import { isPercentMeasure } from '../config/measures';
import { CHART_ASPECT_RATIO, isSmallScreen } from '../config/interface';

const isPercentMeasure = () => false;

/**
 * Abstract class for a D3 chart.
 */
export default class Chart {

    isSmallFactor() {
        const { isDownloadChart } = this.props;

        return !isDownloadChart && isSmallScreen();
    }

    setSize(fullWidth) {
        this.props.fullWidth = fullWidth;
        this.props.fullHeight = (fullWidth / CHART_ASPECT_RATIO);
        this.props.width = this.props.fullWidth - this.props.margin.left - this.props.margin.right - this.props.padding.left - this.props.padding.right;
        this.props.height = this.props.fullHeight - this.props.margin.top - this.props.margin.bottom - this.props.padding.top - this.props.padding.bottom;
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
        const { margin, borderSize, isDownloadChart } = this.props;
        const clientWidthBefore = this.el.clientWidth;

        let fullWidth = this.props.fullWidth + this.props.borderSize * 2;
        let fullHeight = this.props.fullHeight + this.props.headerHeight + this.props.footerHeight + this.props.borderSize * 2;

        const svg = d3.select(this.el).append('svg')
            .attr('width', fullWidth)
            .attr('height', fullHeight);

        // Addresses a sizing bug that happens when the browser scrollbar is over the chart.
        if (!isDownloadChart && clientWidthBefore !== this.el.clientWidth) {
            this.setSize(Math.min(this.props.fullWidth, this.el.clientWidth));

            fullWidth = this.props.fullWidth + this.props.borderSize * 2;
            fullHeight = this.props.fullHeight + this.props.headerHeight + this.props.footerHeight + this.props.borderSize * 2;

            svg.attr('width', fullWidth)
                .attr('height', fullHeight);
        }

        svg.attr('class', `chart ${isDownloadChart ? '-download' : ''}`)
            .attr({
                xmlns: 'http://www.w3.org/2000/svg',
                'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                version: '1.1',
            })
            .call(this.embedSymbols.bind(this));

        svg.append('rect')
            .attr('class', 'chart-background')
            .attr('width', fullWidth)
            .attr('height', fullHeight);

        const container = svg.append('g')
            .attr('transform', `translate(${margin.left + borderSize}, ${borderSize})`);

        return container;
    }

    /**
     * Embeds a list of SVG symbols within our chart. This is useful
     * when exporting the chart.
     */
    embedSymbols(selections) {
        const { isDownloadChart } = this.props;
        const symbols = {
            'embedded-logo': 'logo',
            'embedded-logo-nasa': 'logo-nasa'
        };

        if (isDownloadChart) {
            selections.each(function each() {
                const svg = d3.select(this);

                Object.keys(symbols).forEach((key) => {
                    const symbolElt = document.querySelector(`#${symbols[key]}`);

                    if (symbolElt) {
                        svg.append('symbol')
                            .attr('id', key)
                            .html(symbolElt.innerHTML);
                    }
                });
            });
        }
    }

    /**
     * Analyses the statistical properties of a time series.
     */
    getProperties(data) {
        const values = data.map(d => d.value);
        const min = d3.min(values);

        return {
            min: min,
            max: d3.max(values),
            deviation: d3.deviation(values),
            isNegative: min < 0,
        };
    }

    getBounds(domain, isPercent) {
        const properties = this.getProperties(domain);
        let lower;
        let upper;

        if (isPercent) {
            lower = properties.isNegative ? properties.min : 0;

            if (properties.max > 1) {
                upper = properties.max;
            } else if (properties.max > 0.5) {
                upper = 1;
            } else {
                upper = properties.max;
            }
        } else {
            lower = properties.isNegative ? properties.min : 0;
            upper = properties.max;
        }

        return [lower, upper];
    }

    /**
     * Retrieves the domains for our chart's scales.
     * See https://github.com/mbostock/d3/wiki/Quantitative-Scales
     */
    getDomains(state) {
        const domains = {
            x: d3.extent(state.domains.x, d => d.date),
            y: state.domains.y.map((domain, i) => {
                return this.getBounds(domain, isPercentMeasure(state.measures[i]));
            }),
        };

        const isSameType = state.measures.every(measure => measure.type === state.measures[0].type);
        const isPercent = state.measures.every(isPercentMeasure);

        const domainMinimums = domains.y.map(domain => domain[0]);
        const domainMaximums = domains.y.map(domain => domain[1]);
        const domainsMinimum = d3.min(domainMinimums);
        const domainsMaximum = d3.max(domainMaximums);
        const magnitudeDifference = domainsMaximum / d3.min(domainMaximums);

        // Domains should be the same if:
        // - both datasets are same format and same series
        // - both datasets are same format and the magnitude difference is lower than 10x.
        const useSameDomainConditions = [
            isSameType && state.isSameDataset,
            isSameType && magnitudeDifference < 10,
            isPercent && magnitudeDifference < 10,
        ];

        if (domains.y.length >= 2 && useSameDomainConditions.some(cond => cond)) {
            domains.y = domains.y.map(() => [domainsMinimum, domainsMaximum]);
        }

        return domains;
    }

    /**
     * Retrieves the scales for our chart.
     * Those are numerical time series scales on full extent of both domains.
     */
    getScales(state) {
        const { height, width } = this.props;
        const domains = this.getDomains(state);

        return {
            x: d3.time.scale()
                .range([0, width])
                .domain(domains.x),

            y: domains.y.map(domain => d3.scale.linear()
                .range([height, 0])
                .domain(domain)
                .nice()
            ),
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
     * Adds a class on specific tick values.
     */
    highlightZero(selections) {
        selections.each(function each() {
            const axis = d3.select(this);

            const ticks = axis.selectAll('.tick text');

            ticks.each(function highlight(value, i) {
                const tickText = d3.select(this);
                const shouldHighlight = value === 0;

                if (shouldHighlight) {
                    // 1 because 0 is the axis label
                    tickText.attr('class', `zero-tick ${i !== 1 ? '-highlight' : ''}`);
                }
            });
        });
    }

    // Computes the tick alignment offset based on the maximum tick text width.
    getTickAlignmentOffset(side, maxWidth, previousMaxWidth) {
        const isLeft = side === 0;
        const margin = isLeft ? this.props.margin.left : this.props.margin.right;
        // use previous max width if there is no "new" max width.
        const max = maxWidth === 0 ? previousMaxWidth : maxWidth;
        let offset;

        if (this.isSmallFactor()) {
            offset = 0;
        } else {
            offset = (isLeft ? 1 : -1) * (max - margin);
        }

        return offset;
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
        d3.select(this.el).select('.chart').remove();
    }
}
