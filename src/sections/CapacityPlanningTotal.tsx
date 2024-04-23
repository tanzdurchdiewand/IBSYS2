import { Container } from "@mui/material";
import { StyledCard } from "../components/styledComponets/styledCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { StyledButton } from "../components/styledComponets/styledButton";
import { Direction, useNavigationHandler } from "../hooks/useNavigationHandlers";

export default function CapacityPlanningTotal() {
  const { goTo } = useNavigationHandler();
  return (
    <Container maxWidth={"xl"} sx={{ p: 3, position: "relative" }}>
      <StyledButton onClick={() => goTo("/start/capacity-overview", Direction.Back)} sx={{ left: 0 }}>
        <ArrowBackIosIcon />
      </StyledButton>
      <StyledCard />
      <StyledButton onClick={() => goTo("/start/order", Direction.Forward)} sx={{ right: 0 }}>
        <ArrowForwardIosIcon/>
      </StyledButton>
    </Container>
  );
}
