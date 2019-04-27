import React, { Fragment } from 'react';
import { Container, ButtonStyle, Content, InputItem, ContentScroll, BottomPanel, ContentWrap, GraphView, CenterDiv } from './styled';

import Button from '@app/components/Button';

import DrawerFrame from '@app/components/Dashboard/DrawerFrame';
import SeperateBar from '@app/components/Dashboard/SeperateBar';
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl';

import { Field, Form } from 'react-final-form';
import FormInputSelect from '@app/components/Form/FormInputSelect';
import FormInputSwitch from '@app/components/Form/FormInputSwitch';
import FormInputSelectButton from '@app/components/Form/FormInputSelectButton';

import { IStyleItem } from '@app/components/Dashboard/DashboardDrawer/Category/StyleItem';
import PieChart from '@app/components/Dashboard/Chart/PieChart';
import BarChart from '@app/components/Dashboard/Chart/BarChart';
import LineChart from '@app/components/Dashboard/Chart/LineChart';

import { FakeData } from '@app/components/Dashboard/Chart/fake';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

interface IProps {
    onClose: () => void;
    intl: InjectedIntl;
    graphStyle: IStyleItem;
}

interface IState {
    isLoaded: boolean;
}

@observer
class CreateBlockModal extends React.Component<IProps, IState> {
    @observable private isCountChart: boolean = true;
    constructor(props: any) {
        super(props)

        this.setState({
            isLoaded: false,
        });
    }

    componentDidMount() {
        this.setState({
            isLoaded: true,
        });
    }

    public render() {
        const { onClose, graphStyle, intl: { formatMessage } } = this.props;

        const data: any = FakeData.find((fake) => fake.type === graphStyle.style);

        return (
            <Container>
                <GraphView>
                    <CenterDiv>
                        {graphStyle.style === "PIE" &&
                            <PieChart data={data} width={560} height={560} showValue={true} showLimit={5} />
                        }
                        {graphStyle.style === "BAR" &&
                            <BarChart data={data} width={700} height={560} isCountChart={this.isCountChart} showLimit={20} />
                        }
                        {graphStyle.style === "LINE" &&
                            <LineChart data={data} width={700} height={560} isCountChart={this.isCountChart} showLimit={20} />
                        }
                    </CenterDiv>
                </GraphView>
                <Form
                    initialValues={{}}
                    onSubmit={() => { }}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <DrawerFrame title={formatMessage({ id: 'pageDashboard.drawerCreateBlock' })} onClose={onClose} isDrawer={false} >
                                <SeperateBar />
                                <ContentScroll>
                                    <ContentWrap>
                                        <Content>
                                            <Field
                                                titleId="pageDashboard.drawerCore"
                                                css={InputItem}
                                                name="dropdownCore"
                                                component={FormInputSelect as any}
                                                options={[
                                                    { name: 'one', value: '1' },
                                                    { name: 'two', value: '2' },
                                                    { name: 'three', value: '3' }
                                                ]}
                                            />
                                            <Field
                                                titleId="pageDashboard.drawerTable"
                                                css={InputItem}
                                                name="dropdownTable"
                                                component={FormInputSelect as any}
                                                options={[
                                                    { name: 'one', value: '1' },
                                                    { name: 'two', value: '2' },
                                                    { name: 'three', value: '3' }
                                                ]}
                                            />
                                            <Field
                                                titleId="pageDashboard.drawerView"
                                                css={InputItem}
                                                name="dropdownView"
                                                component={FormInputSelect as any}
                                                options={[
                                                    { name: 'one', value: '1' },
                                                    { name: 'two', value: '2' },
                                                    { name: 'three', value: '3' }
                                                ]}
                                            />
                                        </Content>
                                        <SeperateBar />
                                        <Content>
                                            <Field
                                                titleId="pageDashboard.drawerCategoriesField"
                                                css={InputItem}
                                                name="dropdownCateField"
                                                component={FormInputSelect as any}
                                                options={[
                                                    { name: 'one', value: '1' },
                                                    { name: 'two', value: '2' },
                                                    { name: 'three', value: '3' }
                                                ]}
                                            />
                                            <Field
                                                name="input_switchEmptyCell"
                                                titleId="pageDashboard.drawerIncludeEmptyCells"
                                                component={FormInputSwitch as any}
                                            />
                                        </Content>
                                        <SeperateBar />
                                        <Content>
                                            <Field
                                                titleId="pageDashboard.drawerValues"
                                                css={InputItem}
                                                name="selectValues"
                                                component={FormInputSelectButton as any}
                                                options={[
                                                    { name: formatMessage({ id: 'pageDashboard.drawerCount' }), value: '1' },
                                                    { name: formatMessage({ id: 'pageDashboard.drawerField' }), value: '2' }
                                                ]}
                                                onClick={(value: any) => {
                                                    if (value == '1') {
                                                        this.isCountChart = true;
                                                    } else {
                                                        this.isCountChart = false;
                                                    }
                                                }}
                                            />
                                            <Field
                                                css={InputItem}
                                                name="dropdownProfit"
                                                component={FormInputSelect as any}
                                                options={[
                                                    { name: 'one', value: '1' },
                                                    { name: 'two', value: '2' },
                                                    { name: 'three', value: '3' }
                                                ]}
                                            />
                                            <Field
                                                name="input_switchAggregate"
                                                titleId="pageDashboard.drawerAggregate"
                                                component={FormInputSwitch as any}
                                            />
                                        </Content>
                                    </ContentWrap>
                                </ContentScroll>

                                <BottomPanel>
                                    <SeperateBar />
                                    <Button css={ButtonStyle} onClick={() => { }} >
                                        <FormattedMessage id="pageDashboard.createBlock" />
                                    </Button>
                                </BottomPanel>
                            </DrawerFrame>
                        </form>
                    )}
                />
            </Container>
        );
    }
}

export default injectIntl(CreateBlockModal);