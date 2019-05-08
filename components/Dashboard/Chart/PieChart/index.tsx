import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { IChartData } from '..';

interface IProps {
    data: IChartData;
    showValue: boolean;
    idx?: number;
    showLimit: number;
    width: number;
    height: number;
}

const PieChart: React.SFC<IProps> = (props) => {
    const { data, showValue, idx, showLimit, width, height } = props,
        idx_str = idx != null ? idx : '',
        radius = Math.min(width, height) / 2;

    const SMALL_SIZEY = 200;
    const graphRef = useRef(null);
    const cache = useRef(data.values);
    const createPie: any = d3.pie()
        .startAngle(0)
        .endAngle(2 * Math.PI)
        .value((d: any) => d.value)
        .sort(null);
    const createArc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius - 10);
    const createLabelArc = d3
        .arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius - 10);

    useEffect(() => drawChart(), [width, height, data]);

    const drawChart = () => {
        
        if (data == null) return;
        const curData = createPie(data.values);
        const prevData = createPie(cache.current);

        const group = d3.select(graphRef.current);
        const tooltip = group.append('g');
        const groupWithData = group.selectAll("g.arc").data(curData);
        groupWithData.exit().remove();

        const groupWithUpdate = groupWithData
            .enter()
            .append("g")
            .attr("class", "arc");
        const path = groupWithUpdate
            .append("path")
            .merge(groupWithData.select("path.arc"));

        const arcTween: any = (d: any, i: any) => {
            const interpolator = d3.interpolate(prevData[i], d);
            return (t: any) => createArc(interpolator(t));
        };

        path
            .attr("class", "arc")
            .on("mouseover", (d: any) => {
                if(height > SMALL_SIZEY){
                    tooltip.attr('transform', "translate(" + createLabelArc.centroid(d) + ")").call(callout, d);
                    tooltip.raise();
                }
            })
            .on("mouseout", () => tooltip.call(callout, null))
            .attr("fill", (d: any) => d.data.color)
            .attr('stroke', '#fff')
            .transition()
            .attrTween("d", arcTween);
        if (data.values.length < showLimit && height > SMALL_SIZEY) {
            const label = groupWithUpdate
                .append("text")
                .attr('class', 'pie-label-text')
                .merge(groupWithData.select(".pie-label-text"));
            label
                .attr("text-anchor", "middle")
                .style("fill", "white")
                .style("font-size", '10pt')
                // .transition()
                .attr("transform", (d: any) => `translate(${createLabelArc.centroid(d)})`)
                .text((d: any) => d.data.label)
            if (showValue) {
                const value = groupWithUpdate
                    .append("text")
                    .attr('class', 'pie-value-text')
                    .merge(groupWithData.select(".pie-value-text"));
                value
                    .attr("transform", (d: any) => `translate(${createLabelArc.centroid(d)})`)
                    .attr('fill', "white")
                    .attr('dy', '1em')
                    .attr('font-size', '10pt')
                    .attr('text-anchor', 'middle')
                    .text((d: any) => (d.data.value));
            }
        }

        const callout = (g: any, d: any) => {
            if (!d) {
                g.selectAll("*").remove();
                return g.style('display', 'none');
            }

            g.style('display', null).style('pointer-events', 'none')

            const path = g.selectAll("path")
                .data([null])
                .join("path")
                .attr("fill", d.data.color)
                .attr("stroke", "white");

            let strText = d.data.label + '\n' + d.data.value;
            const text = g.selectAll("text")
                .data([null])
                .join("text")
                .call((text: any) => text
                    .selectAll("tspan")
                    .data((strText + "").split(/\n/))
                    .join("tspan")
                    .attr('fill', 'white')
                    .attr('text-anchor', 'start')
                    .attr("x", 0)
                    .attr("y", (d: any, i: any) => `${i * 1.1}em`)
                    .text((d: any) => d));

            const { width: tw, height: th } = text.node().getBBox();

            text.attr("transform", 'translate(10, -5)')
            path
                .attr("transform", 'translate(0,' + (0) + ')')
                .attr("d", 'M0,0l5,-5v' + (-(th - 10) / 2) + 'h' + (tw + 10) + 'v' + th + 'h' + (-(tw + 10)) + 'v' + (-(th - 10) / 2) + 'l-5,-5z')

        }
        cache.current = data.values;
    }
    return (
        <svg className={"pieChart" + idx_str} width={width} height={height}>
            {height > SMALL_SIZEY &&
                <text x={20} y={20} style={{ fontSize: '16pt' }}>{data.name}</text>
            }
            <g ref={graphRef} transform={`translate(${width / 2} ${height / 2})`} />
        </svg>
    );
}

export default PieChart;
