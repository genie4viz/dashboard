import React, { Fragment } from 'react';
import { Field } from 'react-final-form';

import FormInputSelect from '@app/components/Form/FormInputSelect';
import { FIELD_TYPES } from '@app/constants/fieldTypes';
import { fieldFormat, fieldParse, getFormatName } from '@app/utils/formula';

import TabContainer from '../../Tab';
import { FieldCSS, IFieldOptions } from '../shared';
import FormulaInput from './Input';

const tabIds = [
  'field.modal.fieldOptions.formula.tab.formula',
  'field.modal.fieldOptions.formula.tab.formatting',
];

const columns = [
  {
    id: 'col1',
    name: 'Field 1',
    type: 'field',
    value: getFormatName('Field 1'),
  },
  {
    id: 'col2',
    name: 'Field2',
    type: 'field',
    value: getFormatName('Field2'),
  },
  {
    id: 'col3',
    name: 'Field 3',
    type: 'field',
    value: getFormatName('Field 3'),
  },
  {
    id: 'col4',
    name: 'Field4',
    type: 'field',
    value: getFormatName('Field4'),
  },
];

const columnsNameMap = columns.reduce((obj: any, col: any) => {
  obj[col.name] = col;
  return obj;
}, {});

const columnsIdMap = columns.reduce((obj: any, col: any) => {
  obj[col.id] = col;
  return obj;
}, {});

class FieldOptionFormula extends React.PureComponent<IFieldOptions, {}> {
  public render() {
    const { className } = this.props;
    return (
      <TabContainer tabIds={tabIds} className={className}>
        {this.handleRender}
      </TabContainer>
    );
  }

  private handleParse = (parseValue: any) => {
    const {
      input: { value },
    } = this.props;
    return { ...value, ...fieldParse({ columnsNameMap, value: parseValue }) };
  };

  private handleFormat = () => {
    const {
      input: { value },
    } = this.props;
    return fieldFormat({ columnsIdMap, value });
  };

  private handleRender = (selectedIndex: number) => {
    switch (selectedIndex) {
      case 0: {
        return (
          <Field
            css={FieldCSS}
            format={this.handleFormat}
            parse={this.handleParse}
            options={columns.concat(FIELD_TYPES.formula.functions)}
            component={FormulaInput as any}
            name="typeOptions"
          />
        );
      }
      case 1: {
        const {
          input: { value },
        } = this.props;
        const formatValue = value.format;

        let name;
        let titleId;

        switch (formatValue) {
          case 'decimal': {
            name = 'precision';
            titleId = 'FIELD_TYPE_NUMBER_PRECISION';
            break;
          }
          case 'integer': {
            break;
          }
          case 'percent': {
            name = 'precision';
            titleId = 'FIELD_TYPE_NUMBER_PRECISION';
            break;
          }
          case 'duration': {
            name = 'durationFormat';
            titleId = 'field.modal.fieldOptions.formula.duration.title';
            break;
          }
          default:
            break;
        }

        return (
          <Fragment>
            <Field
              titleId="FIELD_TYPE_NUMBER_DEFAULT"
              css={FieldCSS}
              isSmall={true}
              isIntl={true}
              options={FIELD_TYPES.formula.formatOptions}
              component={FormInputSelect as any}
              name="typeOptions.format"
            />
            {formatValue && formatValue !== 'integer' && (
              <Field
                titleId={titleId}
                css={FieldCSS}
                isSmall={true}
                options={FIELD_TYPES.formula[formatValue]}
                component={FormInputSelect as any}
                name={`typeOptions.${name}`}
              />
            )}
          </Fragment>
        );
      }
      default:
        return null;
    }
  };
}

export default FieldOptionFormula;
