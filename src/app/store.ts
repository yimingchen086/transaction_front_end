import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'features/counter/counterSlice';
import cardReducer from '@/features/card/cardSlice';
import categoryReducer from '@/features/transaction/slice/categorySlice';
import methodReducer from '@/features/transaction/slice/methodSlice';
import userReducer from '@/features/user/slice/accountSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    card: cardReducer,
    category: categoryReducer,
    method: methodReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
