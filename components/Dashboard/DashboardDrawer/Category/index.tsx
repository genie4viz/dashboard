import React, { Fragment } from 'react';

import { Title, Content } from './styled';

import SeperateBar from '@app/components/Dashboard/SeperateBar';
import { Label1 } from '@app/components/Shared/Typescale';
import StyleItem, { IStyleItem } from './StyleItem';


export interface ICategory {
    id: string,
    title: string,
    items: IStyleItem[]
}

export interface IProps {
    category: ICategory,
    selectedId: string,
    isLast: boolean,
    onClick: (item: IStyleItem) => void;
}

class Category extends React.Component<IProps> {
    public render() {
        const { category, selectedId, onClick, isLast } = this.props;

        return (
            <Fragment>
                <Title>
                    <Label1>{category.title}</Label1>
                </Title>
                <Content>
                    {category.items.map((item) => (
                        <StyleItem key={item.id} item={item} onClick={onClick} isSelected={selectedId == item.id ? true : false} />
                    ))}
                </Content>
                {!isLast &&
                    <SeperateBar />
                }
            </Fragment>
        );
    }
}

export default Category;
