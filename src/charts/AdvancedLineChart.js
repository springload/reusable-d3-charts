import d3 from 'd3';

import { MINIMUM_CHART_MARGIN } from '../config/interface';
import { SITE_URL } from '../config/values';
// import { getCurrentURL } from '../router/links';
import AdvancedChart from '../charts/AdvancedChart';

const getCurrentURL = () => global.location.href;

/**
 * The main chart type of the app.
 * Used for both the visible and downloadable charts.
 * Used for both the comparison and breakdown charts.
 */
export default class LineChart extends AdvancedChart {
    constructor(el, props) {
        super(el, props);
        const { width, isBreakdownChart, isDownloadChart, state } = props;

        this.el = el;
        this.props = {
            keyItemHeight: 30,
            keyLineLength: 96,
            keyLabelWidth: 0,
            keySpacing: 10,
            borderSize: isDownloadChart ? 40 : 0,
            headerHeight: 0,
            footerHeight: isDownloadChart ? 50 : 0,
            margin: {
                top: 30,
                bottom: 30,
                right: (isBreakdownChart ? MINIMUM_CHART_MARGIN : 60),
                left: 60,
            },
            padding: {
                top: 10,
                bottom: 10,
                right: 0,
                left: 0,
            },
            orient: {
                x: 'bottom',
                y: ['left', 'right'],
            },
            nbTicks: {},
            isBreakdownChart: isBreakdownChart,
            isDownloadChart: isDownloadChart,
        };

        // Do not rely on the state at this stage. This is only meant for
        // downloadable charts.
        if (state && isDownloadChart) {
            if (isBreakdownChart) {
                this.props.headerHeight += Math.max(60, state.data.length * this.props.keyItemHeight + 30);
                this.props.keyLabelWidth = Math.round(d3.max(state.labels.axis.map(l => l.length)) * 7);
            } else {
                this.props.headerHeight += state.data.length * 60;
            }
        }

        const isSmallFactor = this.isSmallFactor();

        if (isSmallFactor) {
            this.props.margin.top += isBreakdownChart ? 0 : 15;
            this.props.margin.left = MINIMUM_CHART_MARGIN;
            this.props.margin.right = MINIMUM_CHART_MARGIN;

            this.props.orient.y = ['right', 'left'];
        }

        this.setSize(width);

        const xTickSize = 50;
        const yTickSize = 25;
        const yTickNumberMax = isSmallFactor ? 6 : 8;
        const yTickNumber = Math.min(Math.floor(this.props.height / yTickSize), yTickNumberMax);

        this.props.nbTicks.x = Math.floor(this.props.width / xTickSize);
        this.props.nbTicks.y = [yTickNumber, yTickNumber];
    }

    /**
     * Lay out the overall structure of the chart rendering.
     */
    create() {
        // createRoot can change the size properties of the chart. It needs to be done before those assignments.
        const svg = this.createRoot();
        const isSmallFactor = this.isSmallFactor();
        const { width, height, margin, padding, headerHeight, isDownloadChart } = this.props;

        // if (isDownloadChart) {
        //     this.createDownloadHeader(svg);
        // }

        const contentbox = svg.append('g')
            .attr('class', 'chart-contentbox')
            .attr('transform', `translate(0, ${headerHeight + margin.top + padding.top})`);

        contentbox.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${height + padding.bottom})`);

        contentbox.append('g')
            .attr('class', 'notable-ticks -num-0');

        contentbox.append('g')
            .attr('class', 'notable-ticks -num-1');

        contentbox.append('g')
            .attr('class', 'holes');

        contentbox.append('g')
            .attr('class', 'orphans');

        contentbox.append('g')
            .attr('class', 'lines');

        contentbox.append('g')
            .attr('class', 'line-overlays');

        const firstYAxis = contentbox.append('g')
            .attr('class', 'y axis -num-0');

        firstYAxis.append('text')
            .attr('class', 'axis-label -top')
            .attr('x', -margin.left)
            .attr('y', -margin.top - padding.top + (isSmallFactor ? 30 : 15))
            .style('text-anchor', 'start')
            .text('');

        // firstYAxis.append('text')
        //     .attr('class', 'axis-label -rotated')
        //     // Label is rotated so x and y are inverted.
        //     .attr('x', -1 * (height / 2))
        //     .attr('y', 1 * (-margin.left - 10))
        //     .style('text-anchor', 'middle')
        //     .text('');

        const secondYAxis = contentbox.append('g')
            .attr('class', 'y axis -num-1')
            .attr('transform', `translate(${width}, 0)`);

        secondYAxis.append('text')
            .attr('class', 'axis-label -top')
            .attr('x', margin.right)
            .attr('y', -margin.top - padding.top + 15)
            .style('text-anchor', 'end')
            .text('');

        secondYAxis.append('text')
            .attr('class', 'axis-label -rotated')
            // For extra confusion, the rotation inverts the signs here.
            .attr('x', 1 * (height / 2))
            .attr('y', -1 * (margin.right + 10))
            .style('text-anchor', 'middle')
            .text('');

        if (isDownloadChart) {
            this.createDownloadFooter(svg);
        }
    }

    createDownloadHeader(svg) {
        const { margin, isBreakdownChart } = this.props;

        const header = svg.append('g')
            .attr('class', 'chart-header')
            .attr('transform', `translate(${-margin.left}, 0)`);

        const firstLabel = header.append('a')
            .attr('xlink:href', getCurrentURL())
        .append('g')
            .attr('class', 'chart-label -num-0');

        firstLabel.append('text')
            .attr('class', 'label-subtitle')
            .text('');

        firstLabel.append('text')
            .attr('class', 'label-title')
            .attr('transform', `translate(0, ${25})`)
            .text('');

        const secondLabel = header.append('a')
            .attr('xlink:href', getCurrentURL())
        .append('g')
            .attr('class', 'chart-label -num-1')
            .attr('transform', `translate(0, ${25 + 50})`);

        secondLabel.append('text')
            .attr('class', 'label-subtitle')
            .text('');

        secondLabel.append('text')
            .attr('class', 'label-title')
            .attr('transform', `translate(0, ${25})`)
            .text('');

        if (isBreakdownChart) {
            header.append('g')
                .attr('class', 'chart-key')
                .attr('transform', `translate(0, ${50})`);
        }
    }

    createDownloadFooter(svg) {
        const { height, margin, padding, headerHeight, borderSize } = this.props;
        // const footerWidth = width + margin.left + margin.right;

        const footer = svg.append('g')
            .attr('class', 'chart-footer')
            .attr('transform', `translate(${-margin.left}, ${height + headerHeight + margin.top + margin.bottom + padding.top + padding.bottom})`);

        const credits = footer.append('g')
            .attr('class', 'chart-credits')
            .attr('transform', `translate(0, ${borderSize})`);

        credits.append('a')
            .attr('xlink:href', SITE_URL)
        .append('use')
            .attr('x', 0)
            .attr('y', - 58 / 2 - 2)
            .attr('xlink:href', '#embedded-logo-nasa');

        credits.append('a')
            .attr('xlink:href', 'http://climate.nasa.gov/')
        .append('text')
            .attr('x', 72 + 10)
            .attr('y', 7)
            .text('Source: climate.nasa.gov');

        // const LOGO_WIDTH = 72;
        // const LOGO_HEIGHT = 49;
        // const logoX = footerWidth - LOGO_WIDTH + 5;

        // credits.append('text')
        //     .attr('x', logoX)
        //     .attr('y', 7)
        //     .attr('text-anchor', 'end')
        //     .text('Source:');

        // credits.append('a')
        //     .attr('xlink:href', 'http://climate.nasa.gov/')
        // .append('use')
        //     .attr('x', logoX)
        //     .attr('y', - LOGO_HEIGHT / 2)
        //     .attr('title', 'NASA')
        //     .attr('xlink:href', '#embedded-logo-nasa');
    }

    getAxis(state, scales) {
        const { orient, nbTicks, isBreakdownChart } = this.props;

        const yAxis = scales.y.map((scale, i) => d3.svg.axis()
            .scale(scale)
            .orient(orient.y[i])
            .ticks(nbTicks.y[i])
            .tickFormat(state.format[i])
            .tickSize(0)
            .tickPadding(0)
            .outerTickSize(0));

        return {
            x: d3.svg.axis()
                .scale(scales.x)
                .orient(orient.x)
                .ticks(nbTicks.x)
                .tickFormat(d3.time.format('%Y'))
                .tickSize(0)
                .tickPadding(15),

            y: isBreakdownChart ? yAxis.slice(0, 1) : yAxis,
        };
    }

    update(state) {
        const { isDownloadChart } = this.props;
        const scales = this.getScales(state);
        const axis = this.getAxis(state, scales);

        this.drawAxisLabels(state, axis);

        if (isDownloadChart) {
            // this.drawHeader(state, axis);
            // this.drawKey(state);
        }

        this.drawAxis(state, axis);
        this.drawNotableTicks(scales, axis);
        // this.drawHoles(state, scales);
        // this.drawOrphans(state, scales);
        this.drawLines(state, scales);
        // this.drawLineOverlays(state, scales);
    }

    drawHeader(state, axis) {
        const svg = d3.select(this.el);

        if (axis.y.length === 1) {
            svg.select('.chart-label.-num-1 .label-subtitle')
                .text('');
            svg.select('.chart-label.-num-1 .label-title')
                .text('');
        }

        axis.y.forEach((yAxis, i) => {
            const label = svg.select(`.chart-label.-num-${i}`);

            label.select('.label-subtitle')
                .text(`${state.labels.aliases[i]} ${state.labels.datasets[i]}`);

            label.select('.label-title')
                .text(state.labels.values[i]);
        });
    }

    drawKey(state) {
        const { keyItemHeight, keyLineLength, keySpacing } = this.props;
        const svg = d3.select(this.el);

        const chartKey = svg.select('.chart-key');

        chartKey.empty();

        state.labels.values.forEach((axisLabel, i) => {
            const key = chartKey.append('g')
                .attr('class', 'keyline')
                .attr('transform', `translate(0, ${i * keyItemHeight})`);

            key.append('path')
                .attr('class', `line -num-${i}`)
                .attr('d', `M1 1 L${keyLineLength} 1`);

            key.append('text')
                .attr('class', 'key-label')
                .attr('text-anchor', 'start')
                .attr('x', keyLineLength + keySpacing)
                .attr('y', 6)
                .text(axisLabel);
        });
    }

    /**
     * Labels at the top of the Y axis.
     */
    drawAxisLabels(state, axis) {
        const { isBreakdownChart } = this.props;
        const svg = d3.select(this.el);

        if (axis.y.length === 1) {
            svg.selectAll('.axis.y.-num-1 .axis-label')
                .text('');
        }

        axis.y.forEach((yAxis, i) => {
            const hasData = state.data[i].length > 0;
            const label = isBreakdownChart ? state.labels.axisAll : state.labels.axis[i];

            svg.selectAll(`.axis.y.-num-${i} .axis-label`)
                .text(hasData ? label : '');
        });
    }

    /**
     * X and Y axis of the chart.
     */
    drawAxis(state, axis) {
        const svg = d3.select(this.el);

        svg.select('.axis.x')
            .transition()
            .call(axis.x);

        if (axis.y.length === 1) {
            svg.selectAll('.axis.y.-num-1 .tick')
                .remove();
        }

        axis.y.forEach((yAxis, i) => {
            const hasData = state.data[i].length > 0;
            let maxTickWidth = 0;
            let previousMaxTickWidth = 0;

            // Hack to figure out which ticks are part of the previous rendering,
            // as there is no .enter / .exit selections for axis ticks.
            svg.selectAll(`.axis.y.-num-${i} .tick text`)
                .attr('data-is-previous', true);

            svg.select(`.axis.y.-num-${i}`)
                .transition()
                .attr('class', `axis y -num-${i}`)
                .call(yAxis)
                .call(this.highlightZero)
            .selectAll('.tick text')
                .each(function alignTickText() {
                    const isPrevious = !!this.getAttribute('data-is-previous');
                    const width = this.clientWidth === 0 ? 50 : this.clientWidth;

                    if (isPrevious) {
                        previousMaxTickWidth = Math.max(previousMaxTickWidth, width);
                    } else {
                        maxTickWidth = Math.max(maxTickWidth, width);
                    }
                })
                .attr('x', this.getTickAlignmentOffset.bind(this, i, maxTickWidth, previousMaxTickWidth));

            if (!hasData) {
                svg.selectAll(`.axis.y.-num-${i} .tick`)
                    .remove();
            }
        });
    }

    /**
     * Highlighted axis ticks (0 mark).
     */
    drawNotableTicks(scales, axis) {
        const { width } = this.props;
        const svg = d3.select(this.el);

        const lowest = scales.y.map(scale => scale.domain()[0]);

        if (axis.y.length === 1) {
            svg.selectAll('.notable-ticks.-num-1 .tick')
                .remove();
        }

        axis.y.forEach((yAxis, i) => {
            // Add a mark for zero if it is not the lowest value.
            const marks = lowest[i] !== 0 ? [0] : [];

            const notableAxis = yAxis
                .orient(i === 0 ? 'left' : 'right')
                .tickSize(i === 0 ? -width : width, 0, 0)
                .tickValues(marks)
                .tickFormat('');

            svg.select(`.notable-ticks.-num-${i}`)
                .transition()
                .call(notableAxis);
        });
    }

    /**
     * Holes in the time series.
     */
    drawHoles(state, scales) {
        const svg = d3.select(this.el);

        const holes = svg.selectAll('.holes');

        this.removePrevious(holes, '.hole', state.data.length);

        state.data.forEach((data, i) => {
            // The line needs to be drawn on orphans, holes, starts and ends.
            const svgPath = d3.svg.line()
                .defined(d => d.isOrphan || d.isHole || d.isHoleStart || d.isHoleEnd)
                .x(d => scales.x(d.date))
                .y(d => scales.y[i](d.value));

            const hole = holes.selectAll(`.hole.-num-${i}`)
                .data([data]);

            hole.enter().append('path')
                .attr('class', `hole -num-${i}`);

            hole.transition()
                .attr('d', svgPath);

            hole.exit()
                .remove();
        });
    }

    /**
     * Orphans in the time series (single points)
     */
    drawOrphans(state, scales) {
        const svg = d3.select(this.el);

        const orphans = svg.selectAll('.orphans');

        this.removePrevious(orphans, '.orphan', state.data.length);

        state.data.forEach((data, i) => {
            const svgPath = d3.svg.line()
                .defined(d => d.isOrphan)
                .x(d => scales.x(d.date))
                .y(d => scales.y[i](d.value));

            const orphan = orphans.selectAll(`.orphan.-num-${i}`)
                .data([data]);

            orphan.enter().append('path')
                .attr('class', `orphan -num-${i}`);

            orphan.transition()
                .attr('d', svgPath);

            orphan.exit()
                .remove();
        });
    }

    /**
     * Lines representing the time series.
     */
    drawLines(state, scales) {
        const svg = d3.select(this.el);

        const lines = svg.selectAll('.lines');

        this.removePrevious(lines, '.line', state.data.length);

        state.data.forEach((data, i) => {
            const svgPath = d3.svg.line()
                // .defined(d => !d.isHole)
                .x(d => scales.x(d.date))
                .y(d => scales.y[i](d.value));

            const line = lines.selectAll(`.line.-num-${i}`)
                .data([data]);

            line.enter().append('path')
                .attr('class', `line -num-${i}`);

            line.transition()
                .attr('d', svgPath);

            line.exit()
                .remove();
        });
    }

    /**
     * Overlays on the lines to facilitate interaction (invisible).
     */
    drawLineOverlays(state, scales) {
        const svg = d3.select(this.el);

        const lines = svg.selectAll('.line-overlays');

        this.removePrevious(lines, '.line-overlay', state.data.length);

        state.data.forEach((data, i) => {
            const svgPath = d3.svg.line()
                .x(d => scales.x(d.date))
                .y(d => scales.y[i](d.value));

            const line = lines.selectAll(`.line-overlay.-num-${i}`)
                .data([data]);

            line.enter().append('path')
                .attr('class', `line-overlay -num-${i}`)
            .append('title');

            line.transition()
                .attr('d', svgPath);

            line.select('title')
                .text(state.labels.axis[i]);

            line.exit()
                .remove();
        });
    }

    removePrevious(container, selector, cutoff) {
        const nbOld = container.selectAll(selector).size();

        if (nbOld - cutoff > 0) {
            container.selectAll(`${selector}:nth-child(n+${cutoff + 1})`)
                .remove();
        }
    }
}
