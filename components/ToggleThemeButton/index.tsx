import React, { FC, useEffect, useState } from 'react';

import { useThemeContext } from '../../context';
import { ToggleThemeButtonStyled } from './styles';

const ToggleThemeButton: FC = () => {

  const { theme, handleToggleTheme } = useThemeContext();

  const isDarkThemeActive: boolean = theme?.dark ?? false;

  return (
    <ToggleThemeButtonStyled onClick={handleToggleTheme}>
      {isDarkThemeActive ? (
        <img
          src="/images/svg/moon.svg"
          alt="Moon"
          width="30"
          height="30" />
      ) : (
        <img
          src="/images/svg/sun.svg"
          alt="Sun"
          width="30"
          height="30" />
      )}
    </ToggleThemeButtonStyled>
  );
}

export default ToggleThemeButton;