import styled, { css } from 'styled-components';

import { breakpoints, colors } from '../../styles/config';

export const Title = styled.h1`
  margin-bottom: 40px;

  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.blue3};
  `}
`;

export const DetailLayout = styled.div`
  display: flex;
  flex-direction: column;
  
  @media screen and (min-width: ${breakpoints.medium}) {
    flex-direction: row;
  }
`;

export const ImageContainer = styled.div`
  margin-bottom: 40px;
  overflow: hidden;
  border-radius: 4px;

  @media screen and (min-width: ${breakpoints.medium}) {
    flex-basis: 50%;
    margin-bottom: 0;
    margin-right: 40px;
  }
`;

export const InfoContainer = styled.div`

  & > * + * { margin-top: 20px; }

  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.white};
  `}

  @media screen and (min-width: ${breakpoints.medium}) {
    flex-basis: 50%;
  }
`;

export const Description = styled.p`
  line-height: 26px;
  word-spacing: 4px;

  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.white};
  `}
`;