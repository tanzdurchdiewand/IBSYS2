import { Box, Stack } from "@mui/material";
import { NAV } from "./types";
import DrawerToggleButton from "../drowerToggleButton/DrowerToggleButton";
import Logo from "../logo/logo";
import NavSectionMini from "./NavSectionMini";

type Props = {
  onOpen: VoidFunction;
};

export default function NavMini({ onOpen }: Props) {
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_FULL_MINI },
        backgroundColor: "white",
        boxShadow: "-10px 0px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <DrawerToggleButton
        anchor="left"
        open={false}
        onOpen={onOpen}
        sx={{
          top: 22,
          left: NAV.W_FULL_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: "fixed",
          width: NAV.W_FULL_MINI,
        }}
      >
        <Logo sx={{ mx: "auto", my: 2 }} />

        <NavSectionMini />
      </Stack>
    </Box>
  );
}
