import { FC, createContext, useContext, useState } from 'react';

import { ThemeProvider } from 'styled-components';

type Theme = {
  dark: boolean
}

type SetCallback = (theme: Theme) => Theme;

type SetTheme = (params?: Theme | SetCallback) => void;

type ThemeContext = { setTheme: SetTheme } | undefined;

const themeContext = createContext<ThemeContext>(undefined);

export const ThemeContextProvider: FC = ({ children }) => {

  const [theme, setTheme] = useState<Theme>(() => ({
    dark: false
  }));

  const providerValue: ThemeContext = { setTheme };
 
  return (
    <themeContext.Provider value={providerValue}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </themeContext.Provider>
  );
}

export const useThemeContext = () => {

  const context = useContext(themeContext);
  if (!context) throw new Error('useThemeContext must be used within ThemeContextProvider');
  const { setTheme } = context;

  const handleToggleTheme = () => {
    setTheme(theme => ({
      ...theme,
      dark: !theme.dark,
    }));
  }

  return {
    setTheme,
    handleToggleTheme,
  };
}