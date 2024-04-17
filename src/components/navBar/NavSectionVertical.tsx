import { List, Stack } from "@mui/material";

import { NavSectionProps } from "./types";

// ----------------------------------------------------------------------

export default function NavSectionVertical({
  data,
  sx,
  ...other
}: NavSectionProps) {
  return <Stack sx={sx} {...other}></Stack>;
}
