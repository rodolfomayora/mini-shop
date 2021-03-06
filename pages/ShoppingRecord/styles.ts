import styled, { css } from 'styled-components';

import { colors } from '../../styles/config';

export const MainTitle = styled.h2`
  margin-bottom: 40px;

  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.blue3};
  `}
`;

export const RecordList = styled.ol`
  & > * + * { margin-top: 20px; }
`;

export const StyledRecordItem = styled.div`
  background-color: ${colors.white2};
  border-radius: 4px;
  padding: 20px;
  box-shadow: ${colors.shadow};

  & > * + * {
    margin-top: 8px;
  }

  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.white};
    background-color: ${colors.dark.blue1};
    box-shadow: ${colors.dark.shadow};
  `}
`;

export const RecordId = styled.p`
  font-weight: 600;
  font-size: 20px;

  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.blue3};
  `}
`;

export const SummaryProductsList = styled.ul`
  list-style: circle;
  padding-left: 30px; 
`;

export const NoRecordMessage = styled.p`
  text-align: center;
  font-weight: 600;

  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.white};
  `}
`;