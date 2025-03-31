import { Provider } from 'react-redux';
import { Provider as UiProvider } from '@/components/ui/provider';
// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { store } from './app/store.ts';
import App from './App.tsx';
import './i18n'; // 載入 i18n 設定

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <UiProvider>
      <App />
    </UiProvider>
  </Provider>
  // </StrictMode>
);
