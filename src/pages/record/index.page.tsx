import type { ReactNode } from 'react';
import { useRecord } from '#context/record';
import { MainTitle } from '#components/MainTitle';
import { Layout } from '#components/Layout';

function Record () {

  const recordContext = useRecord();
  const { recordState } = recordContext;
  const areThereRecords: boolean = !!recordState.length;

  const createRecord = (record: any, index: number): ReactNode => {
    const listItemId: string = (index + 1).toString();
    const recordId: string = listItemId.padStart(5, '0');
    const recordTotalPrice: string = record.totalPrice.toFixed(2);
    const products = record.products.map((product) => (
      <li key={crypto.randomUUID()}>{product}</li>
    ));
    return (
      <li key={listItemId}>
        <div className="
          grid gap-y-[8px]
          bg-[var(--color-white-2)] p-[20px] rounded-[6px]
          shadow-[0_0_5px_0px_#b1b9d8]
        ">
          <p className="font-semibold text-[20px]">
            {`ID: #${recordId}`}
          </p>
          <p>{`Email: ${record.email}`}</p>
          <p>{`Buyer: ${record.name} ${record.lastname}`}</p>
          <p>{`Address: ${record.address}`}</p>
          <p>{`Payment method: ${record.paymentMethod}`}</p>
          <p>Purchased products:</p>
          <ul className="grid gap-y-[6px] ms-[30px] text-[16px] [list-style:circle]">
            {products}
          </ul>
          <p>{`Total products: ${record.totalProducts}`}</p>
          <p>{`Total did pay: $${recordTotalPrice}`}</p>
        </div>
      </li>
    );
  }

  const recordToRender = areThereRecords
    ? (
      <ol className="grid gap-y-[40px]">
        {recordState.map(createRecord)}
      </ol>
    ) : (
      <p className="font-extrabold grid place-content-center w-full h-[40svh]">
        There are no records
      </p>
    );

  return (
    <Layout pageTitle="Shopping Record">
      <MainTitle>Shopping Record</MainTitle>
      {recordToRender}
    </Layout>
  );
}

export default Record;