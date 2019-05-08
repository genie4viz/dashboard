import React from 'react';
import {
    DragSource,
    ConnectDragSource,
    DragSourceConnector,
    DragSourceMonitor,
    ConnectDragPreview
} from 'react-dnd'

import { getEmptyImage } from 'react-dnd-html5-backend'

import Panel from '@app/components/Dashboard/Panel';
import PieChart from '@app/components/Dashboard/Chart/PieChart';
import BarChart from '@app/components/Dashboard/Chart/BarChart';
import LineChart from '@app/components/Dashboard/Chart/LineChart';
import { IChartData } from '../../Chart';

export interface BoxProps {
    isDragging: boolean
    connectDragSource: ConnectDragSource
    connectDragPreview: ConnectDragPreview
    data: IChartData
    onDragStart: () => void;
}

const blockSource = {
    beginDrag(props: BoxProps) {
        const { data } = props;
        props.onDragStart();
        return data;
    },
}

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

class DraggableBlock extends React.Component<BoxProps> {
    componentDidMount() {
        this.props.connectDragPreview(getEmptyImage())
    }

    public render() {
        var { connectDragSource, isDragging, data } = this.props;
        return connectDragSource(
            <div style={{ opacity: isDragging ? 0.5 : 1, cursor: 'pointer' }}>
                <Panel width={"436px"} onClick={() => { /*onAddBlock(data)*/ }}>
                    {data.type === "PIE" &&
                        <PieChart data={data} width={436} height={300} showValue={true} showLimit={5} />
                    }
                    {data.type === "BAR" &&
                        <BarChart data={data} width={436} height={300} isCountChart={true} showLimit={20} />
                    }
                    {data.type === "LINE" &&
                        <LineChart data={data} width={436} height={300} showLimit={20} />
                    }
                </Panel>
            </div>
        );
    }
}

export default DragSource("Block", blockSource, collect)(DraggableBlock);