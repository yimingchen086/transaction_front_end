import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from 'api/apiClient';
import { Transaction } from 'features/transaction/types/transaction';

export const getCategoryList = createAsyncThunk('category/fetch', async () => {
  try {
    const response = await apiClient.get('category');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw Error('獲取資料失敗');
  }
});

export const getTransactionMethods = createAsyncThunk(
  'transaction_method/fetch',
  async () => {
    try {
      const response = await apiClient.get('transaction_method');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw Error('獲取資料失敗');
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transaction/add',
  async (transactionData: Transaction) => {
    try {
      console.log(transactionData);
      const response = await apiClient.post('transaction', transactionData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw Error('更新資料失敗');
    }
  }
);
