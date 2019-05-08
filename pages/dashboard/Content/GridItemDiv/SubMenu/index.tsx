import React, { Fragment, useState } from 'react';
import { SubMenuContainer, SubMenuWrapper, SubMenuDiv, MenuItem } from './styled';

import Icon, { glyphs } from '@app/components/Icon';
import { FormattedMessage } from 'react-intl';

import ModalWrapper from '@app/components/Modal/Wrapper';
import ButtonIcon from '@app/components/Button/Icon';

export interface IProps {
    left?: number,
    right?: number,
    top?: number,
    bottom?: number,
    onRemove: () => void,
    onEdit: () => void,
}

interface IState {
    isShowMenu: boolean;
}

class SubMenu extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isShowMenu: false
        };
    }

    public render() {
        const { left, right, top, bottom, onRemove, onEdit } = this.props;
        const { isShowMenu } = this.state;
        return (
            //<ModalWrapper onClose={() => { this.setState({ isShowMenu: false }) }} isMaskTransparent={true}  >
            <SubMenuContainer style={{ left: left, right: right, top: top, bottom: bottom }}
                onMouseDown={(e) => { e.stopPropagation(); }}
                onMouseUp={(e) => { e.stopPropagation(); }}
                onTouchStart={(e) => { e.stopPropagation(); }}
                onTouchEnd={(e) => { e.stopPropagation(); }}>
                <SubMenuWrapper>
                    <ButtonIcon
                        iconProps={{ size: { height: 16, width: 16 }, icon: glyphs.THREE_DOT }}
                        onClick={() => { this.setState({ isShowMenu: !isShowMenu }) }}
                    />
                    {isShowMenu &&
                        <SubMenuDiv>
                            <MenuItem onClick={() => { onEdit(); this.setState({ isShowMenu: false }) }}>
                                <Icon css={{ marginRight: '5px' }} size={{ width: 12, height: 12 }} icon={glyphs.EDIT} />
                                <FormattedMessage id={'pageDashboard.editBlock'} />
                            </MenuItem>
                            <MenuItem onClick={() => { onRemove(); this.setState({ isShowMenu: false }) }}>
                                <Icon css={{ marginRight: '5px' }} size={{ width: 12, height: 12 }} icon={glyphs.REMOVE} />
                                <FormattedMessage id={'pageDashboard.deleteBlock'} />
                            </MenuItem>
                        </SubMenuDiv>
                    }
                </SubMenuWrapper>
            </SubMenuContainer>
            //</ModalWrapper>
        );
    }
};


export default SubMenu;
