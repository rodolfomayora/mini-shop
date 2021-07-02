import styled, { css } from 'styled-components';

import { colors } from '../../styles/config';

export const StyledPaymentForm = styled.form`
  & > * + * { margin-top: 10px; }
`;

export const FormLabel = styled.label`
  line-height: 20px;
`;

type FormInputProps = {
  isNoValid?: boolean,
  isValid?: boolean,
}
export const FormInput = styled.input<FormInputProps>`
  width: 100%;
  line-height: 32px;
  padding-right: 12px;
  padding-left: 12px;
  color: ${colors.black1};
  border-radius: 5px;
  border: solid 1px ${colors.black1};
  overflow: hidden;
  outline: none;

  ${props => props.isNoValid && css`
    border-color: ${colors.red};
  `}

  ${props => props.isValid && css`
    border-color: ${colors.green};
  `}

  &:disabled { cursor: not-allowed; }
`;

export const FormTextArea = styled.textarea<FormInputProps>`
  min-width: 100%;
  max-width: 100%;
  line-height: 30px;
  padding-right: 12px;
  padding-left: 12px;
  color: ${colors.black1};
  border-radius: 5px;
  border: solid 1px ${colors.black1};
  overflow: hidden;
  outline: none;

  ${props => props.isNoValid && css`
    border-color: ${colors.red};
  `}

  ${props => props.isValid && css`
    border-color: ${colors.green};
  `}

  &:disabled { cursor: not-allowed; }
`;

export const ErrorMessage = styled.p`
  margin-top: 5px;
  font-size: 12px;
  color: ${colors.red};
`;

export const RadioOptions = styled.div`
  margin-top: 10px;

  & > * + * { margin-left: 20px; }
`;

export const ButtonWrapper = styled.div`
  margin-top: 30px;
`;