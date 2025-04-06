import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from 'api/apiClient';

export const loginGoogle = createAsyncThunk(
  'login_google/fetch',
  async (token: string) => {
    try {
      console.log(token);
      const response = await apiClient.post('login_google', { token });
      return response.data;
    } catch (error) {
      console.log(error);
      throw Error('登入失敗');
    }
  }
);
