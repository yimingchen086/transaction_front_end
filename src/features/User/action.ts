import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from 'api/apiClient';

export const loginGoogle = createAsyncThunk(
  'login/fetch',
  async (google_sub: string) => {
    try {
      console.log(google_sub);
      const response = await apiClient.post('user/login', { google_sub });
      return response.data;
    } catch (error) {
      console.log(error);
      throw Error('登入失敗');
    }
  }
);
