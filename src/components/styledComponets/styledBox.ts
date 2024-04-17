import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(3),
}));
