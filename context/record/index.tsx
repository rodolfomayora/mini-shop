import { FC, createContext, useContext, useReducer } from 'react';

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

type Action =
| { type: 'ADD_RECORD', shoppingRecord: ShoppingRecord };

type Dispatch = (action: Action) => void;

type Reducer = (state: RecordState, action: Action) => RecordState;

type RecordContext =
| { recordState: RecordState, dispatch: Dispatch }
| null;

const RecordStateContext = createContext<RecordContext>(null);

const reducer: Reducer = (state, action) => {
  switch (action.type) {

    case 'ADD_RECORD': {
      const { shoppingRecord } = action;
      return state.concat(shoppingRecord);
    }

    default: {
      throw new Error('Unsupported Ation Type from Record Context');
    }
  }
}

export const RecordProvider: FC = ({ children }) => {

  const initialState: RecordState = [];
  const [recordState, dispatch] = useReducer(reducer, initialState);
  const recordValue: RecordContext = { recordState, dispatch };

  return (
    <RecordStateContext.Provider value={recordValue}>
      {children}
    </RecordStateContext.Provider>
  )
}

export const useRecord = () => {
  
  const recordContext = useContext(RecordStateContext);
  if (!recordContext) throw new Error('useRecord must be used within RecordProvider');
  const { recordState, dispatch } = recordContext;

  const addRecord = (shoppingRecord: ShoppingRecord) => {
    dispatch({
      type: 'ADD_RECORD',
      shoppingRecord
    });
  }

  return { recordState, dispatch, addRecord };
}