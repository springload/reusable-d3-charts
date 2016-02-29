import d3 from 'd3';
import Chart from './Chart';

const dates = [new Date('2001'), new Date('2002'), new Date('2003'), new Date('2004'), new Date('2005'), new Date('2006'), new Date('2007'), new Date('2008'), new Date('2009'), new Date('2010'), new Date('2011'), new Date('2012'), new Date('2013'), new Date('2014'), new Date('2015'), new Date('2016')];

export default class LineChart extends Chart {

    create() {
        const { height } = this.props;
        const svg = this.createRoot();

        // svg.append('g')
        //     .attr('class', 'grid')
        //     .attr('transform', 'translate(0,' + height + ')');

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')');

        svg.append('g')
            .attr('class', 'y axis');

        svg.append('g')
            .attr('class', 'lines');
    }

    getAxis(state, scales) {
        const x = d3.svg.axis()
            .scale(scales.x)
            .orient('bottom')
            .tickFormat(d3.time.format('%Y'))
            .outerTickSize(0);

        const y = d3.svg.axis()
            .scale(scales.y)
            .orient('left')
            .outerTickSize(0);

        return {
            x: x,
            y: y,
        };
    }

    update(state) {
        const scales = this.getScales(state);

        this.drawAxis(state, scales);
        this.drawLines(state, scales);
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

    drawLines(state, scales) {
        const svg = d3.select(this.el);

        const d3Line = d3.svg.line()
            .x((d, i) => scales.x(dates[i]))
            .y(d => scales.y(d));

        const lines = svg.selectAll('.lines');
        const line = lines.selectAll('.line')
            .data(state.data);

        line.enter().append('path')
            .attr('class', 'line')
            .style('stroke-width', 2);

        line.transition()
            .attr('d', d3Line);

        line.exit()
            .remove();
    }
}
