import { createSlice } from '@reduxjs/toolkit';
import { getTransactionMethods } from 'features/transaction/action'; // 假設 getCategoryList 存在這個路徑
import { Method } from 'features/transaction/types/method';

const initialState: {
  methods: Method[]; // 可根據 API 回傳的類型替換 any
  loading: boolean;
  error: string | null;
} = {
  methods: [],
  loading: false,
  error: null, // 初始值是 null，但之後可以是 string
};

// 創建 categorySlice
const methodSlice = createSlice({
  name: 'transactionmethod',
  initialState,
  reducers: {
    // 可以在這裡定義其他同步的 reducer 來處理普通操作
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionMethods.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.methods = action.payload; // 資料來自 API 回應
        state.error = null; // 清除任何錯誤訊息
      })
      .addCase(getTransactionMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '無法獲取類別資料'; // 顯示錯誤訊息
      });
  },
});

export default methodSlice.reducer;
