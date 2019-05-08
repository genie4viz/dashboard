import React, { Fragment } from 'react';
import { compose } from 'react-apollo';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import DashboardHeader from '@app/components/Dashboard/Header';
import DashboardDrawer from '@app/components/Dashboard/DashboardDrawer';

import GridLayout from '@app/components/Dashboard/GridLayout';
import { Layout } from 'react-grid-layout';

//import { GridItemDiv } from './styled';
import GridItemDiv from './GridItemDiv';

import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import Button from '@app/components/Button';
import { ICategory } from '@app/components/Dashboard/DashboardDrawer/Category';

import { FakeData } from '@app/components/Dashboard/Chart/fake';
import { FakeData1 } from '@app/components/Dashboard/Chart/fake1';
import { FakeData15 } from '@app/components/Dashboard/Chart/fake15';
import { FakeData300 } from '@app/components/Dashboard/Chart/fake300';
import { FakeDataInventory } from '@app/components/Dashboard/Chart/fakeInventory';
import { IChartData } from '@app/components/Dashboard/Chart';
import DropBox from '@app/components/Dashboard/DashboardDrawer/DropBox';

import CustomDragLayer from '@app/components/Dashboard/DashboardDrawer/DraggableBlock/CustomDragLayer';


export interface IProps extends InjectedIntlProps {

}

interface IState {
    dashboardBlocks: IChartGraph[],
    inventoryBlocks: IChartData[],
}

const CATEGORIES: ICategory[] = [
    {
        id: 'category1',
        title: 'Category1',
        items: [
            {
                id: "cate1_pie1",
                title: "Pie",
                style: "PIE",
                icon: "GRAPH_PIE"
            },
            {
                id: "cate1_donut1",
                title: "Donut",
                style: "DONUT",
                icon: "GRAPH_DONUT"
            },
            {
                id: "cate1_pie2",
                title: "Pie",
                style: "PIE",
                icon: "GRAPH_PIE"
            },
            {
                id: "cate1_donut2",
                title: "Donut",
                style: "DONUT",
                icon: "GRAPH_DONUT"
            }
        ]
    },
    {
        id: 'category2',
        title: 'Category2',
        items: [
            {
                id: "cate2_line1",
                title: "Line",
                style: "LINE",
                icon: "GRAPH_LINE"
            },
            {
                id: "cate2_scatter1",
                title: "Scatter",
                style: "SCATTER",
                icon: "GRAPH_SCATTER"
            }
        ]
    },
    {
        id: 'category3',
        title: 'Category3',
        items: [
            {
                id: "cate3_bar1",
                title: "Bar",
                style: "BAR",
                icon: "GRAPH_BAR"
            },
            {
                id: "cate3_bar2",
                title: "Bar",
                style: "BAR",
                icon: "GRAPH_BAR"
            },
            {
                id: "cate3_bar3",
                title: "Bar",
                style: "BAR",
                icon: "GRAPH_BAR"
            }
        ]
    },
];

const layout: Layout[] = [
    { i: 'a', x: 0, y: 0, w: 12, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
    { i: 'b', x: 0, y: 1, w: 4, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
    { i: 'c', x: 4, y: 1, w: 4, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
    { i: 'd', x: 8, y: 1, w: 4, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
    { i: 'e', x: 0, y: 2, w: 12, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
    { i: 'f', x: 0, y: 3, w: 6, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
    { i: 'g', x: 6, y: 3, w: 3, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
    { i: 'h', x: 9, y: 3, w: 3, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
];

export interface IChartGraph {
    key: string,
    data: IChartData,
    showValue: boolean,
    isCountChart: boolean,
    width: number,
    height: number,
}

const charts: IChartGraph[] = [
    { key: 'a', data: FakeData[0], showValue: true, isCountChart: false, width: 0, height: 0, },
    { key: 'b', data: FakeData[1], showValue: true, isCountChart: true, width: 0, height: 0, },
    { key: 'c', data: FakeData[2], showValue: true, isCountChart: false, width: 0, height: 0, },
    { key: 'd', data: FakeData[3], showValue: true, isCountChart: false, width: 0, height: 0, },
    { key: 'e', data: FakeData[4], showValue: true, isCountChart: false, width: 0, height: 0, },
    { key: 'f', data: FakeData[5], showValue: true, isCountChart: false, width: 0, height: 0, },
    { key: 'g', data: FakeData[6], showValue: true, isCountChart: false, width: 0, height: 0, },
    { key: 'h', data: FakeData[7], showValue: true, isCountChart: false, width: 0, height: 0, },
];

@observer
class DashboardContent extends React.Component<IProps, IState> {
    @observable private showDrawer = false;
    @observable private fake = FakeData;
    @observable private currLayout = layout;
    @observable private isNewBlockOver = false;


    private currentDragginData: IChartData | null = null;
    private dragX: number = 0;
    private dragY: number = 0;

    private BOARD_WIDTH = 1400;
    private BOARD_ROWITEM = 348;
    private BOARD_COL = 12;

    constructor(props: any) {
        super(props);

        this.state = {
            dashboardBlocks: charts,
            inventoryBlocks: FakeDataInventory
        };

        this.moveBlockToDashboard = this.moveBlockToDashboard.bind(this)
        this.moveBlockToInventory = this.moveBlockToInventory.bind(this)
        this.onEditBlock = this.onEditBlock.bind(this)
        this.onRemoveBlock = this.onRemoveBlock.bind(this)
        this.moveBlockToInventory = this.moveBlockToInventory.bind(this)
        this.onDragStart = this.onDragStart.bind(this);
        this.onOver = this.onOver.bind(this);
        this.onDropped = this.onDropped.bind(this);
    }

    componentWillMount() {
        this.setFakeData();
        this.calcDimension(this.currLayout);
    }

    private setFakeData() {
        var { dashboardBlocks } = this.state;
        var i: number;
        var k: number = 0;
        for (i = 0; i < dashboardBlocks.length; i++) {
            dashboardBlocks[i].data = this.fake[k];
            k = (k + 1);
            if (k >= this.fake.length)
                break;
        }
        this.setState({ dashboardBlocks });
    }

    private calcDimension(newLayout: Layout[]) {
        var { dashboardBlocks } = this.state;
        var i: number;
        for (i = 0; i < dashboardBlocks.length; i++) {
            if (i < newLayout.length) {
                dashboardBlocks[i].width = newLayout[i].w * (this.BOARD_WIDTH - 40) / this.BOARD_COL - 20;
                dashboardBlocks[i].height = newLayout[i].h * this.BOARD_ROWITEM - 10;
            }
        }
    }

    private processChart(chart: IChartGraph, index: number) {
        return (
            <GridItemDiv key={chart.key} index={index} width={chart.width} height={chart.height} chart={chart} onEdit={this.onEditBlock} onRemove={this.onRemoveBlock} />
        );
    }

    private generateRandomValue() {
        return Math.random().toString();
    }

    private moveBlockToDashboard(blockData: IChartData) {
        var { dashboardBlocks, inventoryBlocks } = this.state;

        for (let i = 0, len = inventoryBlocks.length; i < len; i++) {
            if (inventoryBlocks[i].key === blockData.key) {
                inventoryBlocks.splice(i, 1);
                break;
            }
        }

        var newChart: IChartGraph = {
            key: blockData.name + this.generateRandomValue(),
            data: blockData,
            showValue: true,
            isCountChart: false,
            width: 12 * (this.BOARD_WIDTH - 40) / this.BOARD_COL - 20,
            height: this.BOARD_ROWITEM - 10
        }

        dashboardBlocks.unshift(newChart);
    }

    private moveBlockToInventory(key: string) {
        var { dashboardBlocks, inventoryBlocks } = this.state;

        for (let i = 0, len = dashboardBlocks.length; i < len; i++) {
            if (dashboardBlocks[i].data.key === key) {
                inventoryBlocks.push(dashboardBlocks[i].data);
                dashboardBlocks.splice(i, 1);

                this.setState({ inventoryBlocks, dashboardBlocks })
                return;
            }
        }
    }

    private onEditBlock(key: string) {

    }

    private onRemoveBlock(key: string) {
        this.moveBlockToInventory(key);
    }

    private onDragStart(data: IChartData) {
        var that = this;
        setTimeout(function () {
            that.showDrawer = false;
            //that.setState({ currentDragginData: data });
            that.currentDragginData = data;
        }, 100);
    }

    private onOver(isOver: boolean, x: number, y: number) {
        //this.setState({ isNewBlockOver: isOver });
        this.isNewBlockOver = isOver;
        this.dragX = x;
        this.dragY = y;
    }

    private onDropped() {
        //this.setState({ isNewBlockOver: false });        
        if (this.currentDragginData) {
            this.moveBlockToDashboard(this.currentDragginData);
            this.currentDragginData = null;

            this.isNewBlockOver = false;
        }
    }

    public render() {
        const { intl: { formatMessage } } = this.props;
        const { dashboardBlocks, inventoryBlocks } = this.state;
        return (
            <Fragment>
                <DashboardHeader dashboard={formatMessage({ id: 'pageDashboard.title' })}
                    share={formatMessage({ id: 'pageDashboard.share' })}
                    addBlock={formatMessage({ id: 'pageDashboard.addBlock' })}
                    onAddBlock={() => { this.showDrawer = true; }}
                >
                </DashboardHeader>
                <div style={{ display: 'flex' }}>
                    <Button onClick={() => { this.fake = FakeData300; this.setFakeData(); }}>
                        ChangeData
                    </Button>
                    <Button onClick={() => { this.fake = FakeData1; this.setFakeData(); }}>
                        Change One Data point
                    </Button>
                </div>
                <DropBox onOver={this.onOver} onDropped={this.onDropped}>
                    <GridLayout
                        className='Dashboard-container layout'
                        cols={this.BOARD_COL}
                        layout={layout}
                        margin={[20, 20]}
                        preventCollision={false}
                        rowHeight={this.BOARD_ROWITEM}
                        verticalCompact={false}
                        width={this.BOARD_WIDTH}
                        onResize={(newLayout: Layout[],
                            oldItem: Layout,
                            newItem: Layout,
                            placeholder: Layout,
                            event: MouseEvent,
                            element: HTMLElement) => {
                            this.calcDimension(newLayout);
                        }}
                        onDragStop={(newLayout: Layout[],
                            oldItem: Layout,
                            newItem: Layout,
                            placeholder: Layout,
                            event: MouseEvent,
                            element: HTMLElement) => {
                            this.calcDimension(newLayout);
                        }}
                        isNewOver={this.isNewBlockOver}
                        dragX={this.dragX}
                        dragY={this.dragY}
                    >
                        {dashboardBlocks.map((chart, index) =>
                            this.processChart(chart, index)
                        )}
                    </GridLayout>
                </DropBox>
                {
                    this.showDrawer &&
                    <DashboardDrawer onClose={() => { this.showDrawer = false; }} categories={CATEGORIES} onDragStart={this.onDragStart}
                        chartData={inventoryBlocks}>
                    </DashboardDrawer>
                }

                <CustomDragLayer />
            </Fragment >
        );
    }
};


export default compose(
    injectIntl,
)(DashboardContent as any);
