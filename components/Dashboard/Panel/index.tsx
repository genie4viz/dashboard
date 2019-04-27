import React from 'react';
import { PanelDiv } from './styled';
import * as Color from '@app/theme/color';

export interface IProps {
    children: React.ReactNode;
    width?: string;
}


const Panel: React.FC<IProps> = ({ children, width }) => (
    <PanelDiv backgroundColor={Color.COLORS.white} width={width}>
        {children}
    </PanelDiv>
);

export default Panel;
