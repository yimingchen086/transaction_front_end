import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from 'api/apiClient';

// 创建异步操作
export const fetchCardsInfo = createAsyncThunk('cards', async () => {
  try {
    const response = await apiClient.get('cards');
    return response.data;
  } catch (error) {
    console.log(error);
    throw Error('獲取資料失敗');
  }
});
