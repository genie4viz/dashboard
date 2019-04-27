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
        
    const graphRef = useRef(null);
    const cache = useRef(data);    
    
    const createPie: any = d3
        .pie()
        .value((d: any) => d.value)
        .sort(null);

    const createArc = d3
        .arc()
        .innerRadius(radius - 10)
        .outerRadius(0);

    useEffect(() => drawChart(), [props]);
    
    const drawChart = () => {

        if (data == null) return;
        
        const curData = createPie(data.values);
        const prevData = createPie(cache.current.values);
        
        const group = d3.select(graphRef.current);
        const groupWithData = group.selectAll("g.arc").data(curData);
        const tooltip = group.append('g');
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
            .attr("fill", (d: any, i) => d.data.color)
            .attr("stroke", 'white')
            .attr("stroke-width", 2)
            .on("mouseover", (d: any) => {
                tooltip.attr('transform', "translate(" + createArc.centroid(d) + ")").call(callout, d);
                tooltip.raise();
            })
            .on("mouseout", () => tooltip.call(callout, null))
            .transition()
            .attrTween("d", arcTween)

        if (data.values.length < showLimit) {
            const text = groupWithUpdate
                .append("text")
                .merge(groupWithData.select("text"));
            text
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")            
                .style("fill", "white")
                .style("font-size", 12)
                .transition()
                .attr("transform", (d: any) => `translate(${createArc.centroid(d)})`)
                .text((d: any) => d.data.label)
            if (showValue) {
                groupWithData.append("text")
                    .attr("transform", (d: any) => "translate(" + createArc.centroid(d)[0] + "," + (createArc.centroid(d)[1] + 15) + ")")
                    .attr('fill', "white")
                    .attr('font-size', '12pt')
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

            text.attr("transform", 'translate(0, 5)')
            path
                .attr("transform", 'translate(-10,' + (th / 2 - 10) + ')')
                .attr("d", 'M0,0l5,-5v' + (-(th - 10) / 2) + 'h' + (tw + 10) + 'v' + th + 'h' + (-(tw + 10)) + 'v' + (-(th - 10) / 2) + 'l-5,-5z')

        }
        cache.current = props.data;
    }
    return (
        <svg className={"pieChart" + idx_str} width={width} height={height}>
            <text x={20} y={20} style={{fontSize: '16pt'}}>{data.name}</text>
            <g ref={graphRef} transform={`translate(${width/2} ${height/2})`}/>
        </svg>
    );
}

export default PieChart;
