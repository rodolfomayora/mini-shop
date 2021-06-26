import React, { FC } from 'react';
import { StyledMainButton } from './styles';

type MainButtonProps = {
  disabled?: boolean,
  outline?: boolean,
  type?: any,
  onClickAction?: (props: any) => any
}

const MainButton: FC<MainButtonProps> = (props) => {
  const { children, onClickAction, outline, disabled, type } = props
  return (
    <StyledMainButton
      onClick={onClickAction}
      outline={outline}
      disabled={disabled}
      type={type}
    >
      {children}
    </StyledMainButton>
  )
}

export default MainButton;