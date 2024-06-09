import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  //justifyContent: "center",
  justifyContent: "flex-start",
  width: "100%",
  height: "100%",
  //minWidth: "300px",
  //minHeight: "700px",
  minWidth: "800px", 
  minHeight: "850px",
  margin: 'auto',
  borderRadius: "16px",
  marginBottom: theme.spacing(3),
 backgroundColor: "rgba(255, 255, 255, 0.6)", 
  [theme.breakpoints.up('md')]: { 
    width: "90%",
    height: "90%"
  }
}));