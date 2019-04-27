import ModalWrapper from '@app/components/Modal/Wrapper';
import { toJS } from 'mobx';
import React, { useCallback, useState } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import Button from '@app/components/Button';
import ButtonIcon from '@app/components/Button/Icon';
import { glyphs } from '@app/components/Icon';
import { H4 } from '@app/components/Shared/Typescale';
import { stores } from '@app/stores';

import RecordModalForm from './Form';
import { Content, ContentBody, ContentFooter, ContentHeader, SideBar } from './styled';

interface IRecordModal {
  onClose: () => void;
  rowIndex: number;
}

const RecordModal: React.FC<IRecordModal> = ({ onClose, rowIndex }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const handleToggleSideBar = useCallback(() => setShowSideBar(!showSideBar), [showSideBar]);
  const handleSubmitForm = (values: any) => {
    console.log('Submitted: ', values);
  };

  const row = toJS(stores.tableStore.getRowByIndex(rowIndex));
  let title;
  if (row && row.cells && row.cells.length > 0) {
    const firstCell = row.cells[0];
    if (firstCell) {
      title = firstCell.value.text;
    }
  }

  return (
    <ModalWrapper onClose={onClose}>
      <div>
        <Content>
          <ContentHeader>
            <H4>{title || 'Unnamed record'}</H4>
            <ButtonIcon
              onClick={handleToggleSideBar}
              iconProps={{ icon: glyphs.EXPAND, size: { height: 18, width: 16 } }}
            />
          </ContentHeader>
          <Form onSubmit={handleSubmitForm}>
            {({ handleSubmit }: FormRenderProps) => (
              <React.Fragment>
                <ContentBody>
                  <RecordModalForm row={row} onSubmit={handleSubmit} />
                </ContentBody>
                <ContentFooter>
                  <Button width={180} onClick={handleSubmit}>
                    <FormattedMessage id="global.save" />
                  </Button>
                </ContentFooter>
              </React.Fragment>
            )}
          </Form>
        </Content>
        <SideBar />
      </div>
    </ModalWrapper>
  );
};

export default RecordModal;
