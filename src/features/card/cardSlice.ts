import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from 'app/store';
import { fetchCardsInfo } from './action';
import { CardInfo } from './types/card';

interface CardState {
  cards: CardInfo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  loading: boolean;
  error: string | null;
}

const initialState: CardState = {
  cards: [],
  status: 'idle',
  loading: false,
  error: null,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardsInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCardsInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cards = action.payload;
      })
      .addCase(fetchCardsInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

// export const { increment, decrement, incrementByAmount } = cardsSlice.actions;

// export const selectCards = (state: RootState) => state.cards.value;

export default cardSlice.reducer;
