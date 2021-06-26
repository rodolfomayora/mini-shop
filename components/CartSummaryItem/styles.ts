import styled from 'styled-components';
import { colors } from '../../styles/config';

export const StyledCartSummaryItem = styled.article`
  display: flex;
  height: 70px;
  background-color: ${colors.white2};
  overflow: hidden;
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
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &:last-child { margin-top: 8px; }
`;