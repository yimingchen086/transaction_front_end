import { createSlice } from '@reduxjs/toolkit';
import { addTransaction } from 'features/transaction/action';
import { Transaction } from 'features/transaction/types/transaction';

const initialState: {
  transaction: Transaction;
  loading: boolean;
  error: string | null;
} = {
  transaction: {
    transaction_method_id: 0,
    transaction_title: '',
    amount: 0,
    actual_amount: 0,
    category_id: 0,
    transaction_time: null,
    card_id: 0,
    store: '',
  },
  loading: false,
  error: null,
};

// 新建消費
const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
        state.error = null;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '無法獲取類別資料';
      });
  },
});

export default transactionSlice.reducer;
