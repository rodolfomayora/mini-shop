import styled from 'styled-components';

import { breakpoints, colors } from '../../styles/config';

export const MainTitle = styled.h1`
  margin-bottom: 40px;
`;

export const CartContent = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints.extraLarge}) {
    flex-direction: row;
  }
`;

export const NoProductsMessage = styled.p`
  font-weight: 600;
  text-align: center;
`;

export const CartList = styled.ol`
  flex-grow: 1;
  margin-bottom: 40px;

  & > * + * { margin-top: 20px; }
`;

export const CartSummary = styled.div`
  @media screen and (min-width: ${breakpoints.extraLarge}) {
    width: 400px;
    margin-left: 40px;
  }
`;

export const TotalPriceLabel = styled.p`
  background-color: ${colors.white2};
  border-radius: 4px;
  padding: 10px 20px;
  box-shadow: ${colors.shadow};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 40px;
`;