import React, { Fragment, useCallback } from 'react';
import { Field } from 'react-final-form';

import { FIELD_TYPES } from '@app/constants/fieldTypes';

import FormInputSelect from '@app/components/Form/FormInputSelect';
import FormInputSwitch from '@app/components/Form/FormInputSwitch';
import FormInputText from '@app/components/Form/FormInputText';

import TabContainer from '../../Tab';
import { FieldCSS, IFieldOptions } from '../shared';
import { DefaultCSS, FieldSwitchCSS } from './styled';

const tabIds = ['form.field.option.numberFormat', 'form.field.option.numberTabDefault'];

const handleParse = (value: string) => parseInt(value, 10);

const FieldOptionNumber: React.FC<IFieldOptions> = ({ className }) => {
  const handleRender = useCallback((selectedIndex: number) => {
    switch (selectedIndex) {
      case 0:
        return (
          <Fragment>
            <Field
              css={FieldCSS}
              options={FIELD_TYPES.number.formatOptions}
              isSmall={true}
              isIntl={true}
              component={FormInputSelect as any}
              name="typeOptions.format"
            />
            <Field
              titleId="form.field.option.numberPrecision"
              css={FieldCSS}
              isSmall={true}
              options={FIELD_TYPES.number.precisionOptions}
              component={FormInputSelect as any}
              name="typeOptions.precision"
            />
            <Field
              css={FieldSwitchCSS}
              component={FormInputSwitch}
              name="typeOptions.negative"
              titleId="form.field.option.numberNegative"
            />
          </Fragment>
        );
      case 1:
        return (
          <Field
            titleId="form.field.default.number"
            placeholderId="form.field.default.numberPlaceholder"
            css={DefaultCSS}
            step="any"
            parse={handleParse}
            autoComplete="off"
            type="number"
            isSmall={true}
            component={FormInputText}
            name="default"
          />
        );
    }
  }, []);

  return (
    <TabContainer tabIds={tabIds} className={className}>
      {(selectedIndex: number) => handleRender(selectedIndex)}
    </TabContainer>
  );
};

export default FieldOptionNumber;
