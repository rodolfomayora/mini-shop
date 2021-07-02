import styled, { css } from 'styled-components';
import { colors, breakpoints } from '../../styles/config';

export const StyledCartItem = styled.article`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white2};
  border-radius: 4px;
  box-shadow: ${colors.shadow};
  overflow: hidden;

  @media screen and (min-width: ${breakpoints.small}) {
    flex-direction: row;
  }
`;

export const ImageContainer = styled.div`
  @media screen and (min-width: ${breakpoints.small}) {
    flex-shrink: 0;
    flex-basis: 216px;
  }
`;

export const InfoContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow: hidden;

  & > * + * { margin-top: 20px; }
`;

export const ProducName = styled.h3`
  height: 46px;
  font-size: 20px;
  font-weight: 600;

  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CounterBlock = styled.div`
  display: flex;
  align-items: center;

  & > * + * { margin-left: 10px; }
`;

export const Counter = styled.div`
  padding-left: 8px;
  padding-right: 8px;
`;

type ActionButtonProps = {
  wide?: boolean
}
export const ActionButton = styled.button<ActionButtonProps>`
  line-height: 30px;
  min-width: 30px;
  text-align: center;
  padding: 0 5px;
  color: ${colors.white2};
  border-radius: 4px;
  border: none;
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

  ${props => props.wide && css`
    width: 100%;
    text-align: center;
  `}
`;

export const ButtonIcon = styled.img`
  width: 12px;
  height: 12px;
`;