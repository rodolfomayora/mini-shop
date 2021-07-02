import styled from 'styled-components';
import { breakpoints } from '../../styles/config';

export const ProductDetailTitle = styled.h1`
  margin-bottom: 40px;
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

  @media screen and (min-width: ${breakpoints.medium}) {
    flex-basis: 50%;
  }
`;

export const ProductDescription = styled.p`
  line-height: 26px;
  word-spacing: 4px
`;