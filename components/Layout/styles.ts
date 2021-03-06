import styled, { css } from 'styled-components';

import { breakpoints, colors } from '../../styles/config';

export const MainContent = styled.main`
  padding-top: 40px;
  padding-bottom: 40px;

  ${({ theme }) => theme.dark && css`
    background-color: ${colors.dark.black};
  `}

  @media screen and (min-width: ${breakpoints.medium}) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
`;