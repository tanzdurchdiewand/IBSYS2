import { useState } from "react";
import useResponsive from "../hooks/useResponsive";
import { BarProps, NavSectionType } from "./types";
import DrawerToggleButton from "../drowerToggleButton/DrowerToggleButton";
import NavVertical from "./NavVertical";

const NavBar = ({ open, onOpen, onClose }: BarProps) => {
  const isDesktop = useResponsive("up", "lg");

  const [navConfig, setNavConfig] = useState<NavSectionType[]>([]);

  return (
    <>
      {open && <NavVertical navConfig={navConfig} onClose={onClose} />}
      {/* {!open && isDesktop && <NavMini navConfig={navConfig} onOpen={onOpen} />} */}
      {!isDesktop && (
        <DrawerToggleButton
          anchor="openMenu"
          open={false}
          onOpen={onOpen}
          sx={{
            top: 28,
            left: 7,
          }}
        />
      )}
    </>
  );
};

export default NavBar;
