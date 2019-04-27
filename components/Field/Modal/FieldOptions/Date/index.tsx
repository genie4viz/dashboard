import React, { Fragment } from 'react';
import { Field } from 'react-final-form';

import { FIELD_TYPES } from '@app/constants/fieldTypes';

import FormInputSelect from '@app/components/Form/FormInputSelect';
import FormInputSwitch from '@app/components/Form/FormInputSwitch';
import { FieldCSS, IFieldOptions } from '../shared';

const { dateFormatOptions, timeFormatOptions } = FIELD_TYPES.date;

const FieldOptionDate: React.FC<IFieldOptions> = ({ className, input: { value } }) => (
  <div className={className}>
    <Field
      css={FieldCSS}
      isSmall={true}
      titleId="form.field.option.dateFormat"
      name="typeOptions.dateFormat"
      options={dateFormatOptions}
      isIntl={true}
      component={FormInputSelect as any}
    />
    <Field
      css={FieldCSS}
      titleId="form.field.option.includeTimeField"
      name="typeOptions.isDateTime"
      component={FormInputSwitch}
    />
    {value.isDateTime && (
      <Fragment>
        <Field
          css={FieldCSS}
          isSmall={true}
          options={timeFormatOptions}
          titleId="form.field.option.timeFormat"
          name="typeOptions.timeFormat"
          isIntl={true}
          component={FormInputSelect as any}
        />
        <Field
          css={FieldCSS}
          titleId="form.field.option.useSameTimezone"
          name="typeOptions.timeZone"
          component={FormInputSwitch}
        />
      </Fragment>
    )}
  </div>
);

export default FieldOptionDate;
