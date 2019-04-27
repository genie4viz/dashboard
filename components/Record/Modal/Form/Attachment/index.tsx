import { get } from 'lodash';
import React, { useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { FormattedMessage } from 'react-intl';

import { glyphs } from '@app/components/Icon';
import Spinner from '@app/components/Loading/Spinner';
import ModalPreview from '@app/components/Modal/Preview';
import { ITypeComponent } from '../index';

import { openPicker, upload } from '@app/lib/filestack';
import { IAdaptedAttachment, IFile } from '@app/types';

import ButtonIconTitle from '@app/components/Button/IconTitle';
import {
  BottomContainer,
  Container,
  DropContainer,
  Empty,
  EmptyIcon,
  EmptyTitle,
  FileItemContainer,
  ImgBox,
  StyledTitle,
  TopContainer,
} from './styled';

interface IProps extends ITypeComponent {
  handleChange: () => void;
  handleOpenPicker: () => void;
}

const ColumnTypeAttachment: React.FC<IProps> = ({ column }) => {
  const [showSpinner, setSpinnerStatus] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [defaultIndex, setDefaultIndex] = useState(0);
  const hasContent = !!get(column, 'content').length;
  const handleOpenPicker = () => {
    openPicker()
      .then((value) => {
        console.log('Upload item to multi Attachment:', value);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error.message);
      });
  };
  const handleChange = useCallback(
    (files: IFile[]) => {
      const file = files[0];
      if (!file) return;

      upload({
        file,
        option: { location: 's3', path: `baseIdHere/tableIdHere/${file.name}` },
        onSuccess: (value) => {
          console.log('Successful upload: ', value);
          setSpinnerStatus(false);
        },
        onError: (error) => {
          // eslint-disable-next-line
          console.log(error);
          setSpinnerStatus(false);
        },
      });

      setSpinnerStatus(true);
    },
    [setSpinnerStatus],
  );

  return (
    <Dropzone onDrop={handleChange}>
      {({ getRootProps, isDragActive }) => (
        <Container {...getRootProps()}>
          {isDragActive && (
            <DropContainer>
              <FormattedMessage id="form.record.title.dropFileHere" />
            </DropContainer>
          )}

          <TopContainer>
            <ButtonIconTitle titleId="global.attachFile" onClick={handleOpenPicker} />
            {showSpinner && <Spinner size="small" strokeWidth="2px" />}
          </TopContainer>

          <BottomContainer>
            {hasContent ? (
              column.content.map((item: IAdaptedAttachment, index: number) => (
                <FileItemContainer key={item.fileId}>
                  <ImgBox
                    onClick={() => {
                      setDisplayModal(true);
                      setDefaultIndex(index);
                    }}
                    css={{ backgroundImage: `url(${item.largeThumbUrl})` }}
                  />
                  <StyledTitle>{item.fileName}</StyledTitle>
                </FileItemContainer>
              ))
            ) : (
              <Empty>
                <EmptyIcon size={{ height: 16, width: 16 }} icon={glyphs.ATTACHMENT_EMPTY} />
                <EmptyTitle>
                  <FormattedMessage id="form.record.title.dropFileHere" />
                </EmptyTitle>
              </Empty>
            )}
          </BottomContainer>

          {displayModal && (
            <ModalPreview
              attachments={column.content || []}
              defaultIndex={defaultIndex}
              onExit={() => setDisplayModal(false)}
            />
          )}
        </Container>
      )}
    </Dropzone>
  );
};

export default ColumnTypeAttachment;
