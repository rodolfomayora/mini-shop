import styled, { css } from 'styled-components';

import { colors } from '../../styles/config';

export const StyledProductCard = styled.article`
  position: relative;
  box-shadow: ${colors.shadow};
  border-radius: 4px;
  background-color: ${colors.white2};
  overflow: hidden;
  cursor: pointer;

  ${({ theme }) => theme.dark && css`
    box-shadow: ${colors.dark.shadow};
    background-color: ${colors.dark.blue1};
  `}
`;

export const AvailabilityTag = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 40px;
  text-align: center;
  font-weight: 600;
  color: ${colors.white};
  background-color: ${colors.red};
  opacity: 0.9;

  ${({ theme }) => theme.dark && css`
    background-color: ${colors.dark.red};
  `}
`;

export const InfoWrapper = styled.div`
  padding: 20px;

  & > * + * { margin-top: 20px; }
`;

export const ProductTitle = styled.h3`
  height: 40px;
  font-size: 18px;
  font-weight: 600;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.blue3};
  `}
`;

export const ProductPrice = styled.p`
  font-weight: 600;

  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.white};
  `}
`;