import React, { useCallback, useRef, useState } from 'react';

import ButtonIcon from '@app/components/Button/Icon';
import Dropdown, { IDropdownOption } from '@app/components/Dropdown';
import FieldModal from '@app/components/Field/Modal';
import { glyphs } from '@app/components/Icon';

const dropdownOptions = [
  {
    id: 'option1',
    titleId: 'dropdown.field.name.editField',
  },
  {
    id: 'option2',
    titleId: 'dropdown.field.name.deleteField',
  },
];

export interface IFieldDropdownButton {
  className?: string;
}

const FieldDropdownButton: React.FC<IFieldDropdownButton> = ({ className }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [fieldModalOpen, setFieldModalOpen] = useState(false);
  const positionRef = useRef(null);

  const handleDropdownOpen = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    setDropdownOpen(true);
  }, []);

  const handleClickDropdownOption = useCallback((option: IDropdownOption) => {
    switch (option.id) {
      case 'option1': {
        setFieldModalOpen(true);
        break;
      }
      case 'option2': {
        setFieldModalOpen(true);
        break;
      }
      default:
        break;
    }
    setDropdownOpen(false);
  }, []);

  return (
    <div ref={positionRef}>
      <ButtonIcon
        className={className}
        onClick={handleDropdownOpen}
        iconProps={{ size: { width: 10, height: 10 }, icon: glyphs.ARROW_DROPDOWN }}
      />
      {dropdownOpen && (
        <Dropdown
          options={dropdownOptions}
          onClick={handleClickDropdownOption}
          onClose={() => setDropdownOpen(false)}
          left={positionRef.current ? positionRef.current.getBoundingClientRect().left : 0}
          top={positionRef.current ? positionRef.current.getBoundingClientRect().bottom : 0}
        />
      )}
      {fieldModalOpen && (
        <FieldModal
          left={positionRef.current ? positionRef.current.getBoundingClientRect().left : 0}
          top={positionRef.current ? positionRef.current.getBoundingClientRect().bottom : 0}
          isMaskTransparent={true}
          onClose={() => setFieldModalOpen(false)}
        />
      )}
    </div>
  );
};

export default FieldDropdownButton;
