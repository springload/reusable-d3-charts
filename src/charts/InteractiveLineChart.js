import d3 from 'd3';
import BasicChart from './BasicChart';

export default class LineChart extends BasicChart {

    constructor(el, props) {
        super(el, props);

        this.props.margin = {
            top: 20,
            right: 10,
            bottom: 50,
            left: 40,
        };

        this.props.width = props.width - this.props.margin.left - this.props.margin.right;
        this.props.height = props.width / (3 / 2) - this.props.margin.top - this.props.margin.bottom;
    }

    create() {
        const { height } = this.props;
        const svg = this.createRoot();

        svg.append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0, ${height})`);

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${height})`);

        svg.append('g')
            .attr('class', 'y axis');

        svg.append('g')
            .attr('class', 'notable-ticks');

        svg.append('g')
            .attr('class', 'lines');

        svg.append('g')
            .attr('class', 'cursor-line')
            .attr('transform', `translate(0, ${height})`);

        svg.append('g')
            .attr('class', 'cursors');

        svg.append('g')
            .attr('class', 'interaction ticks-overlay')
            .attr('transform', `translate(0, ${height})`);

        svg.append('g')
            .attr('class', 'interaction line-overlay');
    }

    getAxis(state, scales) {
        const { width } = this.props;

        const xAxisDistanceThreshold = 30;
        const xAxisTickNumberThreshold = Math.floor(width / xAxisDistanceThreshold);

        let xAxisTickValues;

        // Dynamic tickValues depending on available space.
        if (state.data[0].length < xAxisTickNumberThreshold) {
            xAxisTickValues = state.data.map(d => d.date);
        } else {
            xAxisTickValues = null;
        }

        const x = d3.svg.axis()
            .scale(scales.x)
            .orient('bottom')
            .tickValues(xAxisTickValues)
            .tickFormat(d3.time.format('%b %Y'))
            .outerTickSize(0);

        const y = d3.svg.axis()
            .scale(scales.y)
            .orient('left')
            .tickFormat(state.formatFunction)
            .outerTickSize(0);

        return {
            x: x,
            y: y,
        };
    }

    update(state) {
        const scales = this.getScales(state);

        this.drawAxis(state, scales);
        this.drawGrid(state, scales);
        this.drawNotableTicks(state, scales);
        this.drawLines(state, scales);
        this.drawCursorLine(state, scales);
        this.drawCursor(state, scales);
        this.drawLineOverlay(state, scales);
        this.drawTicksOverlay(state, scales);
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

    drawGrid(state, scales) {
        const { height } = this.props;
        const svg = d3.select(this.el);
        const axis = this.getAxis(state, scales);

        svg.select('.grid')
            .transition()
            .call(axis.x.tickSize(-height, 0, 0).tickFormat(''));
    }

    drawNotableTicks(state, scales) {
        const { width } = this.props;
        const svg = d3.select(this.el);
        const axis = this.getAxis(state, scales);

        const notableAxis = axis.y
            .tickSize(-width, 0, 0)
            .tickValues([0])
            .tickFormat('');

        svg.select('.notable-ticks')
            .transition()
            .call(notableAxis);
    }

    drawLines(state, scales) {
        const svg = d3.select(this.el);

        const strokeWidth = state.data[0].length > 200 ? 1 : 3;

        const d3Line = d3.svg.line()
            .interpolate('step')
            .x(d => scales.x(d.date))
            .y(d => scales.y(d.value));

        const lines = svg.selectAll('.lines');
        const line = lines.selectAll('.line')
            .data([state.data]);

        line.enter().append('path')
            .attr('class', 'line');

        line.transition()
            .style('stroke-width', strokeWidth)
            .attr('d', d3Line);

        line.exit()
            .remove();
    }

    drawCursorLine(state, scales) {
        const { height } = this.props;
        const svg = d3.select(this.el);

        const axis = d3.svg.axis()
            .scale(scales.x)
            .orient('bottom')
            .tickValues([state.data[state.active].date])
            .tickSize(-height, 0, 0)
            .tickFormat('');

        svg.select('.cursor-line')
            .transition()
            .call(axis);
    }

    drawCursor(state, scales) {
        const svg = d3.select(this.el);

        const cursors = svg.selectAll('.cursors');
        const cursor = cursors.selectAll('.cursor')
            .data([state.data[state.active]]);

        const symbol = d3.svg.symbol()
            .type(() => 'triangle-up')
            .size(() => 50);

        cursor.enter().append('path');

        cursor.attr('class', 'cursor')
            .attr('transform', d => `translate(${scales.x(d.date)},${scales.y(d.value)})`)
            .attr('d', symbol);

        cursor.exit()
            .remove();
    }

    drawLineOverlay(state, scales) {
        const svg = d3.select(this.el);
        const x1 = scales.x(state.data[0].date);
        const x2 = scales.x(state.data[1].date);
        const strokeWidth = Math.min(x1 - x2, 100);

        const d3Line = d3.svg.line()
            .x(d => scales.x(d.date))
            .y(d => scales.y(d.value));

        const interactionData = state.data.reduce((acc, cur) => {
            acc.push([cur, cur]);

            return acc;
        }, []);

        const lineOverlay = svg.selectAll('.line-overlay');
        const line = lineOverlay.selectAll('.interact')
            .data(interactionData);

        line.enter().append('path')
            .attr('class', 'interact');

        line.transition()
            .attr('stroke-width', strokeWidth)
            .attr('d', d3Line);

        line.exit()
            .remove();
    }

    drawTicksOverlay(state, scales) {
        const { height } = this.props;
        const svg = d3.select(this.el);
        const axis = this.getAxis(state, scales);
        const x1 = scales.x(state.data[0].date);
        const x2 = scales.x(state.data[1].date);
        const strokeWidth = Math.floor(x1 - x2);

        const tickOverlay = svg.select('.ticks-overlay');

        tickOverlay.transition()
            .call(axis.x
                .tickSize(-height, 0, 0)
                .tickValues(state.data.map(d => d.date))
                .tickFormat('')
            );

        tickOverlay.selectAll('.tick')
            .attr('stroke-width', strokeWidth)
            .on('click', this.onTickInteraction.bind(this));
    }

    onTickInteraction(_, index) {
        this.dispatch.navigation(index);
    }
}
