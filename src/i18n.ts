import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';

const resources = {
  en: { translation: en },
};

i18n
  .use(initReactI18next) // 讓 react-i18next 運作
  .init({
    resources,
    lng: 'zh', // 預設語言
    fallbackLng: 'en', // 找不到翻譯時的備選語言
    interpolation: {
      escapeValue: false, // React 已經有 XSS 防護，不需要轉義
    },
  });

export default i18n;
