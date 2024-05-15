import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { defaultLang } from "./configLang";
import enLocales from "./langs/en";
import deLocales from "./langs/de";
import vitLocales from "./langs/vi";
import esLocales from "./langs/es";
import zhLocales from "./langs/zh";

// ----------------------------------------------------------------------

let lng = defaultLang.value;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: enLocales },
      de: { translations: deLocales },
      es: { translations: esLocales },
      vi: { translations: vitLocales },
      zh: { translations: zhLocales },
    },
    lng,
    fallbackLng: defaultLang.value,
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
