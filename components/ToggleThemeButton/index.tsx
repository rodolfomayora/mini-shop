import React, { FC, useState } from 'react';

import { useThemeContext } from '../../context';
import { ToggleThemeButtonStyled } from './styles';

const ToggleThemeButton: FC = () => {

  const { handleToggleTheme } = useThemeContext();

  const [isDark, setIsDark] = useState<boolean>(false);
  
  const handleClick = (): void => {
    setIsDark(state => !state);
    handleToggleTheme();
  }

  return (
    <ToggleThemeButtonStyled onClick={handleClick}>
      {isDark ? (
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