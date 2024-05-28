import styled, { css } from 'styled-components';

import { colors } from '../../styles/config';

export const StyledPaymentForm = styled.form`
  & > * + * { margin-top: 10px; }
`;

export const FormLabel = styled.label`
  line-height: 22px;

  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.blue3};
  `}
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
  background-color: ${colors.white2};
  overflow: hidden;
  outline: none;

  ${({ theme }) => theme.dark && css`
    border-color: ${colors.dark.blue3};
    background-color: ${colors.dark.black};
    color: ${colors.dark.white};
  `}  

  ${props => props.isNoValid && css`
    border-color: ${colors.red};

    ${({ theme }) => theme.dark && css`
      border-color: ${colors.dark.red};
    `}
  `}

  ${props => props.isValid && css`
    border-color: ${colors.green};

    ${({ theme }) => theme.dark && css`
      border-color: ${colors.dark.green};
    `}  
  `}
  

  &:disabled {
    cursor: not-allowed;
    background-color: ${colors.white};


    ${({ theme }) => theme.dark && css`
      border-color: ${colors.dark.blue1};
      background-color: ${colors.dark.blue1};
    `}  
  }
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

  ${({ theme }) => theme.dark && css`
    border-color: ${colors.dark.blue3};
    background-color: ${colors.dark.black};
    color: ${colors.dark.white};
  `} 

  ${props => props.isNoValid && css`
    border-color: ${colors.red};

    ${({ theme }) => theme.dark && css`
      border-color: ${colors.dark.red};
    `}
  `}

  ${props => props.isValid && css`
    border-color: ${colors.green};
    
    ${({ theme }) => theme.dark && css`
      border-color: ${colors.dark.green};
    `}  
  `}

  &:disabled {
    cursor: not-allowed;

    ${({ theme }) => theme.dark && css`
      border-color: ${colors.dark.blue1};
      background-color: ${colors.dark.blue1};
    `}  
  }
`;

export const ErrorMessage = styled.p`
  margin-top: 5px;
  font-size: 12px;
  color: ${colors.red};

  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.red};
  `}
`;

export const RadioOptions = styled.div`
  margin-top: 10px;

  & > * + * { margin-left: 20px; }
`;

export const ButtonWrapper = styled.div`
  margin-top: 30px;
`;