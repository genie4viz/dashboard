import React, { Fragment } from 'react';
import { ButtonStyle, PanelStyle, ContentScroll, BottomPanel, ContentWrap } from './styled';

import Button from '@app/components/Button';

import DrawerFrame from '@app/components/Dashboard/DrawerFrame';
import Panel from '@app/components/Dashboard/Panel';
import SeperateBar from '@app/components/Dashboard/SeperateBar';
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl';

import PieChart from '@app/components/Dashboard/Chart/PieChart';
import BarChart from '@app/components/Dashboard/Chart/BarChart';
import LineChart from '@app/components/Dashboard/Chart/LineChart';

import { FakeData } from '@app/components/Dashboard/Chart/fake';

import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Category, { ICategory } from './Category';
import { IStyleItem } from './Category/StyleItem';
import CreateBlockModal from '@app/components/Dashboard/CreateBlockModal';

enum DrawerPages {
    BLOCKS = 'block',
    STYLE = 'style',
    CREAT_BLOCK = 'create_block'
}

interface IProps {
    onClose: () => void;
    categories: ICategory[];
    intl: InjectedIntl;
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
        const { onClose, intl: { formatMessage }, categories } = this.props;
        return (
            <Fragment>
                {this.pageShow === DrawerPages.BLOCKS &&
                    <DrawerFrame title={formatMessage({ id: 'pageDashboard.drawerBlock' })} onClose={onClose} isDrawer={true} >
                        <SeperateBar />
                        <ContentScroll>
                            <ContentWrap>
                                {FakeData.map((data, index) => (
                                    <Panel key={index} css={PanelStyle} width={"436px"}>
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
                                ))}
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
