import React, { FC } from 'react';
import { StyledMainButton } from './styles';

type MainButtonProps = {
  disabled?: boolean,
  outline?: boolean,
  onClickAction?: (props: any) => any
}

const MainButton: FC<MainButtonProps> = (props) => {
  const { children, onClickAction, outline, disabled } = props
  return (
    <StyledMainButton
      onClick={onClickAction}
      outline={outline}
      disabled={disabled}
    >
      {children}
    </StyledMainButton>
  )
}

export default MainButton;