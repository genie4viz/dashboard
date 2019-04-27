import React, { useState } from 'react';

import ModalWrapper from '@app/components/Modal/Wrapper';
import { IMAGE_TYPES } from '@app/constants/fileTypes';

import ButtonIcon from '@app/components/Button/Icon';
import { glyphs } from '@app/components/Icon';

import { CancelIcon, Content, IFrame, LeftArrow, RightArrow, Title } from './styled';

interface IAttachment {
  fileId: string;
  fileName: string;
  fullThumbUrl: string;
}

interface IProps {
  attachments: IAttachment[];
  onExit: () => void;
  defaultIndex: number;
}

const AttachmentPreviewModal = ({ attachments, onExit, defaultIndex }: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const { fileId = '', fileName = '', fullThumbUrl = '' } = attachments[currentIndex] || {};

  return (
    <ModalWrapper onClose={onExit} css={{ width: '100%', height: '100%' }}>
      <div>
        <Title>{fileName}</Title>
        <ButtonIcon
          iconProps={{ size: { height: 20, width: 20 }, icon: glyphs.REMOVE }}
          css={CancelIcon}
          onClick={onExit}
        />
        <Content onClick={onExit} onKeyDown={onExit} role="button" tabIndex={0}>
          {IMAGE_TYPES.includes(fileName.split('.').pop()) ? (
            <img alt={fileName} src={fullThumbUrl} />
          ) : (
            <IFrame
              src={`https://cdn.filestackcontent.com/preview/${fileId}`}
              title="attachmentModalIFrame"
            />
          )}
        </Content>
        {currentIndex !== 0 && (
          <ButtonIcon
            css={LeftArrow}
            iconProps={{ size: { height: 64, width: 64 }, icon: glyphs.ARROW_LEFT }}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          />
        )}
        {currentIndex !== attachments.length - 1 && (
          <ButtonIcon
            css={RightArrow}
            iconProps={{ size: { height: 64, width: 64 }, icon: glyphs.ARROW_RIGHT }}
            onClick={() => setCurrentIndex(currentIndex + 1)}
          />
        )}
      </div>
    </ModalWrapper>
  );
};

export default AttachmentPreviewModal;
