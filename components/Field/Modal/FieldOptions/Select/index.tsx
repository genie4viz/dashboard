import { omit, sortBy } from 'lodash';
import React, { useCallback } from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import uuidv1 from 'uuid/v1';
import { IFieldOptions } from '../shared';

import { glyphs } from '@app/components/Icon';

import Option from './Option';

import ButtonIconTitle from '@app/components/Button/IconTitle';
import { BottomContainer, Container, Empty, MiddleContainer, TopContainer } from './styled';

interface IChoice {
  id: string;
  name: string;
}

const InnerFields: React.FC<IFieldOptions> = ({ input: { value, onChange }, className }) => {
  const handleAddOption = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const choiceId = uuidv1();
      onChange({
        choiceOrder: [...value.choiceOrder, choiceId],
        choices: { ...value.choices, [choiceId]: { id: choiceId, name: '' } },
      } as any);
    },
    [value],
  );
  const handleRemoveOption = useCallback(
    (optionId: string) => {
      onChange({
        choiceOrder: value.choiceOrder.filter((choiceId: string) => choiceId !== optionId),
        choices: omit(value.choices, [optionId]),
      } as any);
    },
    [value],
  );
  const handleAlphabetize = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const choicesList = Object.values(value.choices);
      const sortedList = sortBy(choicesList, (choice: IChoice) => choice.name);
      onChange({
        ...value,
        choiceOrder: sortedList.map((choice: any) => choice.id),
      } as any);
    },
    [value],
  );
  const hasChoices = value.choiceOrder.length > 0;

  return (
    <Container className={className}>
      <TopContainer>
        <ButtonIconTitle
          titleId="form.field.options.alphabetize"
          onClick={handleAlphabetize}
          icon={glyphs.ALPHA_SORT}
        />
      </TopContainer>
      <MiddleContainer isTransparent={hasChoices}>
        {hasChoices ? (
          value.choiceOrder.map((choiceId: string, index: number) => (
            <Field
              component={Option as any}
              index={index}
              key={choiceId}
              name={`typeOptions.choices.${choiceId}`}
              onRemove={() => handleRemoveOption(choiceId)}
            />
          ))
        ) : (
          <Empty>
            <FormattedMessage id="form.field.options.noOptionsDefined" />
          </Empty>
        )}
      </MiddleContainer>
      <BottomContainer isTransparent={hasChoices}>
        <ButtonIconTitle titleId="global.attachFile" onClick={handleAddOption} />
      </BottomContainer>
    </Container>
  );
};

export default InnerFields;
