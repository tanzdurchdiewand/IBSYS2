import { deDE, enUS, viVN } from "@mui/material/locale";
import { de, enUS as enUS_, vi } from "date-fns/locale";

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
    label: "Vietnamese",
    value: "vit",
    systemValue: viVN,
    dateFns: vi,
    icon: "/assets/icons/flags/ic_flag_vit.svg",
  },
];

export const defaultLang = allLangs[1];
