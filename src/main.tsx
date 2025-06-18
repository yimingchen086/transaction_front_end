import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as UiProvider } from '@/components/ui/provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { store } from './app/store.ts';
import App from './App.tsx';
import './i18n'; // 載入 i18n 設定

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <UiProvider>
          <App />
        </UiProvider>
      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>
  //  </StrictMode>
);
