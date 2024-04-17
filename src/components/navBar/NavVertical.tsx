import { Box, Drawer, Stack, Typography } from "@mui/material";
import { NAV, NavSectionType } from "./types";
import useResponsive from "../hooks/useResponsive";
import Scrollbar from "../scrollbar/Scrollbar";
import Logo from "../logo/logo";
import DrawerToggleButton from "../drowerToggleButton/DrowerToggleButton";
import NavSectionVertical from "./NavSectionVertical";

// ----------------------------------------------------------------------

type Props = {
  navConfig: NavSectionType[];
  onClose: VoidFunction;
};

export default function NavVertical({ navConfig, onClose }: Props) {
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
        <Stack direction="row" alignItems="center" spacing={1}>
          <Logo />
          <Typography
            variant="body1"
            color="text.primary"
            textTransform="uppercase"
            fontWeight={500}
          >
            Plattform
          </Typography>
        </Stack>
      </Stack>

      <NavSectionVertical data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_FULL },
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
              borderRightStyle: "dashed",
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
