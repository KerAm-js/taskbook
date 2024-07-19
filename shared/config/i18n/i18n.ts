import { getLocales } from "expo-localization";
import { TRANSLATIONS } from "./translations";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: TRANSLATIONS,
  lng: getLocales()[0].languageCode || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export const  I18n = i18n;
