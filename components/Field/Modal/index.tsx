import ModalWrapper, { IModal } from '@app/components/Modal/Wrapper';
import createDecorator from 'final-form-calculate';
import { get, omit } from 'lodash';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';

import { FIELD_TYPES } from '@app/constants/fieldTypes';
import FieldModalForm from './Form';

interface IColumn {
  name: string;
  type: string;
  typeOptions: any;
}

interface IFieldModal extends IModal {
  column?: IColumn;
  onClose: () => void;
  onSubmit: (values: { [key: string]: any }) => void;
}

const decorator = createDecorator(
  {
    field: 'type',
    updates: {
      typeOptions: (type: string) => FIELD_TYPES[type].fieldOptions,
    },
  },
  {
    field: 'typeOptions.isDateTime',
    updates: {
      typeOptions: (isDateTime: boolean, allValues: any) => {
        if (!isDateTime) {
          return omit(allValues.typeOptions, ['timeFormat', 'timeZone']);
        }
        return allValues.typeOptions;
      },
    },
  },
);

const FieldModal: React.FC<IFieldModal> = ({
  column,
  onClose,
  onSubmit,
  left,
  top,
  isMaskTransparent,
}) => {
  const handleSubmit = useCallback((values) => {
    if (values.type === 'formula') {
      // tslint:disable-next-line: no-console
      console.log(values);
      return;
    }
    onSubmit(values);
  }, []);
  const handleRender = useCallback((props) => <FieldModalForm onClose={onClose} {...props} />, [
    onClose,
  ]);

  return (
    <ModalWrapper left={left} top={top} isMaskTransparent={isMaskTransparent} onClose={onClose}>
      <Form
        decorators={[decorator]}
        initialValues={{
          ...column,
          name: get(column, 'name', 'Field'),
          type: get(column, 'type', 'text'),
        }}
        onSubmit={handleSubmit}
        render={handleRender}
      />
    </ModalWrapper>
  );
};

export default FieldModal;
