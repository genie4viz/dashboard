import { NextFunctionComponent } from 'next';
import Head from 'next/head';
import React, { Fragment, useState } from 'react';
import { compose } from 'react-apollo';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import Meta from '@app/components/Meta';
import DashboardHeader from '@app/components/Dashboard/Header';
import DashboardDrawer from '@app/components/Dashboard/DashboardDrawer';

import GridLayout from '@app/components/Dashboard/GridLayout';
import { Layout } from 'react-grid-layout';

import { Container, ContainerContent, Wrapper, GridItemDiv } from './styled';

import * as Color from '@app/theme/color';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import Button from '@app/components/Button';
import { ICategory } from '@app/components/Dashboard/DashboardDrawer/Category';

import { FakeData } from '@app/components/Dashboard/Chart/fake';
import { FakeData1 } from '@app/components/Dashboard/Chart/fake1';
import { FakeData15 } from '@app/components/Dashboard/Chart/fake15';
import PieChart from '@app/components/Dashboard/Chart/PieChart';
import BarChart from '@app/components/Dashboard/Chart/BarChart';
import LineChart from '@app/components/Dashboard/Chart/LineChart';
import { IChartData } from '@app/components/Dashboard/Chart';

export interface IProps extends InjectedIntlProps {

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
  { i: 'e', x: 0, y: 1, w: 12, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
  { i: 'f', x: 0, y: 2, w: 6, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
  { i: 'g', x: 6, y: 2, w: 3, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
  { i: 'h', x: 9, y: 2, w: 3, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
];

interface IChartGraph {
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
  { key: 'd', data: FakeData[0], showValue: true, isCountChart: false, width: 0, height: 0, },
  { key: 'e', data: FakeData[1], showValue: true, isCountChart: false, width: 0, height: 0, },
  { key: 'f', data: FakeData[2], showValue: true, isCountChart: false, width: 0, height: 0, },
  { key: 'g', data: FakeData[0], showValue: true, isCountChart: false, width: 0, height: 0, },
  { key: 'h', data: FakeData[1], showValue: true, isCountChart: false, width: 0, height: 0, },
];

@observer
class Dashboard extends React.Component<IProps, {}> {
  @observable private showDrawer = false;
  @observable private fake = FakeData;
  @observable private currCharts = charts;
  private BOARD_WIDTH = 1400;
  private BOARD_ROWITEM = 300;
  private BOARD_COL = 12;

  constructor(props: any) {
    super(props);

    this.setFakeData();
    this.calcDimension(layout);
  }

  private setFakeData() {
    var i: number;
    var k: number = 0;
    for (i = 0; i < this.currCharts.length; i++) {
      this.currCharts[i].data = this.fake[k];
      k = (k + 1) % this.fake.length;
    }
  }

  private calcDimension(newLayout: Layout[]) {
    var i: number;
    for (i = 0; i < this.currCharts.length; i++) {
      if (i < newLayout.length) {
        this.currCharts[i].width = newLayout[i].w * (this.BOARD_WIDTH - 40) / this.BOARD_COL - 20;
        this.currCharts[i].height = newLayout[i].h * this.BOARD_ROWITEM - 10;
      }
    }
  }

  private processChart(chart: IChartGraph) {
    return (
      <GridItemDiv key={chart.key}>
        {chart.data.type === "PIE" &&
          <PieChart data={chart.data} width={chart.width} height={chart.height} showValue={chart.showValue} showLimit={25} />
        }
        {chart.data.type === "BAR" &&
          <BarChart data={chart.data} width={chart.width} height={chart.height} isCountChart={chart.isCountChart} showLimit={20} />
        }
        {chart.data.type === "LINE" &&
          <LineChart data={chart.data} width={chart.width} height={chart.height} isCountChart={chart.isCountChart} showLimit={20} />
        }
      </GridItemDiv>

    );
  }

  public render() {
    const { intl: { formatMessage } } = this.props;
    return (
      <Fragment>
        <Head>
          <title>{formatMessage({ id: 'pageTitle.dashboard' })}</title>
          <meta content="Dashboard Page" name="description" />
        </Head>
        <Meta />
        <Wrapper backgroundColor={Color.COLORS.grayText}>
          <Container>
            <ContainerContent>
              <DashboardHeader dashboard={formatMessage({ id: 'pageDashboard.title' })}
                share={formatMessage({ id: 'pageDashboard.share' })}
                addBlock={formatMessage({ id: 'pageDashboard.addBlock' })}
                onAddBlock={() => { this.showDrawer = true; }}
              >
              </DashboardHeader>
              <Button onClick={() => { this.fake = FakeData15; this.setFakeData(); }}>
                ChangeData
              </Button>
              <Button onClick={() => { this.fake = FakeData1; this.setFakeData(); }}>
                Change One Data point
              </Button>
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
              >
                {this.currCharts.map((chart, index) =>
                  this.processChart(chart)
                )}
              </GridLayout>

              {this.showDrawer &&
                <DashboardDrawer onClose={() => { this.showDrawer = false; }} categories={CATEGORIES} >
                </DashboardDrawer>
              }
            </ContainerContent>
          </Container>
        </Wrapper>
      </Fragment>
    );
  }
};


export default compose(
  injectIntl,
)(Dashboard as any);
