import styled from '@emotion/styled';
import React, { Fragment, useState } from 'react';

import Button from '@app/components/Button';
import ButtonGeneric from '@app/components/Button/Generic';
import Meta from '@app/components/Meta';
import { H1, H2, H3, H4, Label1, Label2, P1, P2 } from '@app/components/Shared/Typescale';
import { Field, Form } from 'react-final-form';

import FieldModal from '@app/components/Field/Modal';
import ModalReference from '@app/components/Modal/Reference';

import FormInputCheckbox from '@app/components/Form/FormInputCheckbox';
import FormInputSelect from '@app/components/Form/FormInputSelect';
import FormInputSwitch from '@app/components/Form/FormInputSwitch';
import FormInputText from '@app/components/Form/FormInputText';
import FormInputTextArea from '@app/components/Form/FormInputTextArea';
import RecordModal from '@app/components/Record/Modal';

const Styleguide = () => {
  const [showModal, setShowModal] = useState(false);
  const onShowModalClick = () => setShowModal(true);
  const onExitModalClick = () => setShowModal(false);

  const [showFiledModal, setShowFieldModal] = useState(false);
  const [referenceModalOpen, setShowReferenceModal] = useState(false);

  return (
    <Fragment>
      <Meta />
      <Section>
        <H3>Typescale</H3>
        <H1>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </H1>
        <H2>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </H2>
        <H3>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </H3>
        <H4>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </H4>
        <P1>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </P1>
        <P2>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </P2>
        <Label1>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </Label1>
        <br />
        <Label2>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit.
        </Label2>
      </Section>
      <Section>
        <H3>Buttons</H3>
        <H4>Normal Size</H4>
        <Button onClick={() => setShowFieldModal(true)}>Field Modal</Button>
        <br />
        <Button onClick={() => setShowReferenceModal(true)}>Reference Modal</Button>
        <br />
        <Button isDisabled={true} onClick={() => {}}>
          Disabled Btn
        </Button>
        <br />
        <H4>Small Size</H4>
        <Button isSmall={true} onClick={() => {}}>
          Primary Btn
        </Button>
        <br />
        <Button isLoading={true} isSmall={true} onClick={() => {}}>
          Loading Btn
        </Button>
        <br />
        <Button isDisabled={true} isSmall={true} onClick={() => {}}>
          Disabled Btn
        </Button>
        <br />
      </Section>
      <Section>
        <H3>Secondary Buttons</H3>
        <H4>Normal Size</H4>
        <Button isSecondary={true} onClick={onShowModalClick}>
          Record Modal
        </Button>
        <br />
        <Button isDisabled={true} isSecondary={true} onClick={() => {}}>
          Secondary Btn
        </Button>
        <br />
        <H4>Small Size</H4>
        <Button isSecondary={true} isSmall={true} onClick={() => {}}>
          Secondary Btn
        </Button>
        <br />
        <Button isDisabled={true} isSmall={true} isSecondary={true} onClick={() => {}}>
          Secondary Btn
        </Button>
        <br />
      </Section>
      <Section>
        <H3>Generic Buttons</H3>
        <ButtonGeneric onClick={() => {}}>Generic Btn</ButtonGeneric>
        <br />
      </Section>
      <Section>
        <H3>Form</H3>
        <Form
          initialValues={{ dropdown: '2' }}
          onSubmit={() => {}}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <H4>Normal Dropdown</H4>
              <Field
                title="First Dropdown"
                css={{ marginBottom: '30px' }}
                name="dropdown"
                component={FormInputSelect as any}
                options={[
                  { name: 'one', value: '1' },
                  { name: 'two', value: '2' },
                  { name: 'three', value: '3' },
                  { name: 'four', value: '4' },
                  { name: 'five', value: '5' },
                  { name: 'six', value: '6' },
                  { name: 'seven', value: '7' },
                  { name: 'eight', value: '8' },
                  { name: 'one', value: '9' },
                  { name: 'two', value: '10' },
                  { name: 'three', value: '32' },
                  { name: 'four', value: '42' },
                  { name: 'five', value: '52' },
                  { name: 'six', value: '62' },
                  { name: 'seven', value: '72' },
                  { name: 'eight', value: '82' },
                ]}
              />
              <H4>Small Dropdown</H4>
              <Field
                isSmall={true}
                css={{ marginBottom: '30px' }}
                name="nan"
                component={FormInputSelect as any}
                options={[
                  { name: 'one', value: '1' },
                  { name: 'two', value: '2' },
                  { name: 'three', value: '3' },
                  { name: 'four', value: '4' },
                  { name: 'five', value: '5' },
                  { name: 'six', value: '6' },
                  { name: 'seven', value: '7' },
                  { name: 'eight', value: '8' },
                ]}
              />
              <H4>InputText Normal</H4>
              <Field
                css={{ marginBottom: '30px' }}
                name="input_text"
                component={FormInputText as any}
              />
              <H4>InputText Small</H4>
              <Field
                isSmall={true}
                css={{ marginBottom: '30px' }}
                name="input_text_small"
                component={FormInputText as any}
              />
              <H4>Textarea</H4>
              <Field
                isSmall={true}
                css={{ marginBottom: '30px' }}
                name="input_textarea"
                component={FormInputTextArea as any}
              />
              <H4>Switch enabled </H4>
              <Field
                css={{ marginBottom: '30px' }}
                name="input_switch"
                component={FormInputSwitch as any}
              />
              <H4>Switch disabled </H4>
              <Field
                isDisabled={true}
                css={{ marginBottom: '30px' }}
                name="input_switch_disabled"
                component={FormInputSwitch as any}
              />
              <H4>Checkbox disabled </H4>
              <Field
                css={{ marginBottom: '30px' }}
                name="input_checkbox"
                component={FormInputCheckbox as any}
              />
              <H4>Checkbox disabled </H4>
              <Field
                isDisabled={true}
                css={{ marginBottom: '30px' }}
                name="input_checkbox_disabled"
                component={FormInputCheckbox as any}
              />
            </form>
          )}
        />
      </Section>
      <br />
      <br />
      <br />
      {showModal && (
        <RecordModal
          title="hahah"
          columns={[
            { id: 'fsalkfj1-1f12f12-f', name: 'Field 1', type: 'text', content: 'hahah' },
            { id: 'flkj2112-f12kljf12', name: 'Field 2', type: 'number', content: 2 },
            {
              id: 'flkj2112-f12kljf32',
              name: 'Field 3',
              type: 'multipleAttachment',
              content: [
                {
                  fileId: 'cgGDHeouR9qkdUnhMMX0',
                  fileName: 'Screen Shot 2019-03-31 at 4.19.46 PM.png',
                  fileType: 'image/png',
                  fullThumbUrl:
                    'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:350/cgGDHeouR9qkdUnhMMX0',
                  largeThumbUrl:
                    'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:350/cgGDHeouR9qkdUnhMMX0',
                  smallThumbUrl:
                    'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:36/cgGDHeouR9qkdUnhMMX0',
                  url: 'https://cdn.filestackcontent.com/cgGDHeouR9qkdUnhMMX0',
                },
                {
                  fileId: 'c2ZYYTCnQJmPFt8ZMP1w',
                  fileName:
                    '2018C3Fall_Production_544673_ITGCJCore+Tunics-P_002_20180503_034536.pdf',
                  fileType: 'application/pdf',
                  fullThumbUrl:
                    'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:350/c2ZYYTCnQJmPFt8ZMP1w',
                  largeThumbUrl:
                    'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:350/c2ZYYTCnQJmPFt8ZMP1w',
                  smallThumbUrl:
                    'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:36/c2ZYYTCnQJmPFt8ZMP1w',
                  url: 'https://cdn.filestackcontent.com/c2ZYYTCnQJmPFt8ZMP1w',
                },
              ],
            },
            { id: 'flkj2112-f12klfebvsd', name: 'Field 3', type: 'select', content: '' },
            { id: 'flkj2112-sdflk23kf', name: 'Field 4', type: 'multiSelect', content: [] },
            { id: 'flkj2112-sdflk2sdf3kf', name: 'Field 5', type: 'multilineText', content: '' },
          ]}
          onClose={onExitModalClick}
        />
      )}
      {showFiledModal && <FieldModal onClose={() => setShowFieldModal(false)} />}

      {referenceModalOpen && (
        <ModalReference
          onClose={() => setShowReferenceModal(false)}
          onClickRecord={(option) => {
            console.log(option);
          }}
          tableId="tb12f-f12f"
        />
      )}
    </Fragment>
  );
};

const Section = styled.section`
  padding: 50px 100px 0;
`;

export default Styleguide;
