import { createGlobalStyle , css } from 'styled-components';
import { normalize } from 'styled-normalize';

import typography from './typography';
import { colors } from './config';

type Theme = { dark: boolean }

export default createGlobalStyle<{ theme: Theme }>`
  ${normalize} // RESET CSS

  ${typography}

  html {
    *,
    *:before,
    *:after {
      box-sizing: border-box;
      -webkit-tap-highlight-color: hsla(0, 0%, 0%, 0);
    }
  }

  html,
  body {
    min-width: 360px;
    min-height: 100vh;
  }

  :root {
    font-family: 'Lato', Arial, Helvetica, sans-serif;
    font-size: 18px;
    color: ${colors.black2};
    background-color: ${colors.white};

    ${({ theme }) => theme.dark && css`
      background-color: ${colors.dark.black};
    `}
  }

  a { text-decoration: none; }
  
  ul,
  ol {
    list-style: none;
    padding: 0;  
  }
`;