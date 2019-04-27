import { inject } from 'mobx-react';
import React from 'react';
import { Form } from 'react-final-form';

import CoreFormAdd from '@app/components/Core/Form/Add';
import ModalWrapper from '@app/components/Modal/Wrapper';

import { Container } from './styled';

interface IProps {
  onClose: () => void;
}

@inject('coresRootStore')
class CoreListModal extends React.Component<IProps> {
  public render() {
    const { onClose } = this.props;

    return (
      <ModalWrapper onClose={onClose} css={{ width: '650px' }}>
        <Container>
          <Form onSubmit={this.handleSubmit} render={(props: any) => <CoreFormAdd {...props} />} />
        </Container>
      </ModalWrapper>
    );
  }

  private handleSubmit = async (values: any) => {
    const {
      // TODO @Derek: Ask Neco / Osman how to get this error outta here!!
      coresRootStore: { addCore },
      onClose,
    } = this.props;

    await addCore(values);
    onClose();
  };
}

export default CoreListModal;
