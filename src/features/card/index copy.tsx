'use client';

import { createListCollection, Box } from '@chakra-ui/react';
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { useEffect, useReducer } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchCardsInfo } from './action';
import { CardInfo } from './types/card';
import HorizontalTable from '@/components/manually/horizontalTable';

type CardInfoOptionItem = CardInfo & {
  label: string;
  value: number;
};

type CardInfoData = CardInfo & {
  label: string;
  value: string;
  amount: string;
};

const tableColumns = [
  { id: 'amount', header: '回饋上限額度' },
  { id: 'store', header: '回饋高通路' },
  { id: 'dateRange', header: '活動時間' },
  { id: 'description', header: '說明' },
];
// interface ActionInterface {
//   type: string;
//   bank: CardInfoOptionItem;
// }
type ActionInterface = {
  type: string;
  // name: string;
  //  bank: CardInfoOptionItem
};
interface StateInterface {
  // bankName: string;
  count: number;
  // bank: CardInfoOptionItem | null;
  // bankData: CardInfoData[] | [];
}
const initialState: StateInterface = {
  // bankName: '',
  count: 0,
  // bank: null,
  // bankData: [],
};
// 定義計數器的狀態類型
interface CounterState {
  count: number;
}

// 定義可用的動作類型
type CounterAction =
  | { type: 'increment'; payload?: number }
  | { type: 'decrement'; payload?: number }
  | { type: 'reset' };

// 初始狀態
const initialCounterState: CounterState = {
  count: 0,
};
function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    // case 'increment':
    //   return { count: state.count + (action.payload || 1) };
    // case 'decrement':
    //   return { count: state.count - (action.payload || 1) };
    case 'reset':
      return initialCounterState;
    default:
      throw new Error(`Unhandled action type: ${(action as any).type}`);
  }
}

function bankReducer(
  state: StateInterface,
  action: ActionInterface
): StateInterface {
  console.log(action);
  switch (action.type) {
    case 'set':
      return initialState;
    // return {
    //   bank: action.bank,
    //   bankData: [
    //     {
    //       ...action.bank,
    //       amount: `${action.bank.currAmount}/${action.bank.maxConsume}`,
    //     },
    //   ],
    // };
    default:
      throw new Error();
  }
}

const CardIndex: React.FC = () => {
  const dispatch = useAppDispatch();

  const [bankState, bankDispatch] = useReducer(bankReducer, initialState);
  const [counterState, counterDispatch] = useReducer(
    counterReducer,
    initialCounterState
  );

  const cardsInfo: CardInfo[] = useAppSelector((state) => state.card.cardsInfo);
  const options = createListCollection({
    items: cardsInfo.map((item: CardInfo) => {
      const { id, name } = item;
      return {
        ...item,
        value: id,
        label: name,
      };
    }),
  });

  useEffect(() => {
    dispatch(fetchCardsInfo());
  }, []);
  return (
    <Box>
      <h1>Count: {counterState.count}</h1>
      {/* <button
        onClick={() => counterDispatch({ type: 'increment', payload: 1 })}
      >
        +1
      </button>
      <button
        onClick={() => counterDispatch({ type: 'decrement', payload: 1 })}
      >
        -1
      </button> */}
      <button
        onClick={() => {
          counterDispatch({ type: 'reset' });
          bankDispatch({ type: 'set' });
        }}
      >
        Reset
      </button>
      <SelectRoot
        collection={options}
        size='sm'
        width='320px'
        onValueChange={(e) => {
          if (e.items && e.items.length > 0) {
            const selectedBank = { ...e.items[0] } as CardInfoOptionItem;
            // bankDispatch({ type: 'set', bank: selectedBank });
            // const testStr = bankDispatch({ type: 'set', name: '123' });
            // console.log(testStr);
          }
        }}
      >
        <SelectLabel>選擇銀行</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder='選擇銀行' />
        </SelectTrigger>
        <SelectContent>
          {options.items.map((item) => (
            <SelectItem item={item} key={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <HorizontalTable
        columns={tableColumns}
        //  data={bankState.bankData}
        data={[]}
      />
    </Box>
  );
};

export default CardIndex;
