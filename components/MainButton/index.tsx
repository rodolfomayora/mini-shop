import React, { FC } from 'react';
import { StyledMainButton } from './styles';

type MainButtonProps = {
  outline?: boolean,
  onClickAction?: (props: any) => any
}

const MainButton: FC<MainButtonProps> = (props) => {
  const { children, onClickAction, outline } = props
  return (
    <StyledMainButton
      onClick={onClickAction}
      outline={outline}
    >
      {children}
    </StyledMainButton>
  )
}

export default MainButton;