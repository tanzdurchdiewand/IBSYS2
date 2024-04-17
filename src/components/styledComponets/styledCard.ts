import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(3),
}));
