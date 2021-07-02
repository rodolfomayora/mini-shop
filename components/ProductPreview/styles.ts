import styled from 'styled-components';
import { colors } from '../../styles/config';

export const StyledProductPreview = styled.article`
  box-shadow: ${colors.shadow};
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
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
`;

export const ProductPrice = styled.p`
  font-weight: 600;
`;