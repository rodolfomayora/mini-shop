import React, { FC, useEffect } from 'react';
import { Layout } from '../../components';
import { useRecord } from '../../context';

const ShoppingRecord: FC = () => {

  const recordContext = useRecord();
  const { recordState } = recordContext;
  useEffect(() => {
    console.log(recordState);
  },
  [recordState])

  const areThereRecords: boolean = !!recordState.length;

  return (
    <Layout pageTitle="Shoping Record">
      <h2>Shopping Record</h2>

      <ol>
      {areThereRecords && recordState.map((record, index) => {
        const id: string = (index + 1).toString();
        return (
          <li key={id}>
            <p>{`Record ID: #${id.padStart(5, '0')}`}</p>
            <p>{`Email: ${record.email}`}</p>
            <p>{`Buyer: ${record.name} ${record.lastname}`}</p>
            <p>{`Address: ${record.address}`}</p>

            <hr />
          </li>
        )
      })}
      </ol>
    </Layout>
  )
}

export default ShoppingRecord;