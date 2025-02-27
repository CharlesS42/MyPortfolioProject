import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

if (!localStorage.getItem('language')) {
  localStorage.setItem('language', 'en');
}

// Initialize i18n
i18n
  .use(HttpApi) // Loads translations via HTTP
  .use(initReactI18next) // React integration
  .init({
    fallbackLng: localStorage.getItem('language') || 'en', // Default language if detection fails
    lng: localStorage.getItem('language') || 'en', // Current language
    debug: true, // Enable debug mode for development
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to translation files
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;