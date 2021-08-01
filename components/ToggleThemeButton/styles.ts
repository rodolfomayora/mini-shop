import styled, { css } from 'styled-components';

import { colors } from '../../styles/config';

export const ToggleThemeButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  padding: 15px;
  border-radius: 50%;
  border: 2px solid ${colors.yellow};
  background-color: ${colors.white2};
  box-shadow: ${colors.shadow2};
  cursor: pointer;

  ${({ theme }) => theme.dark && css`
    background-color: ${colors.dark.blue2};
    box-shadow: ${colors.dark.shadow};
    border-color: ${colors.dark.blue3};
  `}
`;