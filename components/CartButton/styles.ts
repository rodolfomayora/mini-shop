import styled from 'styled-components';

import { colors } from '../../styles/config';

export const StyledCartButton = styled.button`
  position: relative;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const CartIcon = styled.img`
  width: 18px;
  height: 18px;
`;

export const Badge = styled.div`
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  transform: translate(-15%, -50%);
  line-height: 20px;
  min-width: 20px;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
  font-size: 12px;
  color: ${colors.white};
  background-color: ${colors.black3};
`;