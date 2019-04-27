import React from 'react';

import { ColumnType } from '@app/types/graphql-global-types';
import { SimpleText } from './SimpleText';

const EmptyCell = () => {
  return <div />;
};

export const getCellComponentByColumnType = (type: ColumnType) => {
  if (type === ColumnType.TEXT) {
    return SimpleText;
  }
  // tslint:disable-next-line: no-object-literal-type-assertion
  return EmptyCell;
};
