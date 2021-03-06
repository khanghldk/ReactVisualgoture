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

        var gap = 5;

        if (type === 2) {
            ySize = (ySize-10) / 2;
        }

        var yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, ySize]);

        var translate = (d) => {
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

        var text_y = function (d) {
            var barHeight = yScale(d.value);
            if (barHeight < 32) return -15;
            return barHeight - 15;
        }

        var translateText = (d) => {
            const barHeight = ySize - 20;
            const barHeight2 = ySize * 2 + gapBetweenPrimaryAndSecondaryRows - 20;
            const mid = 15;

            if (d.secondaryPositionStatus == POSITION_USE_PRIMARY)
                return 'translate(' + (d.position * width + mid) + ", " + barHeight + ')';
            else if (d.secondaryPositionStatus == POSITION_USE_SECONDARY_IN_DEFAULT_POSITION)
                return 'translate(' + (d.position * width + mid) + ", " + barHeight2 + ')';
            else if (d.secondaryPositionStatus >= 0)
                return 'translate(' + (d.secondaryPositionStatus * width + mid) + ", " + barHeight + ')';
            else if (d.secondaryPositionStatus < 0)
                return 'translate(' + ((d.secondaryPositionStatus * -1 - 1) * width + mid) + ", " + barHeight + ')';
            else
                return 'translation(0, 0)';
        }

        select(node)
            .selectAll('rect')
            .data(entry)
            .enter()
            .append('rect');

        select(node)
            .selectAll('text')
            .data(entry)
            .enter()
            .append('text')
            .attr("dy", ".35em")
            .text(function (d) {
                return d.value;
            });


        select(node)
            .selectAll('rect')
            .data(entry)
            .exit()
            .remove();

        select(node)
            .selectAll('text')
            .data(entry)
            .exit()
            .remove();

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

            select(node)
                .selectAll('text')
                .data(entry)
                .transition()
                .duration(500)
                .text(function (d) {
                    return d.value;
                })
                .attr("transform", (d) => translateText(d));

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