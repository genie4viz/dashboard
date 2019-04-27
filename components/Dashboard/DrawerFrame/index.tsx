import React, { Fragment } from 'react';

import { ModalWrapperStyle, Container, Header, TitleStyle, Content } from './styled';

import ModalWrapper from '@app/components/Modal/Wrapper';
import ButtonIcon from '@app/components/Button/Icon';
import { glyphs } from '@app/components/Icon';
import { H4 } from '@app/components/Shared/Typescale';

interface IProps {
  title: string,
  onClose: () => void,
  isDrawer: boolean,
  children: React.ReactNode
}

class DrawerFrame extends React.Component<IProps> {
  public render() {
    const { title, children, onClose, isDrawer } = this.props;

    return (
      <Fragment>
        {isDrawer &&
          <ModalWrapper css={ModalWrapperStyle} onClose={onClose} isMaskTransparent={true}  >
            <Container>
              <Header>
                <div><H4 css={TitleStyle}>{title}</H4></div>
                <div>
                  <ButtonIcon
                    css={TitleStyle}
                    iconProps={{ size: { height: 13, width: 13 }, icon: glyphs.REMOVE }}
                    onClick={onClose}
                  />
                </div>
              </Header>
              <Content>{children}</Content>
            </Container>
          </ModalWrapper>
        }
        {!isDrawer &&
          <Container>
            <Header>
              <div><H4 css={TitleStyle}>{title}</H4></div>
              <div>
                <ButtonIcon
                  css={TitleStyle}
                  iconProps={{ size: { height: 13, width: 13 }, icon: glyphs.REMOVE }}
                  onClick={onClose}
                />
              </div>
            </Header>
            <Content>{children}</Content>
          </Container>
        }
      </Fragment>
    );
  }
}

export default DrawerFrame;
