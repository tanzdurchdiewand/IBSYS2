import { Box, BoxProps, Link } from "@mui/material";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: "inline-flex",
          ...sx,
        }}
        {...other}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src="/logoBike.jpg"
          alt="logoBike"
        />
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} to="/" sx={{ display: "contents" }}>
        {logo}
      </Link>
    );
  }
);
Logo.displayName = "Logo";

export default Logo;
