import React, { FC, ReactNode } from 'react';

import styled from 'styled-components';

import { Layout } from '../../components';
import { useRecord } from '../../context';
import { colors } from '../../styles/config';

const MainTitle = styled.h2`
  margin-bottom: 40px;
`;

const RecordList = styled.ol`
  & > * + * { margin-top: 20px; }
`;

const StyledRecordItem = styled.div`
  background-color: ${colors.white2};
  border-radius: 4px;
  padding: 20px;
  box-shadow: ${colors.shadow};

  & > * + * {
    margin-top: 8px;
  }
`;

const RecordId = styled.p`
  font-weight: 600;
  font-size: 20px;
`;

const SummaryProductsList = styled.ul`
  list-style: circle;
  padding-left: 30px; 
`;

const NoRecordMessage = styled.p`
  text-align: center;
  font-weight: 600;
`;

const ShoppingRecord: FC = () => {

  const recordContext = useRecord();
  const { recordState } = recordContext;
  const areThereRecords: boolean = !!recordState.length;

  const createRecord = (record: any, index: number): ReactNode => {
    const listItemId: string = (index + 1).toString();
    const recordId: string = listItemId.padStart(5, '0');
    const recordTotalPrice: string = record.totalPrice.toFixed(2);
    return (
      <li key={listItemId}>
        <StyledRecordItem>
          <RecordId>{`ID: #${recordId}`}</RecordId>
          <p>{`Email: ${record.email}`}</p>
          <p>{`Buyer: ${record.name} ${record.lastname}`}</p>
          <p>{`Address: ${record.address}`}</p>
          <p>{`Payment method: ${record.paymentMethod}`}</p>
          <p>Products did buy:</p>
          <SummaryProductsList>
          {record.products.map((product, index) => (
            <li key={index.toString()}>{product}</li>
          ))}
          </SummaryProductsList>
          <p>{`Total products: ${record.totalProducts}`}</p>
          <p>{`Total did pay: $${recordTotalPrice}`}</p>
        </StyledRecordItem>
      </li>
    )
  }

  return (
    <Layout pageTitle="Shoping Record">
      <MainTitle>Shopping Record</MainTitle>

      <RecordList>
      {areThereRecords
      ? recordState.map(createRecord)
      : <NoRecordMessage>There are no records</NoRecordMessage>}
      </RecordList>
    </Layout>
  );
}

export default ShoppingRecord;