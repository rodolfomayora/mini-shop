import React, { FC } from 'react';

import { Layout } from '../../components';
import { useRecord } from '../../context';
import {
  MainTitle,
  NoRecordMessage,
  RecordId,
  RecordList,
  StyledRecordItem,
  SummaryProductsList,
} from './styles';

const ShoppingRecord: FC = () => {

  const recordContext = useRecord();
  const { recordState } = recordContext;
  const areThereRecords: boolean = !!recordState.length;
  
  return (
    <Layout pageTitle="Shoping Record">
      <MainTitle>Shopping Record</MainTitle>

      <RecordList>
      {areThereRecords && recordState.map((record, index) => {
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
      })}

      {!areThereRecords && <NoRecordMessage>There are no records</NoRecordMessage>}
      </RecordList>
    </Layout>
  );
}

export default ShoppingRecord;