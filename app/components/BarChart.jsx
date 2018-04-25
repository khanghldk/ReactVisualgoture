import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

class BarChart extends Component {
    constructor(props) {
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }
    componentDidMount() {
        this.createBarChart()
    }
    componentDidUpdate() {
        this.createBarChart()
    }

    createBarChart() {

        var dataX = this.props.dataX;


        var dataY = this.props.dataY;


        const width = 30;
        const node = this.node;
        const dataMax = max(this.props.dataY) + 2;
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.size[1]]);

        const ySize = this.props.size[1];

        var translate = (d, i, ySize) => {
            return 'translate(' + ((dataX[i]) * width + 100) + ", " + (ySize - yScale(d)) + ')';
        }

        select(node)
            .selectAll('rect')
            .data(this.props.dataY)
            .enter()
            .append('rect');
            // .attr("transform", (d, i) => translate(d, i, ySize));

        select(node)
            .selectAll('rect')
            .data(this.props.dataY)
            .exit()
            .remove()

        var gap = 5;

        select(node)
            .selectAll('rect')
            .data(this.props.dataY)
            .style('fill', '#fe9922')
            .transition()
            .duration(1000)
            // .attr('x', (d, i) => (2*dataX[i]-i) * width)
            // .attr('y', (d, i) => {
            //     return ySize - yScale(dataY[i]);
            // })
            .attr('height', (d, i) => yScale(dataY[i]))
            .attr('width', width - gap)
            .attr("transform", (d, i) => translate(d, i, ySize))
            .attr('dataY', (d) => d)
            .attr('dataX', (d, i) => dataX[i]);
    }
    render() {
        return <svg ref={node => this.node = node}
            width={1000} height={500}>
        </svg>
    }
}
export default BarChart