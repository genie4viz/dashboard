import React from 'react'
import { DragLayer, XYCoord } from 'react-dnd'

import Panel from '@app/components/Dashboard/Panel';
import PieChart from '@app/components/Dashboard/Chart/PieChart';
import BarChart from '@app/components/Dashboard/Chart/BarChart';
import LineChart from '@app/components/Dashboard/Chart/LineChart';
import { IChartData } from '../../../Chart';

const layerStyles: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
}

function getItemStyles(props: CustomDragLayerProps) {
    const { initialOffset, currentOffset } = props
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        }
    }

    let { x, y } = currentOffset
    const transform = `translate(${x}px, ${y}px)`
    return {
        transform,
        WebkitTransform: transform,
    }
}

export interface CustomDragLayerProps {
    item: IChartData,
    initialOffset?: XYCoord | null
    currentOffset?: XYCoord | null
    isDragging?: boolean
}

const CustomDragLayer: React.FC<CustomDragLayerProps> = props => {
    const { item, isDragging } = props;

    function renderItem() {
        return (
            <Panel width={"436px"} onClick={() => { }}>
                {item.type === "PIE" &&
                    <PieChart data={item} width={436} height={300} showValue={true} showLimit={5} />
                }
                {item.type === "BAR" &&
                    <BarChart data={item} width={436} height={300} isCountChart={true} showLimit={20} />
                }
                {item.type === "LINE" &&
                    <LineChart data={item} width={436} height={300} showLimit={20} />
                }
            </Panel>
        );
    }

    if (!isDragging) {
        return null
    }
    return (
        <div style={layerStyles}>
            <div style={getItemStyles(props)}>{renderItem()}</div>
        </div>
    )
}

export default DragLayer(monitor => ({
    item: monitor.getItem(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
}))(CustomDragLayer)
