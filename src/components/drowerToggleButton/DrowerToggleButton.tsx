import { IconButton } from "@mui/material";

import { Anchor, DrawerToggleButtonProps } from "./types";
import useResponsive from "../hooks/useResponsive";
import Iconify from "../iconfy/Iconif";

// ----------------------------------------------------------------------

export default function DrawerToggleButton({
  sx,
  anchor,
  open,
  onOpen,
  onClose,
  ...other
}: DrawerToggleButtonProps) {
  const isDesktop = useResponsive("up", "lg");

  const icon: Record<Anchor, string> = {
    left: "eva:arrow-ios-back-fill",
    right: "eva:arrow-ios-forward-fill",
    openMenu: "iconamoon:menu-burger-horizontal",
  };

  const getIconDirection = (): Anchor => {
    if (anchor === "left") {
      return open ? "left" : "right";
    } else if (anchor === "right") {
      return open ? "right" : "left";
    } else if (!isDesktop) {
      return "openMenu";
    } else {
      throw new Error(`Invalid anchor: ${anchor}`);
    }
  };

  return (
    <IconButton
      size="small"
      onClick={open ? onClose : onOpen}
      sx={{
        p: 0.5,
        position: "fixed",
        bgcolor: "background.default",
        zIndex: (theme) => theme.zIndex.appBar + 1,
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
        "&:hover": {
          bgcolor: "background.default",
        },
        ...sx,
      }}
      {...other}
    >
      <Iconify width={16} icon={icon[getIconDirection()]} />
    </IconButton>
  );
}
