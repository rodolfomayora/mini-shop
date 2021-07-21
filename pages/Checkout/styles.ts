import styled from 'styled-components';

import { colors, breakpoints } from '../../styles/config';

export const MainTitle = styled.h1`
  margin-bottom: 40px;
`;

export const SubTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const CheckoutContent = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints.large}) {
    flex-direction: row-reverse;
  }
`;

export const SummarySection = styled.section`
  @media screen and (min-width: ${breakpoints.large}) {
    width: 360px;
    margin-left: 40px;
  }

  @media screen and (min-width: ${breakpoints.extraLarge}) {
    width: 450px;
    margin-left: 60px;
  }
`;

export const FormSection = styled.section`
  flex-grow: 1;
`;

export const CartSummaryList = styled.ol`
  margin-bottom: 40px;

  & > * + * { border-top: solid 1px ${colors.black3}; }
`;

export const TotalPriceLabel = styled.p`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 40px;
`;