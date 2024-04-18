import useResponsive from "../hooks/useResponsive";
import { BarProps } from "./types";
import DrawerToggleButton from "../drowerToggleButton/DrowerToggleButton";
import NavVertical from "./NavVertical";
import NavMini from "./MiniNavBar";

const NavBar = ({ open, onOpen, onClose }: BarProps) => {
  const isDesktop = useResponsive("up", "lg");

  return (
    <>
      {open && <NavVertical onClose={onClose} />}
      {!open && isDesktop && <NavMini onOpen={onOpen} />}
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
