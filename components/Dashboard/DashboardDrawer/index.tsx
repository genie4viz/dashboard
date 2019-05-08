import React, { Fragment } from 'react';
import { ButtonStyle, PanelStyle, ContentScroll, BottomPanel, ContentWrap } from './styled';

import Button from '@app/components/Button';

import DrawerFrame from '@app/components/Dashboard/DrawerFrame';
import SeperateBar from '@app/components/Dashboard/SeperateBar';
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl';

import { IChartData } from '@app/components/Dashboard/Chart';

import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Category, { ICategory } from './Category';
import { IStyleItem } from './Category/StyleItem';
import CreateBlockModal from '@app/components/Dashboard/CreateBlockModal';
import DraggableBlock from './DraggableBlock';

enum DrawerPages {
    BLOCKS = 'block',
    STYLE = 'style',
    CREAT_BLOCK = 'create_block'
}

interface IProps {
    onClose: () => void;
    categories: ICategory[];
    chartData: IChartData[];
    intl: InjectedIntl;
    onDragStart?: (data: IChartData) => void;
}


@observer
class DashboardDrawer extends React.Component<IProps> {
    @observable private pageShow: DrawerPages = DrawerPages.BLOCKS;
    @observable private selectedStyle: IStyleItem;

    constructor(props: any) {
        super(props)

        this.onClickStyleItem = this.onClickStyleItem.bind(this)

        this.selectedStyle = {
            id: "",
            title: "",
            style: "",
            icon: ""
        };
    }

    private onClickStyleItem(item: IStyleItem) {
        this.selectedStyle = item;
    }

    public render() {
        const { onClose, intl: { formatMessage }, categories, onDragStart, chartData } = this.props;
        return (
            <Fragment>
                {this.pageShow === DrawerPages.BLOCKS &&
                    <DrawerFrame title={formatMessage({ id: 'pageDashboard.drawerBlock' })} onClose={onClose} isDrawer={true} >
                        <SeperateBar />
                        <ContentScroll>
                            <ContentWrap>
                                {chartData.map((data, index) => (
                                    <DraggableBlock key={index} data={data} onDragStart={() => { if (onDragStart) onDragStart(data) }}></DraggableBlock>
                                ))}
                                <div style={{ width: "436px" }} ></div>
                            </ContentWrap>
                        </ContentScroll>
                        <BottomPanel>
                            <SeperateBar />
                            <Button css={ButtonStyle} onClick={() => { this.pageShow = DrawerPages.STYLE; }}>
                                <FormattedMessage id="pageDashboard.createBlock" />
                            </Button>
                        </BottomPanel>
                    </DrawerFrame>
                }
                {this.pageShow === DrawerPages.STYLE &&
                    <DrawerFrame title={formatMessage({ id: 'pageDashboard.drawerStyle' })} onClose={onClose} isDrawer={true} >
                        <SeperateBar />
                        <ContentScroll>
                            <ContentWrap>
                                {categories.map((category, index) => (
                                    <Category key={category.id} category={category} onClick={this.onClickStyleItem} selectedId={this.selectedStyle.id} isLast={categories.length - 1 === index} />
                                ))}
                            </ContentWrap>
                        </ContentScroll>
                        <BottomPanel>
                            <SeperateBar />
                            <Button css={ButtonStyle} onClick={() => { this.pageShow = DrawerPages.CREAT_BLOCK; }} isDisabled={this.selectedStyle.id == ""}>
                                <FormattedMessage id="pageDashboard.next" />
                            </Button>
                        </BottomPanel>
                    </DrawerFrame>
                }
                {this.pageShow === DrawerPages.CREAT_BLOCK &&
                    <CreateBlockModal graphStyle={this.selectedStyle} onClose={onClose} />
                }
            </Fragment>
        );
    }
}

export default injectIntl(DashboardDrawer);
