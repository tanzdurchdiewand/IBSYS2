import { Button, Container } from "@mui/material";
import { StyledCard } from "../components/styledComponets/styledCard";
import { useContext } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { SelectInputXML } from "../pages/StartPage";

export default function OrderPlanning() {
  const { handleNextStep, handleBack } = useContext(SelectInputXML);

  return (
    <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
      <Button
        variant="contained"
        onClick={handleBack}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <ArrowBackIosIcon />
      </Button>
      <StyledCard
        sx={{
          width: { xs: "100%", md: "90%" },
          height: { xs: "100%", md: "90%" },
          minWidth: { xs: "100%", md: "300px" },
          minHeight: { xs: "100%", md: "700px" },
          mx: "auto",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></StyledCard>

      <Button
        variant="contained"
        onClick={handleNextStep}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Container>
  );
}
