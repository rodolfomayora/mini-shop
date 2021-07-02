import styled from 'styled-components';
import { colors } from '../../styles/config';

export const MainTitle = styled.h2`
  margin-bottom: 40px;
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
`;

export const RecordId = styled.p`
  font-weight: 600;
  font-size: 20px;
`;

export const SummaryProductsList = styled.ul`
  list-style: circle;
  padding-left: 30px; 
`;

export const NoRecordMessage = styled.p`
  text-align: center;
`;