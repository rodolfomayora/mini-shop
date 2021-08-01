import styled, { css } from 'styled-components';

import { colors } from '../../styles/config';

export const StyledCartSummaryItem = styled.article`
  display: flex;
  height: 70px;
  background-color: ${colors.white2};
  overflow: hidden;

  ${({ theme }) => theme.dark && css`
    background-color: ${colors.dark.blue1};
  `}
`;

export const ImageContainer = styled.div`
  max-height: inherit;
  flex-shrink: 0;
  flex-basis: 70px;
`;

export const InfoContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
  padding: 10px;
`;

export const InfoLabel = styled.p`
  font-size: 16px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.blue3};
  `}
`;

export const SubtotalPrice = styled.p`
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-top: 8px;

  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.white};
  `}
`;