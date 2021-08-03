import React, { FC } from 'react';

import { useThemeContext } from '../../context';
import { ToggleThemeButtonStyled } from './styles';

const ToggleThemeButton: FC = () => {

  const { handleToggleTheme } = useThemeContext();

  return <ToggleThemeButtonStyled onClick={handleToggleTheme} />;
}

export default ToggleThemeButton;