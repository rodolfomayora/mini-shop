import React, { FC } from 'react';

import { useThemeContext } from '../../context';
import { ToggleThemeButtonStyled } from './styles';

const ToggleThemeButton: FC = () => {

  const { toggleTheme } = useThemeContext();

  return <ToggleThemeButtonStyled onClick={toggleTheme} />;
}

export default ToggleThemeButton;