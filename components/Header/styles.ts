import styled, { css } from 'styled-components';

import { colors, breakpoints } from '../../styles/config';

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${colors.marineBlue};

  ${({ theme }) => theme.dark && css`
    background-color: ${colors.dark.blue4};
  `}
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;

  @media screen and (min-width: ${breakpoints.medium}) {
    height: 70px;
  }

  @media screen and (min-width: ${breakpoints.extraLarge}) {
    height: 80px;
  }
`;

export const Title = styled.h2`
  color: ${colors.white};
  cursor: pointer;
`;

export const NavigationButton = styled.nav`
  display: flex;
  align-items: center;
  
  > * + * {
    margin-left: 12px;

    @media screen and (min-width: ${breakpoints.small}) {
      margin-left: 30px;
    }
  }
`;

export const LinkText = styled.a`
  color: ${colors.white};
  cursor: pointer;
`;