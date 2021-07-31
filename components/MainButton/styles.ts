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

  ${({ theme }) => theme.dark && css`
    font-weight: 600;
    color: ${colors.dark.blue3};
    border: solid 2px ${colors.dark.blue2};
    background-color: ${colors.dark.blue2};

    &:hover {
      color: ${colors.dark.blue2};
      border-color: ${colors.dark.blue3};
      background-color: ${colors.dark.blue3};
    }
  `}

  /* Outline Styles */
  ${props => props.outline && css`
    border-color: ${colors.black3};
    background-color: ${colors.white2};
    color: ${colors.black3};
    font-weight: 700;

    &:hover {
      background-color: ${colors.black3};
      border-color: ${colors.black3};
      color: ${colors.white};
    }

    ${({ theme }) => theme.dark && css`
      color: ${colors.dark.blue3};
      border: solid 2px ${colors.dark.blue5};
      background-color: ${colors.dark.blue2};

      &:hover {
        color: ${colors.dark.white};
        border: solid 2px ${colors.dark.blue5};
        background-color: ${colors.dark.blue5};
      }
    `}
  `}

  &:active {
    transform: scale(0.96);
    opacity: 0.8;
  }

  &:disabled {
    background-color: ${colors.gray};
    border-color: ${colors.gray};
    opacity: 0.6;
    cursor: not-allowed;

    ${({ theme }) => theme.dark && css`
      border-width: 2px;
      background-color: ${colors.dark.blue1};
      border-color: ${colors.dark.blue1};
    `}
  }
`;