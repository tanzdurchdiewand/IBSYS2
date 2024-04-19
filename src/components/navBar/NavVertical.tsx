import { Box, Drawer, Stack, Typography } from "@mui/material";
import { NAV } from "./types";
import useResponsive from "../hooks/useResponsive";
import Scrollbar from "../scrollbar/Scrollbar";
import Logo from "../logo/logo";
import DrawerToggleButton from "../drowerToggleButton/DrowerToggleButton";
import NavSectionVertical from "./NavSectionVertical";

// ----------------------------------------------------------------------

type Props = {
  onClose: VoidFunction;
};

export default function NavVertical({ onClose }: Props) {
  const isDesktop = useResponsive("up", "lg");

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Logo />
          <Typography
            variant="body1"
            color="text.primary"
            textTransform="uppercase"
            fontWeight={500}
          >
            Bike Planner Pro
          </Typography>
        </Stack>
      </Stack>

      <NavSectionVertical />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_FULL },
        backgroundColor: "white",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <DrawerToggleButton
        anchor="left"
        open={true}
        onClose={onClose}
        sx={{ top: 32, left: NAV.W_FULL - 12 }}
      />

      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              zIndex: 0,
              width: NAV.W_FULL,
              bgcolor: "transparent",
              border: "none",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_FULL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
