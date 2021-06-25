import styled from 'styled-components';
import { colors } from '../../styles/config';

export const StyledImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: ${colors.white2};
`;

export const AspectRatio_1x1 = styled.div`
  position: relative;
  padding-top: 100%;
`;

export const ImageLayer = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  padding: 8%;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;