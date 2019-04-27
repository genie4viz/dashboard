import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { IChartData } from '..';

interface IProps {
    data: IChartData;
    isCountChart?: boolean;
    idx?: number;
    showLimit: number;
    width: number;
    height: number;
}
const LineChart: React.SFC<IProps> = (props) => {
    const { data, isCountChart, idx, showLimit, width, height } = props;

    const idx_str = idx != null ? idx : '';
    const svgRef = useRef(null);

    var dimens = {
        width: width,
        height: height
    }

    useEffect(() => drawChart(), [dimens, data]);


    const drawChart = () => {
        if (data == null) return;

        d3.select(svgRef.current).selectAll("*").remove();

        let c_data: any;
        if (isCountChart) {
            c_data = d3.nest()
                .key((d: any) => d.value)
                .rollup((v: any) => v.length)
                .entries(data.values);
            c_data.map((d: any) => {
                d.label = d.key;
                return d;
            });
        } else {
            c_data = data.values;
        }
        let margins = getMargins(c_data),
            rw = width - margins.right - margins.left,
            rh = height - margins.top - margins.bottom;
        let min: number = 0,// d3.min
            max: any = d3.max(c_data, (d: any) => d.value);

        let x: any = d3
            .scaleBand()
            .range([0, rw])
            .domain(c_data.map((d: any, i: any) => d.label + i))
            .padding(0.3),
            y = d3
                .scaleLinear()
                .domain([min, max])
                .rangeRound([rh, 0]),
            xAxis = d3
                .axisBottom(x)
                .tickSize(-rh),
            yAxis = d3
                .axisLeft(y)
                .tickSize(-rw)
                .ticks(5);

        let graphArea = d3.select(svgRef.current)
            .append("g").attr('class', 'graphArea')
            .attr('transform', "translate(" + (margins.left) + "," + (margins.top) + ")")

        let xArea = graphArea.append('g').attr('class', 'xArea')
            .attr('transform', "translate(0," + rh + ")")
        let step = Math.floor(c_data.length / showLimit);
        xArea
            .attr('class', 'x axis')
            .call(xAxis)
            .selectAll('text')
            .attr('class', (d, i) => 'line-x-text' + d + i)
            .text((d: any, i) => d.substr(0, d.length - i.toString().length))
            .attr('opacity', (d: any, i) =>  i % step == 0 ? 1 : 0)
            .style("font", "300 10px Arial")
            .attr('text-anchor', 'end')
            .attr('dy', '0.1em')
            .attr('dx', '-0.2em')
            .attr('transform', 'rotate(-90)');
        xArea
            .selectAll('path')
            .attr('opacity', 0)

        let yArea = graphArea.append('g').attr('class', 'yArea')
        yArea
            .attr('class', 'y axis')
            .call(yAxis)
            .selectAll('text')
            .style("font", "300 10px Arial")
            .select('.domain')
            .remove();
        yArea
            .selectAll('path')
            .attr('opacity', 0)
        graphArea
            .selectAll('.tick line')
            .attr('stroke', '#ccc');

        let valueline: any = d3.line()
            .x((d: any, i) => x(d.label + i) + x.bandwidth() / 2)
            .y((d: any) => y(0))
            .curve(d3.curveMonotoneX)

        graphArea
            .append("g")
            .attr('class', 'lineGraph')
            .append("path")
            .data([c_data])
            .attr("class", "line" + idx_str)
            .attr("fill", "none")
            .attr("stroke", 'steelblue')
            .attr("stroke-width", 2)
            .attr("d", valueline);

        valueline = d3.line()
            .x((d: any, i) => x(d.label + i) + x.bandwidth() / 2)
            .y((d: any) => y(d.value))
            .curve(d3.curveMonotoneX)

        graphArea
            .selectAll('.line' + idx_str)
            .transition().duration(1000)
            .attr("d", valueline);

        const tooltip = graphArea.append('g');

        graphArea
            .append("g")
            .attr('class', 'dot-group')
            .selectAll(".dot")
            .data(c_data)
            .enter().append("circle")
            .attr("class", (d, i) => "dot" + idx_str + i)
            .attr("fill", 'steelblue')
            .attr("cursor", "pointer")
            .attr("cx", (d: any, i) => x(d.label + i) + x.bandwidth() / 2)
            .attr("cy", y(0))
            .attr("r", 3)
            .attr("opacity", 0.5)
            .on("mouseover", (d: any, i) => {
                d3.select('.dot' + idx_str + i).attr('r', 5);
                tooltip.attr('transform', 'translate(' + (x(d.label + i) + x.bandwidth() / 2) + ',' + y(d.value) + ')').call(callout, d, i);                
                graphArea.select('.line-x-text' + d.label + i + i).attr('opacity', 1);
                tooltip.raise();
            })
            .on("mouseout", (d: any, i) => {
                d3.select('.dot' + idx_str + i).attr('r', 3);
                if(i % step != 0)
                    graphArea.select('.line-x-text' + d.label + i + i).attr('opacity', 0);
                tooltip.call(callout, null);
            })
        graphArea
            .selectAll('circle')
            .transition().duration(1000)
            .attr("cy", (d: any) => y(d.value));

        d3.select(svgRef.current)
            .append("text")
            .attr("x", margins.left)
            .attr("y", margins.top)
            .attr('dy', '-0.5em')
            .attr('font-size', '16pt')
            .attr('fill', 'black')
            .style("text-anchor", "start")
            .text(data.name)

        d3.select(svgRef.current).append("text")
            .attr("x", margins.left + width / 2)
            .attr("y", height)
            .attr('font-size', '12pt')
            .attr('fill', 'black')
            .style("text-anchor", "end")
            .text(data.XAxis)

        d3.select(svgRef.current).append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", 15)
            .attr("dy", ".71em")
            .attr('font-size', '12pt')
            .attr('fill', 'black')
            .style("text-anchor", "middle")
            .text(data.YAxis)

        const callout = (g: any, d: any, idx: any) => {
            if (!d) {
                g.selectAll("*").remove();
                return g.style('display', 'none');
            }

            g.style('display', null).style('pointer-events', 'none')

            const path = g.selectAll("path")
                .data([null])
                .join("path")
                .attr("fill", 'steelblue')
                .attr("stroke", "white");

            let strText = '(' + d.label + ':' + d.value + ')';

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
            let curX = margins.left + x(d.label + idx) + x.bandwidth();
            if ((curX + tw) > width - margins.right) {
                text.attr("transform", 'translate(' + (- tw - 10) + ',0)')
                    .attr('dy', '0.3em')
                path
                    .attr("transform", 'translate(0,0)')
                    .attr("d", 'M0,0l-5,-5v' + (-(th - 10) / 2) + 'h' + (-tw - 10) + 'v' + th + 'h' + (tw + 10) + 'v' + (-(th - 10) / 2) + 'l5,-5z')
            } else {
                text.attr("transform", 'translate(10,0)').attr('dy', '0.3em')
                path.attr("d", 'M0,0l5,-5v' + (-(th - 10) / 2) + 'h' + (tw + 10) + 'v' + th + 'h' + (-(tw + 10)) + 'v' + (-(th - 10) / 2) + 'l-5,-5z')
            }
        }
    }
    const getMargins = (data: any) => {
        let x_max_len = d3.max(data, (d: any) => d.label.length);
        let x_max_el = data.filter((d: any) => d.label.length == x_max_len)[0];
        let y_max_len = d3.max(data, (d: any) => (d.value).toString().length);
        let y_max_el = data.filter((d: any) => (d.value).toString().length == y_max_len)[0];

        d3.select(svgRef.current)
            .append('text')
            .attr('class', 'measure_x')
            .style("font", "300 10px Arial")
            .text(x_max_el.label)
            .attr('opacity', 1);
        d3.select(svgRef.current)
            .append('text')
            .attr('class', 'measure_y')
            .style("font", "300 10px Arial")
            .text(y_max_el.value + "__")
            .attr('opacity', 1);

        let xbox = d3.select(svgRef.current).select('.measure_x').node().getBBox();
        let ybox = d3.select(svgRef.current).select('.measure_y').node().getBBox();
        d3.select(svgRef.current).selectAll("*").remove();
        return { top: 30, left: ybox.width + 30, bottom: xbox.width + 15, right: ybox.width };
    }
    return (
        <svg className={"lineChart" + idx_str} ref={svgRef} width={width} height={height} />
    );
}

export default LineChart;
