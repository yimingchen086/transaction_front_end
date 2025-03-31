import { createSlice } from '@reduxjs/toolkit';
import { getCategoryList } from 'features/transaction/action'; // 假設 getCategoryList 存在這個路徑
import { Category } from 'features/transaction/types/category';

// 定義 category 的初始狀態
// const initialState = {
//   categories: [], // 儲存類別的資料
//   loading: false, // 控制加載狀態
//   error: null, // 錯誤訊息
// };
const initialState: {
  categories: Category[]; // 可根據 API 回傳的類型替換 any
  loading: boolean;
  error: string | null;
} = {
  categories: [],
  loading: false,
  error: null, // 初始值是 null，但之後可以是 string
};

// 創建 categorySlice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // 可以在這裡定義其他同步的 reducer 來處理普通操作
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // 資料來自 API 回應
        state.error = null; // 清除任何錯誤訊息
      })
      .addCase(getCategoryList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '無法獲取類別資料'; // 顯示錯誤訊息
      });
  },
});

export default categorySlice.reducer;
