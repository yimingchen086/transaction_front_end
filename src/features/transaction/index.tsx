'use client';

import { Box, Flex, Input } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Field } from '@/components/ui/field';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  NumberInputField,
  NumberInputRoot,
} from '@/components/ui/number-input';

import { Button, HStack } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useTranslation } from 'react-i18next';
import {
  getCategoryList,
  getTransactionMethods,
  addTransaction,
} from './action';
import { Transaction } from './types/transaction';
import { fetchCardsInfo } from 'features/card/action';

function TransactionIndex() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { categories } = useAppSelector((state) => state.category);
  const { methods } = useAppSelector((state) => state.method);
  const { cards } = useAppSelector((state) => state.card);
  const [consumptionType, setConsumptionType] = useState<number>();
  const [showCards, setShowCards] = useState<boolean>(false);

  const consumptionTitleRef = useRef<HTMLInputElement>(null);
  const storeRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const actualAmountRef = useRef<HTMLInputElement>(null);
  const consumptionTypeRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const cardRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    // 1. 取消費方式列表
    dispatch(getTransactionMethods());
    // 2. 取消費種類
    dispatch(getCategoryList());
    // 3. 取信用卡列表
    dispatch(fetchCardsInfo());
  }, [dispatch]);

  useEffect(() => {
    if (consumptionType === 2) {
      // 顯示信用卡列表
      setShowCards(true);
    } else {
      setShowCards(false);
    }
  }, [consumptionType]);

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(new Date());
    }
  }, [selectedDate]);

  return (
    <Box>
      <Flex mb='12px'>
        <Field label='消費方式' required>
          <select
            style={{ border: '1px solid' }}
            ref={consumptionTypeRef}
            onChange={(e) => {
              setConsumptionType(
                parseInt(e.target?.selectedOptions[0]?.dataset?.methodId ?? '0')
              );
            }}
          >
            {methods.map((item) => {
              return (
                <option key={item.method_id} data-method-id={item.method_id}>
                  {t(item.method_name)}
                </option>
              );
            })}
          </select>
        </Field>
        {showCards ? (
          <Field label='信用卡' required>
            <select style={{ border: '1px solid' }} ref={cardRef}>
              {cards.map((item) => {
                return (
                  <option key={item.card_id} data-card-id={item.card_id}>
                    {item.card_name}
                  </option>
                );
              })}
            </select>
          </Field>
        ) : null}
      </Flex>
      <Field label='消費紀錄' required mb='12px'>
        <Input placeholder='輸入消費紀錄' ref={consumptionTitleRef} />
      </Field>
      <Field label='消費商店' required mb='12px'>
        <Input placeholder='輸入消費商店' ref={storeRef} />
      </Field>
      <Flex>
        <Field label='消費金額' required>
          <NumberInputRoot defaultValue='0'>
            <NumberInputField ref={amountRef} />
          </NumberInputRoot>
        </Field>
        <Field label='實際金額' required>
          <NumberInputRoot defaultValue='0'>
            <NumberInputField ref={actualAmountRef} />
          </NumberInputRoot>
        </Field>
      </Flex>
      <Field label='消費種類' required mb='12px'>
        <select style={{ border: '1px solid' }} ref={categoryRef}>
          {categories.map((item) => {
            return (
              <option key={item.category_id} data-method-id={item.category_id}>
                {t(item.category_name)}
              </option>
            );
          })}
        </select>
      </Field>

      <Field label='消費時間' required mb='12px'>
        <Box border='1px solid' textAlign='left' w='fit-content'>
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            showTimeSelect
            dateFormat='yyyy/MM/dd HH:mm'
          />
        </Box>
      </Field>
      <HStack justifyContent='end'>
        <Button
          colorPalette='teal'
          onClick={async () => {
            const categoryValue: number = categoryRef.current
              ?.selectedOptions[0].dataset.methodId
              ? parseInt(
                  categoryRef.current?.selectedOptions[0].dataset.methodId
                )
              : 0;
            const card_id: number | null = cardRef.current?.selectedOptions[0]
              .dataset.cardId
              ? parseInt(cardRef.current?.selectedOptions[0].dataset.cardId)
              : null;
            const consumptionTitle = consumptionTitleRef.current?.value;
            const store = storeRef.current?.value;
            const amount: number = parseInt(amountRef.current?.value || '0');
            const actualAmount: number = parseInt(
              actualAmountRef.current?.value || '0'
            );
            const consumptionTypeValue: number = consumptionTypeRef.current
              ?.selectedOptions[0]?.dataset?.methodId
              ? parseInt(
                  consumptionTypeRef.current.selectedOptions[0].dataset.methodId
                )
              : 0;

            const transactionData: Transaction = {
              transaction_method_id: consumptionTypeValue,
              transaction_title: consumptionTitle,
              amount,
              actual_amount: actualAmount,
              category_id: categoryValue,
              card_id,
              store,
              transaction_time: selectedDate,
            };
            await dispatch(addTransaction(transactionData));
            alert('記錄成功');
          }}
        >
          送出
        </Button>
      </HStack>
    </Box>
  );
}

export default TransactionIndex;
