import React, { Fragment, useState } from 'react';
import { IChartGraph } from '../index'
import SubMenu from './SubMenu'
import PieChart from '@app/components/Dashboard/Chart/PieChart';
import BarChart from '@app/components/Dashboard/Chart/BarChart';
import LineChart from '@app/components/Dashboard/Chart/LineChart';

export interface IProps {
    className?: string,
    key: string,
    width: number,
    height: number,
    chart: IChartGraph,
    style?: any,
    onMouseDown?: () => void,
    onMouseUp?: () => void,
    onTouchStart?: () => void,
    onTouchEnd?: () => void,
    onEdit: (key: string) => void,
    onRemove: (key: string) => void
}


class GridItemDiv extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const { key, chart, index, width, height, className, style, onMouseDown, onMouseUp, onTouchStart, onTouchEnd, onEdit, onRemove } = this.props;
        let origStyle = {
            ...style,
            backgroundColor: 'white',
            borderRadius: '8px',
        }
        return (
            <div key={key} className={className} style={origStyle}
                onMouseDown={onMouseDown} onMouseUp={onMouseUp} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                {
                    chart.data.type === "PIE" &&
                    <PieChart data={chart.data} idx={index} width={width} height={height} showValue={chart.showValue} showLimit={25} />
                }
                {
                    chart.data.type === "BAR" &&
                    <BarChart data={chart.data} idx={index} width={width} height={height} isCountChart={chart.isCountChart} showLimit={70} />
                }
                {
                    chart.data.type === "LINE" &&
                    <LineChart data={chart.data} idx={index} width={width} height={height} isCountChart={chart.isCountChart} showLimit={70} />
                }
                <SubMenu top={10} right={20} onEdit={() => { onEdit(chart.data.key); }} onRemove={() => { onRemove(chart.data.key); }}></SubMenu>
            </div >
        );
    }
};


export default GridItemDiv;
