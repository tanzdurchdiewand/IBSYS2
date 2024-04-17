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
        <svg viewBox="0 0 76 57" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_264_147)">
            <path
              d="M50.5799 27.865C50.5669 28.0566 50.6106 28.2477 50.7053 28.4147C62.4153 48.7279 62.1763 48.2857 65.6953 54.4753C65.784 54.6013 65.9023 54.7037 66.0398 54.7735C66.1773 54.8433 66.3297 54.8783 66.4839 54.8756H71.6458L56.1122 28.1876L72.5958 1.57734H67.637C67.3761 1.56703 67.1171 1.625 66.8855 1.7455C66.654 1.866 66.4578 2.04487 66.3166 2.26441C62.248 8.80047 50.783 27.3572 50.783 27.3572C50.6756 27.516 50.6079 27.6984 50.5858 27.8889"
              fill="#8D959D"
            />
            <path
              d="M22.6313 47.4134C13.6218 47.4134 10.1566 41.1402 10.1566 27.9665C10.1566 14.7928 13.6218 9.12899 22.6313 9.12899C31.6408 9.12899 34.9805 14.5717 34.9805 27.9665C34.9805 41.0625 31.6348 47.4134 22.6313 47.4134ZM22.6313 0C7.3546 0 0.233035 8.86611 3.04691e-05 27.9665C-0.221025 46.6785 7.40837 56.6439 22.6253 56.6439C37.2927 56.6439 44.6353 46.3499 45.0654 29.8962V25.5468C44.6293 8.9617 37.3046 0 22.6313 0Z"
              fill="#114ffa"
            />
          </g>
          <defs>
            <clipPath id="clip0_264_147">
              <rect width="76" height="57" fill="white" />
            </clipPath>
          </defs>
        </svg>
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
