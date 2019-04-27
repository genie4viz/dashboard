import React, { useCallback, useState } from 'react';

import ModalWrapper from '@app/components/Modal/Wrapper';
import RecordSummary, { IRecordOption } from '@app/components/Record/Summary';
import { KEY_CODES } from '@app/constants/app';

import { Container } from './styled';

export interface IModalReference {
  className?: string;
  left?: number;
  tableId: string;
  top?: number;
  onClickRecord: (option: IRecordOption) => void;
  onClose: () => void;
}

const ModalReference: React.FC<IModalReference> = ({
  className,
  left,
  onClickRecord,
  onClose,
  top,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClickOption = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      onClickRecord(options[selectedIndex]);
    },
    [selectedIndex, options],
  );

  const handleMouseEnter = useCallback((e: any) => {
    if (e.target.dataset.index) {
      setSelectedIndex(parseInt(e.target.dataset.index, 0));
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.keyCode) {
        case KEY_CODES.ENTER: {
          handleClickOption(e);
          break;
        }
        case KEY_CODES.ARROW_UP: {
          e.preventDefault();
          const newIndex = Math.max(0, selectedIndex - 1);
          setSelectedIndex(newIndex);
          break;
        }
        case KEY_CODES.ARROW_DOWN: {
          e.preventDefault();
          const newIndex = Math.min(options.length - 1, selectedIndex + 1);
          setSelectedIndex(newIndex);
          break;
        }
        case KEY_CODES.ESC: {
          e.preventDefault();
          onClose();
          break;
        }
        default:
          break;
      }
    },
    [selectedIndex],
  );

  return (
    <ModalWrapper left={left} isMaskTransparent={true} onClose={onClose} top={top}>
      <Container tabIndex={0} onKeyDown={handleKeyDown} className={className}>
        {options &&
          options.map((option, index) => (
            <RecordSummary
              key={index}
              mapIndex={index}
              onClickOption={onClickRecord}
              onMouseEnter={handleMouseEnter}
              option={option}
              isSelected={selectedIndex === index}
            />
          ))}
      </Container>
    </ModalWrapper>
  );
};

export default ModalReference;

const options: IRecordOption[] = [
  {
    id: 'row1',
    title: 'Yes! Fire in the hole',
    items: [
      {
        id: 'col1',
        name: 'Field 1',
        type: 'text',
        value: 'Yes! Fire in the hole',
      },
      {
        id: 'col2',
        name: 'Money',
        type: 'number',
        value: 233333,
      },
      {
        id: 'col3',
        name: 'Description',
        type: 'multilineText',
        value: 2.3,
      },
      {
        id: 'col4',
        name: 'Date',
        type: 'date',
        value: '2019.04.03T12:00:00.000',
      },
    ],
  },
  {
    id: 'row2',
    title: 'yohohohohoho',
    items: [
      {
        id: 'col1',
        name: 'Field 1',
        type: 'text',
        value: 'yohohohohoho',
      },
      {
        id: 'col2',
        name: 'Money',
        type: 'number',
        value: 233333,
      },
      {
        id: 'col3',
        name: 'Description',
        type: 'multilineText',
        value: 2.3,
      },
      {
        id: 'col4',
        name: 'Date',
        type: 'date',
        value: '2019.04.03T12:00:00.000',
      },
    ],
  },
  {
    id: 'row3',
    title: 'Shit!!!!!',
    items: [
      {
        id: 'col1',
        name: 'Field 1',
        type: 'text',
        value: 'Shit!!!!!',
      },
      {
        id: 'col2',
        name: 'Money',
        type: 'number',
        value: 233333,
      },
      {
        id: 'col3',
        name: 'Description',
        type: 'multilineText',
        value: 2.3,
      },
      {
        id: 'col4',
        name: 'Date',
        type: 'date',
        value: '2019.04.03T12:00:00.000',
      },
    ],
  },
  {
    id: 'row3',
    title: 'Shit!!!!!',
    items: [
      {
        id: 'col1',
        name: 'Field 1',
        type: 'text',
        value: 'Shit!!!!!',
      },
      {
        id: 'col2',
        name: 'Money',
        type: 'number',
        value: 233333,
      },
      {
        id: 'col3',
        name: 'Description',
        type: 'multilineText',
        value: 2.3,
      },
      {
        id: 'col4',
        name: 'Date',
        type: 'date',
        value: '2019.04.03T12:00:00.000',
      },
    ],
  },
];
