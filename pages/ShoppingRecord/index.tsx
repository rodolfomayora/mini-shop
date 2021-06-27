import React, { FC } from 'react';
import { Layout } from '../../components';
import { useRecord } from '../../context';
import {
  StyledRecordItem,
  MainTitle,
  RecordList,
  SummaryProductsList,
  RecordId,
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
        const id: string = (index + 1).toString();
        return (
          <li key={id}>
            <StyledRecordItem>
              <RecordId>{`ID: #${id.padStart(5, '0')}`}</RecordId>
              <p>{`Email: ${record.email}`}</p>
              <p>{`Buyer: ${record.name} ${record.lastname}`}</p>
              <p>{`Address: ${record.address}`}</p>
              <p>{`Payment method: ${record.paymentMethod}`}</p>
              <p>Products did buy:</p>
              <SummaryProductsList>
              {record.products.map((product) => (
                <li>{product}</li>
              ))}
              </SummaryProductsList>
              <p>{`Total products: ${record.totalProducts}`}</p>
              <p>{`Total did pay: $${record.totalPrice.toFixed(2)}`}</p>
            </StyledRecordItem>
          </li>
        )
      })}
      </RecordList>
    </Layout>
  )
}

export default ShoppingRecord;