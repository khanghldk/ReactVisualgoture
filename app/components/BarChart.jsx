import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';

class BarChart extends Component {
    constructor(props) {
        super(props)
        this.createBars = this.createBars.bind(this)
    }
    componentDidMount() {
        this.createBars()
    }
    componentDidUpdate() {
        this.createBars()
    }

    createBars = () => {

        var POSITION_USE_PRIMARY = "a";
        var POSITION_USE_SECONDARY_IN_DEFAULT_POSITION = "b";

        var gapBetweenPrimaryAndSecondaryRows = 10;

        var entry = this.props.entry;
        // console.log(entry.length);

        const width = 50;
        const node = this.node;
        const dataMax = max(entry, function (d) {
            return d.value;
        });

        var ySize = this.props.size[1];

        const type = this.props.type;

        if (type === 2) {
            ySize = ySize/2;
        }

        var yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, ySize]);

        var translate = (d) => {
            // return 'translate(' + (d.position * width + 100) + ", " + (ySize - yScale(d.value)) + ')';
            if (d.secondaryPositionStatus == POSITION_USE_PRIMARY)
                return 'translate(' + (d.position * width) + ", " + (ySize - yScale(d.value)) + ')';
            else if (d.secondaryPositionStatus == POSITION_USE_SECONDARY_IN_DEFAULT_POSITION)
                return 'translate(' + (d.position * width) + ", " + (ySize * 2 + gapBetweenPrimaryAndSecondaryRows - yScale(d.value)) + ')';
            else if (d.secondaryPositionStatus >= 0)
                return 'translate(' + (d.secondaryPositionStatus * width) + ", " + (ySize * 2 + gapBetweenPrimaryAndSecondaryRows - yScale(d.value)) + ')';
            else if (d.secondaryPositionStatus < 0)
                return 'translate(' + ((d.secondaryPositionStatus * -1 - 1) * width) + ", " + (ySize * 2 + gapBetweenPrimaryAndSecondaryRows - yScale(d.value)) + ')';
            else
                return 'translation(0, 0)';
        }

        select(node)
            .selectAll('rect')
            .data(entry)
            .enter()
            .append('rect');


        select(node)
            .selectAll('rect')
            .data(entry)
            .exit()
            .remove()

        var gap = 5;

        try {
            select(node)
                .selectAll('rect')
                .data(entry)
                .style('fill', function (d) {
                    return d.highlight;
                })
                .transition()
                .duration(500)
                .attr('height', (d) => yScale(d.value))
                .attr('width', width - gap)
                .attr("transform", (d) => translate(d));

        } catch (error) {
            console.log(error);
        }


    }

    render() {
        return <svg ref={node => this.node = node}
            width={700} height={400}>
        </svg>
    }
}
export default BarChart