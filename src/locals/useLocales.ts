import { useTranslation } from "react-i18next";
import { allLangs, defaultLang } from "./configLang";

// ----------------------------------------------------------------------

export type SettingsContextProps = {
  onChangeDirectionByLang: (lang: string) => void;
};

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();

  const currentLang = defaultLang;

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translate: (text: any, options?: any) => translate(text, options),
    currentLang,
    allLangs,
  };
}
