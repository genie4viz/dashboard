import React, { useCallback } from 'react';

import { ItemContainer } from './styled';

import Icon, { glyphs } from '@app/components/Icon';
import { P1 } from '@app/components/Shared/Typescale';


export interface IStyleItem {
    id: string;
    title: string;
    style: string;
    icon: string;
}

export interface IProps {
    item: IStyleItem;
    isSelected: boolean;
    onClick: (item: IStyleItem) => void;
}

class StyleItem extends React.Component<IProps> {

    public render() {
        const { item, isSelected, onClick } = this.props;

        return (
            <ItemContainer onClick={() => { onClick(item) }} isSelected={isSelected}>
                <Icon css={{ marginBottom: '8px' }} size={{ width: 56, height: 56 }} icon={glyphs[item.icon]} />
                <P1>{item.title}</P1>
            </ItemContainer>
        );
    }
}

export default StyleItem;
