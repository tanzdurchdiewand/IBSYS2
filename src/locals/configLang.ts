import { deDE, enUS, esES, viVN, zhCN } from "@mui/material/locale";
import { de, enUS as enUS_, es, vi } from "date-fns/locale";

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: "English",
    value: "en",
    systemValue: enUS,
    dateFns: enUS_,
    icon: "/assets/icons/flags/ic_flag_en.svg",
  },
  {
    label: "German",
    value: "de",
    systemValue: deDE,
    dateFns: de,
    icon: "/assets/icons/flags/ic_flag_de.svg",
  },
  {
    label: "Spanish",
    value: "es",
    systemValue: esES,
    dateFns: es,
    icon: "/assets/icons/flags/ic_flag_es.svg",
  },
  {
    label: "Vietnamese",
    value: "vi",
    systemValue: viVN,
    dateFns: vi,
    icon: "/assets/icons/flags/ic_flag_vi.svg",
  },
  {
    label: "Chinese",
    value: "zh",
    systemValue: zhCN,
    dateFns: zhCN,
    icon: "/assets/icons/flags/ic_flag_zh.svg",
  },
  // other languages...
];

export const defaultLang = allLangs[1];
