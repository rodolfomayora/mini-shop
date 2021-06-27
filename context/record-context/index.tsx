import { FC, createContext, useContext, useState } from 'react';

type ShoppingRecord = {
  email: string,
  name: string,
  lastname: string,
  address: string,
  paymentMethod: string,
  products: Array<string>,
  totalProducts: number,
  totalPrice: number,
}
type RecordState = Array<ShoppingRecord>;
type SetState = (params?: any) => void;
type RecordContext = { recordState: RecordState, setRecordState: SetState } | undefined;

const RecordStateContext = createContext<RecordContext>(undefined);

export const RecordProvider: FC = ({ children }) => {

  const initialState: RecordState = [];
  const [recordState, setRecordState] = useState<RecordState>(initialState);
  const recordValue: RecordContext = { recordState, setRecordState };

  return (
    <RecordStateContext.Provider value={recordValue}>
      {children}
    </RecordStateContext.Provider>
  )
}

export const useRecord = () => {
  
  const recordContext = useContext(RecordStateContext);
  if (!recordContext) throw new Error('useRecord must be used within RecordProvider');
  const { recordState, setRecordState } = recordContext;

  const addRecord = (newRecord: ShoppingRecord) => {
    setRecordState((state: RecordState): RecordState => state.concat(newRecord));
  }

  return { recordState, setRecordState, addRecord };
}