import styled, { css } from 'styled-components';

import { colors } from '../../styles/config';

type StyledMainButtonProps = {
  disabled?: boolean,
  outline?: boolean,
  type?: any,
}

export const StyledMainButton = styled.button<StyledMainButtonProps>`
  line-height: 36px;
  width: 100%;
  padding: 0 15px;
  border: solid 2px ${colors.black3};
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
  color: ${colors.white};
  background-color: ${colors.black3};
  transition:
    all 0.2s linear,
    transform 0s linear,
    opacity 0s linear;
  cursor: pointer;

  &:hover {
    background-color: ${colors.marineBlue};
    border-color: ${colors.marineBlue};
  }

  &:active {
    transform: scale(0.96);
    opacity: 0.8;
  }

  /* Outline Styles */
  ${props => props.outline && css`
    border-color: ${colors.black3};
    background-color: ${colors.white};
    color: ${colors.black3};
    font-weight: 700;

    &:hover {
      background-color: ${colors.black3};
      border-color: ${colors.black3};
      color: ${colors.white};
    }
  `}

  &:disabled {
    background-color: ${colors.gray};
    border-color: ${colors.gray};
    opacity: 0.6;
    cursor: not-allowed;
  }
`;