import { IconButtonProps } from "@mui/material";

export type Anchor = "left" | "right" | "openMenu";
export type DrawerToggleButtonProps = IconButtonProps & {
  anchor: Anchor;
  open: boolean;
  onOpen?: VoidFunction;
  onClose?: VoidFunction;
};
