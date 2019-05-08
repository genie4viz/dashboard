import React from 'react';
import { PanelDiv } from './styled';
import * as Color from '@app/theme/color';

export interface IProps {
    children: React.ReactNode;
    width?: string;
    onClick?: React.ReactEventHandler;
}

const Panel: React.FC<IProps> = ({ children, width, onClick }) => (
    <PanelDiv backgroundColor={Color.COLORS.white} width={width} onClick={onClick}>
        {children}
    </PanelDiv>
);

export default Panel;
