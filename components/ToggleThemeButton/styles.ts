import styled, { css } from 'styled-components';

import { colors } from '../../styles/config';

export const ToggleThemeButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${colors.yellow};
  cursor: pointer;
  background:
    ${colors.white2}
    url('/images/svg/sun.svg')
    scroll
    no-repeat
    center / 20px;

  ${({ theme }) => theme.dark && css`
    box-shadow: ${colors.dark.shadow};
    border-color: ${colors.dark.blue3};
    background-color: ${colors.dark.blue2};
    background-image: url('/images/svg/moon.svg');
    background-size: 14px;
  `}
`;