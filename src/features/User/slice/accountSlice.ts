import { createSlice } from '@reduxjs/toolkit';
import { GoogleAccountInfo } from 'features/User/types/accountInfo';
import { loginGoogle } from 'features/User/action';

const initialState: {
  googleUserInfo: GoogleAccountInfo;
  loading: boolean;
  error: string | null;
} = {
  googleUserInfo: {
    sub: '',
    email: '',
    name: '',
    picture: '',
  },
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.googleUserInfo = action.payload;
        state.error = null;
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '無法獲取類別資料';
      });
  },
});

export default accountSlice.reducer;
