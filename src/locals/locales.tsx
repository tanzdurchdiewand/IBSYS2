import { createContext, useContext, useState, ReactNode } from "react";
import i18n from "./i18n";

type Language = {
  label: string;
  value: string;
};

type LocaleContextType = {
  currentLang: string;
  onChangeLang: (newLang: string) => void;
  allLangs: Language[];
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [currentLang, setCurrentLang] = useState<string>(i18n.language);

  const onChangeLang = (newLang: string) => {
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  const allLangs: Language[] = [
    { label: "English", value: "en" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Vietnamese", value: "vi" },
    { label: "Chinese", value: "zh" },
  ];

  return (
    <LocaleContext.Provider value={{ currentLang, onChangeLang, allLangs }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocales = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocales must be used within a LocaleProvider");
  }
  return context;
};
