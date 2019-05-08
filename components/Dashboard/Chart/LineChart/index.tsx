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
    const SMALL_SIZEY = 200;
    const svgRef = useRef(null);
    const getConvertedData = (w_data: any) => {
        let c_data = [];
        if (isCountChart) {
            c_data = d3.nest()
                .key((d: any) => d.value)
                .rollup((v: any) => v.length)
                .entries(w_data);
            c_data.map((d: any) => {
                d.label = d.key;
                return d;
            });
        } else {
            c_data = w_data;
        }
        return c_data;
    }
    const c_data = getConvertedData(data.values);
    const cache = useRef(c_data);

    useEffect(() => drawChart(), [width, height, data]);

    const drawChart = () => {
        if (c_data == null) return;
        let curData = c_data;
        let prevData = cache.current;
        if (curData.length != prevData.length || isCountChart) {
            prevData = revisionPrevData();
        }

        let margins = getMargins(curData),
            rw = width - margins.right - margins.left,
            rh = height - margins.top - margins.bottom;
        let min: number = 0,// d3.min
            max: any = d3.max(curData, (d: any) => d.value),
            step = Math.ceil(curData.length / 25);

        let x: any = d3
            .scaleBand()
            .range([0, rw])
            .domain(curData.map((d: any, i: any) => d.label + i))
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
        const tooltip = graphArea.append('g');

        graphArea.select('.xArea').remove();
        let xArea = graphArea.append('g').attr('class', 'xArea')
            .attr('transform', "translate(0," + rh + ")")
        xArea
            .attr('class', 'x axis')
            .call(xAxis)
            .selectAll('text')
            .attr('class', (d, i) => 'line-x-text' + d + i)
            .text((d: any, i) => d.substr(0, d.length - i.toString().length))
            .attr('opacity', (d: any, i) => i % step != 0 || height < SMALL_SIZEY ? 0 : 1)
            .style("font", "300 10px Arial")
            .attr('text-anchor', 1.1*width/showLimit < curData.length ? 'start' : 'middle')
            .attr('transform',1.1*width/ showLimit < curData.length ? 'rotate(45)' : 'rotate(0)');
        xArea
            .selectAll('path')
            .attr('opacity', 0)

        graphArea.select('.yArea').remove();
        let yArea = graphArea.append('g').attr('class', 'yArea')
        yArea
            .attr('class', 'y axis')
            .call(yAxis)
            .selectAll('text')
            .attr('opacity', (d: any) => height < SMALL_SIZEY ? 0 : 1)
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
            .y((d: any) => y(d.value))
            .curve(d3.curveMonotoneX)

        let line_group: any = graphArea.append("g")
            .append('path')
            .datum(prevData)
            .attr("d", valueline)
            .attr("fill", "none")
            .attr("stroke", 'steelblue')
            .attr("stroke-width", 2)

        let dot_group: any = graphArea.append("g")
            .selectAll('dot.circle')
            .data(prevData)
            .enter()
            .append('circle')
            .attr('class', (d: any, i: any) => 'dot' + idx_str + i)
            .attr("cx", (d: any, i) => x(d.label + i) + x.bandwidth() / 2)
            .attr("cy", (d: any) => y(d.value))
            .attr("r", 3)
            .attr("opacity", 0.5)
            .attr('cursor', 'pointer')
            .attr("fill", 'steelblue')

        line_group
            .datum(curData)
            .transition()
            .duration(1000)
            .attr("d", valueline)
            .attr("fill", "none")
            .attr("stroke", 'steelblue')
            .attr("stroke-width", 2)

        dot_group
            .data(curData)
            .on("mouseover", (d: any, i: any) => {
                if(height > SMALL_SIZEY){
                    d3.select('.dot' + idx_str + i).attr('r', 5);
                    tooltip.attr('transform', 'translate(' + (x(d.label + i) + x.bandwidth() / 2) + ',' + y(d.value) + ')').call(callout, d, i);
                    // graphArea.select('.line-x-text' + d.label + i).attr('opacity', 1);
                    tooltip.raise();
                }
            })
            .on("mouseout", (d: any, i: any) => {
                
                d3.select('.dot' + idx_str + i).attr('r', 3);
                // if(i % step != 0)
                //     graphArea.select('.line-x-text' + d.label + i).attr('opacity', 0);
                tooltip.call(callout, null);
                    
            })
            .transition()
            .duration(1000)
            .attr("cx", (d: any, i: any) => x(d.label + i) + x.bandwidth() / 2)
            .attr("cy", (d: any) => y(d.value))


        if (height > SMALL_SIZEY) {
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
                .attr("dy", "-0.2em")
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
        }

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
        cache.current = curData;
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
        return { top: 30, left: ybox.width + 30, bottom: data.length > 1.1 * width/showLimit ? xbox.width + 15 : xbox.height + 15, right: ybox.width };
    }
    const revisionPrevData = () => {
        let rev_data = [];
        for (let i = 0; i < c_data.length; i++) {
            rev_data.push({
                label: c_data[i].label,
                value: 0,
                color: c_data[i].color
            })
        }
        return rev_data;
    }
    return (
        <svg className={"lineChart" + idx_str} ref={svgRef} width={width} height={height} />
    );
}

export default LineChart;
