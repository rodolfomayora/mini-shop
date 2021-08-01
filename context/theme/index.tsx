import React, { FC, createContext, useContext, useEffect, useState } from 'react';

import { ThemeProvider } from 'styled-components';

type Theme = {
  dark: boolean
}
type SetCallback = (theme: Theme) => Theme;
type SetTheme = (params?: Theme | SetCallback) => void;
type ThemeContext = { theme: Theme, setTheme: SetTheme } | undefined;

const themeContext = createContext<ThemeContext>(undefined);

export const ThemeContextProvider: FC = ({ children }) => {

  const initialState: Theme = {
    dark: false
  }

  const [theme, setTheme] = useState<Theme>(initialState);

  useEffect(() => {
    const getThemeLocalStorage = (): void => {
      const storagedTheme: string = window.localStorage.getItem('theme');
      if (!!storagedTheme) {
        const parsedThemeState: Theme = JSON.parse(storagedTheme);
        setTheme(parsedThemeState);
      }
    }

    getThemeLocalStorage()
  },
  [])

  useEffect(() => {
    const setThemeLocalStorage = (): void => {
      try {
        const parsedThemeState: string = JSON.stringify(theme);
        window.localStorage.setItem('theme', parsedThemeState);
      } catch (error) {
        console.error(error.message);
      }
    }

    setThemeLocalStorage();
  },
  [theme])

  const providerValue: ThemeContext = { theme, setTheme };
 
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
  const { theme, setTheme } = context;

  const handleToggleTheme = () => {
    setTheme(theme => ({
      ...theme,
      dark: !theme.dark,
    }));
  }

  return {
    theme,
    setTheme,
    handleToggleTheme,
  };
}