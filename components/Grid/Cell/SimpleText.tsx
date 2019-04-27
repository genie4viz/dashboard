import { get as getField } from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';

export interface ISimpleTextProps {
  value: {
    text: string;
  };
}

export const SimpleText = observer(({ value }) => {
  const text = getField(value, 'text', '');
  return <div>{text}</div>;
});
