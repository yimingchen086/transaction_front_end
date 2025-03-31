import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// GET 請求 - 獲取數據
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  }
);

// POST 請求 - 新增數據
export const createData = createAsyncThunk(
  'data/createData',
  async ({ url, data }: { url: string; data: any }) => {
    const response = await axios.post(url, data);
    return response.data;
  }
);

// PUT 請求 - 更新數據
export const updateData = createAsyncThunk(
  'data/updateData',
  async ({ url, data }: { url: string; data: any }) => {
    const response = await axios.put(url, data);
    return response.data;
  }
);

// DELETE 請求 - 刪除數據
export const deleteData = createAsyncThunk(
  'data/deleteData',
  async (url: string) => {
    await axios.delete(url);
    return url; // 返回被刪除資源的 URL 或 ID
  }
);

interface DataState {
  data: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DataState = {
  data: [],
  status: 'idle',
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 處理 GET 請求
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });

    // 處理 POST 請求
    builder
      .addCase(createData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload); // 將新增的數據添加到數據列表
      })
      .addCase(createData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create data';
      });

    // 處理 PUT 請求
    builder
      .addCase(updateData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedData = action.payload;
        const index = state.data.findIndex(
          (item) => item.id === updatedData.id
        );
        if (index !== -1) {
          state.data[index] = updatedData; // 更新數據
        }
      })
      .addCase(updateData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update data';
      });

    // 處理 DELETE 請求
    builder
      .addCase(deleteData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const deletedUrl = action.payload;
        state.data = state.data.filter((item) => item.url !== deletedUrl); // 移除刪除的數據
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete data';
      });
  },
});

export default dataSlice.reducer;
