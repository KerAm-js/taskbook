import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { TRANSLATIONS } from "./translations";

export const i18n = new I18n(TRANSLATIONS);

i18n.locale = getLocales()[0].languageCode ?? "en";

i18n.enableFallback = true;
