'use client';

import {
  createListCollection,
  Box,
  Flex,
  ListCollection,
} from '@chakra-ui/react';
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { useEffect, useReducer, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchCardsInfo } from './action';
import { CardInfo } from './types/card';
import CardTable from './cardTable';
import RecordConsumption from './recordConsumption';

type CardInfoOptionItem = CardInfo & {
  label: string;
  value: number;
};

type ActionInterface = {
  type: string;
  bank: CardInfoOptionItem;
};
interface StateInterface {
  bank: CardInfo;
}
const initialState: StateInterface = {
  bank: {
    card_id: 0,
    card_name: '',
    bank: '',
    maxConsume: 0,
    currAmount: 0,
    description: '',
    store: '',
    rewardsType: '',
    postingDate: '',
    dateRange: '',
  },
};

function bankReducer(
  _state: StateInterface,
  action: ActionInterface
): StateInterface {
  switch (action.type) {
    case 'set':
      return {
        bank: action.bank,
        // {
        //   amount: '',
        //   store: '',
        //   description: '',
        //   postingDate: '',
        //   dateRange: '',
        // }
      };
    default:
      throw new Error();
  }
}

const CardIndex: React.FC = () => {
  const dispatch = useAppDispatch();

  const [bankState, bankDispatch] = useReducer(bankReducer, initialState);

  const cardsInfo: CardInfo[] = useAppSelector((state) => state.card.cardsInfo);
  const [bankOptions, setBankOptions] = useState<
    ListCollection<CardInfoOptionItem>
  >(createListCollection<CardInfoOptionItem>({ items: [] }));

  useEffect(() => {
    dispatch(fetchCardsInfo());
  }, []);

  useEffect(() => {
    console.log(cardsInfo);
    if (cardsInfo.length > 0) {
      const currOptions = createListCollection({
        items: cardsInfo.map((item: CardInfo) => {
          const { card_id, card_name } = item;
          return {
            ...item,
            value: card_id,
            label: card_name,
          };
        }),
      });
      setBankOptions(currOptions);
    }
  }, [cardsInfo]);

  return (
    <Box bg='white' w='100%' p='8px'>
      <Flex>
        <Box>
          <SelectRoot
            collection={bankOptions}
            size='sm'
            width='320px'
            onValueChange={(e) => {
              if (e.items && e.items.length > 0) {
                const selectedBank = { ...e.items[0] } as CardInfoOptionItem;
                bankDispatch({ type: 'set', bank: selectedBank });
              }
            }}
          >
            <SelectLabel>選擇銀行</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder='選擇銀行' />
            </SelectTrigger>
            <SelectContent>
              {bankOptions.items.map((item) => {
                console.log(item);
                return (
                  <SelectItem key={item.value || 'value'} item={item}>
                    {item.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </SelectRoot>
          <CardTable data={bankState.bank} mt='24px' />
        </Box>
        <Box ml='60px'>
          <RecordConsumption />
        </Box>
      </Flex>
    </Box>
  );
};

export default CardIndex;
